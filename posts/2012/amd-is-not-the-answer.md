---
title: AMD is Not the Answer
id: 548
comment: false
categories:
  - General
date: 2012-01-16 15:50:33
tags:
---

Every so often, we get requests to make Ember.js support [AMD (asynchronous module definition)](https://github.com/amdjs/amdjs-api/wiki/AMD). Until today, I had yet to hear anyone articulate why the advantages outweighed the (in my opinion) many disadvantages. Then, James Burke wrote an article called [Simplicity and JavaScript modules](http://tagneto.blogspot.com/2012/01/simplicity-and-javascript-modules.html) that has so far done the best job outlining why AMD is good. However, I disagree with many of the assumptions and find many of the arguments outright contradictory. So, while James is both smart and I'm sure good-looking (and I agree with his comments on CommonJS), here are the reasons I think he is wrong about AMD.

### Build Tools Are Okay

> However, for those of us who came from Dojo, requiring a server tool or compile step to just develop in JS was a complication. I'm going to mangle Alex Russell's quote on this, but "the web already has a compile step. It's called Reload".
I have a lot of respect for Alex but, if this is his current opinion, he's wrong. The app development world of the Dojo era is different from the world of today, and it's important that we are driven by current realities rather than stale institutional knowledge. Every serious application development environment in the world has a build step. If you are making a small application, then fine, I agree you don't need build tools. But you probably don't need AMD or a script loader, either.  If your app is truly simple, you will be fine with adding a few &lt;script&gt; tags to your page. I'm involved in several large web application projects right now and universally they use a build procedure of some kind. CoffeeScript compilation and minification are two examples of legitimate reasons to have a build step. Packaging your modules is fine too.

### Many HTTP Requests

AMD expects every module to be contained in a separate file. As web app development gets more rigorous, developers want to be able to organize their files in the same way they might in Ruby or Cocoa. For example, all of the projects I'm working on easily have hundreds of files. Each view is a separate file, each template is a separate file, each controller is a separate file, and so on. With AMD, each additional file means additional HTTP overhead. But more importantly, many users are now on high-latency but high-bandwidth wireless connections. Minimizing the number of trips to the server is important. James addresses this in his blog post:
> Loading individual modules piecemeal is a _terrifically_ inefficient way to built a website. Because of this, there's the great RequireJS optimizer, which will turn your modules into ordinary packages.
But wait, I thought we were just arguing that build tools are bad? Here's the thing: if your app is simple, you don't need build tools _or_ module loading. If your app is more sophisticated, you'll need both; so why not let the build tools handle the packaging for you? AMD proponents also argue that serving files individually makes it easier to debug. We did this in the SproutCore 1.0 days and, though it was extremely slow in development (perhaps because our HTTP server was single-threaded), it was effective. However, enough browsers support the sourceURL convention that in our current projects we just include a function like this:
<pre lang="javascript">  function appendSourceURL(data, path) {
    return data + " //@ sourceURL="+path;
  }</pre>

### Too Much Ceremony

AMD requires you to wrap all of your code inside an anonymous function that is passed to the define method:
<pre lang="javascript">define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});</pre>

In my opinion, having to write this out for every file _sucks_. I prefer to call `require` for each dependency. Perhaps it's a trivial difference, but removing a dependency is as easy as deleting a line and adding a new dependency means adding a new line of code. It's less error-prone than editing an array of strings.

You can achieve a similar syntax with AMD, like this:

<pre lang="javascript">define(function() {
 require('ember.js');
 window.MyApp = Ember.Application.create();
});</pre>
But at that point, why bother with loading a large AMD script loader? We use an [implementation of a script loader that is under 50 lines of code](https://github.com/wycats/minispade/blob/master/lib/main.js).

### The Alternative

What we've been using for our projects is a system that takes the source code for each file and wraps it as a string, as described by Tobie Langel in his post [Lazy evaluation of CommonJS modules](http://calendar.perfplanet.com/2011/lazy-evaluation-of-commonjs-modules/). All of the source code is downloaded in one HTTP request (great for high-latency 3G connections) and is saved in memory as a string so parsing is fast. Those strings are saved in a hash keyed on each individual file's name. If you were to look at our application.js file, you would see something similar to this:
<pre lang="javascript">Files = {};
Files['main.js'] = "require(\"controllers/app_controller.js\");";
Files['controllers/app_controller.js'] = "alert(\"Hello world!\");";</pre>
The main JavaScript file is executed, and dependencies are resolved at runtime. This allows you to conditionally evaluate code based on the execution environment. For example, imagine you had a file that defined keyboard shortcuts. You could decide not to pay the parsing cost for that file if you detected that you were running on a touch platform.

We also have a system for packaging up many files into a single module, which can be loaded lazily. This helps us get the initial payload within the limits of mobile device's cache limits.

The best part of this system is that, as an application developer, there is very little ceremony involved. If I need some functionality, I just place a `require` statement. If it has already been loaded, the `require` is a no-op. I make this argument a lot, but going from "a little friction" to "no friction" often makes the difference between good habits and bad habits. In this case, I can open a new file and start typing code, instead of worrying about setting it up as a module.

AMD has many features, but I think that the extra markup and complex loaders needed to support it outweighs its benefits. Out-of-the-box it is not ready for production, and needs build tools to make it truly useful. If build tools are required anyway, a much simpler solution should fit most developers' needs.

I am looking forward to your blog post pointing out the flaws in my argument and excoriating me for making a fool of myself in public.

_A very sincere thank you to James Burke, Tim Branyen and Yehuda Katz for reviewing this post and helping me better understand AMD. Please consider this a [strong opinion, weakly held](http://www.codinghorror.com/blog/2008/05/strong-opinions-weakly-held.html)._
