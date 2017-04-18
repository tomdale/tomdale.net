---
title: Our Approach to Routing in Ember.js
id: 602
comment: false
categories:
  - General
date: 2012-05-14 08:57:45
tags:
---

The URL is an important strength that the web has over native apps. In web apps, the URL goes beyond just being a static reference to the location of a document on a server. The best way to think of it is as the serialization of the application’s current state. As the user interacts with the application, the URL should update to reflect what the user is seeing on their screen.

In most applications, state is tracked in an ad hoc way. To answer the question _"What is the current state of the application?"_ you must synthesize several different properties (usually stashed away on different controllers) to arrive at an answer. If there are bugs in your application, it is possible to get into a conceptually broken state. For example, imagine you have an  `isAuthenticated` property that is `true` but there is no `currentUser` property. How did you get into this state? Diagnosing these kinds of bugs is difficult. And more importantly, serializing that state in a sane way is basically impossible, because it’s scattered across the application.

Ember.js' implementation of state charts solves these issues nicely. Using `Ember.StateManager`, you describe your application as a hierarchical tree of objects—one object per conceptual state. Because you explicitly enumerate the possible states, it is impossible to be in an unknown state. And if you try to perform an action in a state that doesn't support it, an exception is raised immediately, making it easy to diagnose and debug the problem.

It also means that we can easily serialize the state of your application on demand. Assuming you model your application’s behavior using a state manager, we can map the state hierarchy to a URL, and update it as you navigate through the hierarchy.

This is an important departure from how most other web frameworks handle routing. They invert the model; the URL is the source of truth for the current state of the application. To change states (for example, to show a different view), you hardcode the URL into your application. If I want to display a photo with an ID of 1, I must synthesize the URL `'/photo/1'` and send it to my router.

This approach is not ideal for several reasons.

First, it couples your URLs to your application code. Changing segment names means you have to go through your entire app and update the hardcoded strings. It also requires that, if you want to enter a new state, you must go consult the router to be reminded what the particular URL is. Breaking encapsulation this way quickly leads to out-of-control code that is hard to maintain.

You’re in for an especially painful experience if you later need to change the hierarchy of your URLs. For example, imagine you have a blog app that displays different kinds of media. You have URLs like this:

Your app gets so popular that you decide to add multiple blogs:

You now need to audit every URL in your application! With Ember's approach, it's as simple as adding a route property to the parent state to have it start appearing in the URL. Because state changes are triggered by events being sent to your state manager by your views (instead of them routing to a specific URL), nothing in your view code changes.

The other problem with describing state in terms of URLs is that there is a cumbersome and pointless serialization step. In my JavaScript, I am dealing with controllers and model objects. Having to turn them into a string form just to get them to interact is brittle and unnecessary.

To use the photo example from above, which one of these is nicer?

<pre>stateManager.send('showPhoto', user, photo);</pre>

<pre>
var url = '#/user/' + user.get('id') + '/photo/' + photo.get('id');
router.route(url);
</pre>

Having multiple sources of truth in any application quickly leads to chaos. One of the primary benefits of Ember.js is that it ruthlessly moves truth about your application state out of the DOM and into JavaScript. The DOM is always just a reflection of the current truth in JavaScript.

The work we're doing on routing in Ember.js will have a similar effect on keeping truth out of the URL. The URL becomes just a reflection of the current truth in JavaScript. Because state managers allow you define your application state in an encapsulated and semantically rich way, changing how your URLs are built is as easy as changing a few properties on the state objects.

For a more concrete description of how routing ties into Ember's state managers, see [Yehuda's gist, which includes code samples](https://gist.github.com/2679013). This work is currently happening on Ember's `routing` branch, but we hope to merge it into master soon.

I'm really excited about this feature. We've been thinking about this problem for a while now and it's satisfying to finally be able to start working on it. I think that explicitly modeling application state using objects is a very exciting and powerful technique, and getting routing "for free" by doing it makes it a no-brainer.