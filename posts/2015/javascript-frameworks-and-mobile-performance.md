---
title: JavaScript Frameworks and Mobile Performance
date: 2015-11-16 11:03:33
---

Critics of frameworks tend to totally miss the value that they provide for people.

Google's Paul Lewis recently wrote [The Cost of Frameworks](https://aerotwist.com/blog/the-cost-of-frameworks/), analyzing the
performance implications of using JavaScript frameworks on mobile devices.

Here's Paul's list of why people use frameworks:


*   Frameworks are fun to use.
*   Frameworks make it quicker to build an MVP.
*   Frameworks work around lumps / bugs in the platform.
*   Knowing [insert framework] means I get paid.

Most critics miss the key one: _frameworks let you manage the complexity of your application as it (and the team building it) grows over time_.

All of the other stuff is just gravy.

### Ergonomics vs. User Needs

Paul frames a zero-sum tradeoff between a user's needs, like the app not crashing and being fast, and the developer's need to have tools that make them productive. I've seen this argument before and it always baffles me. These are not orthogonal concerns. Developer ergonomics often **help** the user with their needs, because the more productive the developer is, the more bugs they can fix, features they can add, slow code they can profile.

Many developers have worked on a project where the complexity of the codebase swelled to be so great that every new feature felt like a slog. Frameworks exist to help tame that complexity. Ergonomics sometimes have cost, but oftentimes they can be added at zero cost. I am a big fan of Rust's mantra of zero-cost abstractions—tools that help the developer, and help the computer understand what the developers wants, and so the code can be better optimized.

### Are Frameworks Worth It?

After this we have the standard discussion of whether frameworks are "worth it" or if their downsides outweigh their benefits. I doubt my post or his post will convince you one way or the other.

In my experience, it boils down to: app developers overwhelmingly use frameworks because they have to support code for years. Devrel folks love small libraries or "vanilla JS" because they don't have to support big codebases for years and can quickly bang out demos with the latest and greatest.

The fact that frameworks continue to be so popular despite the prevalence of articles like this (for the past decade at least) pooh-poohing them should tell you something. Developers aren't getting tricked by framework authors; they find the benefits worth it.

### Data

Paul presents some benchmarks showing the execution times of the TodoMVC app implemented in several different frameworks. Paul's takeaway:

> For me the results are pretty clear: there appears to be a pretty hefty tax to using Frameworks on mobile, especially compared to writing vanilla JavaScript.

Here's the problem: TodoMVC is a _miniscule_ app and is in no way representative of the apps most developers work on day to day. Yes, frameworks have overhead, and often significant overhead. But the framework's abstractions exist to make your application code less verbose.

I have heard from many developers who have told me that they accepted the argument that vanilla JavaScript or microlibraries would let them write leaner, meaner, faster apps. After a year or two, however, what they found themselves with was a slower, bigger, less documented and unmaintained in-house framework with no community. As apps grow, you tend to need the abstractions that a framework offers. Either you or the community write the code.

So here's what I think a more interesting study would be: what is the execution time of _real world apps_ of _approximately similar complexity_? It may be that apps built with frameworks are still slower. But my hypothesis is that, for apps of any complexity, the ones that start off "vanilla" will accrete their own Frankenframework that performs similarly to, if not worse than, an off-the-shelf framework like Ember or Angular.

I pitched this idea to Paul on Twitter and he said:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/tomdale">@tomdale</a> tricky that, TodoMVC is the only like-for-like I know of that is functionally equivalent across several frameworks.</p>&mdash; Paul Lewis (@aerotwist) <a href="https://twitter.com/aerotwist/status/666298560263024640">November 16, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Agreed that this is true, but is measuring the wrong thing better than measuring nothing at all? Using TodoMVC as the metric doesn't make any sense. People use frameworks to tame complexity, but TodoMVC doesn't have any. It's important here to state the hypothesis so you know what you're testing. Testing TodoMVC because it's the only thing available is called **availability bias**.

An interesting question is: _If I build a large, real-world app without a framework, will it be faster than one written with a framework, and by how much? How much productivity will I lose to having to invent, author, and maintain my own abstractions for managing complexity?_

But measuring the execution time of TodoMVC apps doesn't answer that question.

It's important to define the hypothesis being tested because it affects the conclusions you draw. I could benchmark a bicycle versus a diesel truck, and the results will be a lot different if I am testing "is this good for commuting to the office?" instead of "how good is this for hauling lumber?"

Paul's benchmark answers the question, "Do frameworks make small, simple apps on mobile devices load more slowly?" The answer to that is "yes" but I don't think it's an interesting question.

### Mobile Performance

To me the issue is not about whether to use a framework or not; the issue is how atrocious JavaScript performance is on mobile, especially Chrome on Android. To quote Jeff Atwood, [the state of JavaScript on Android in 2015 is… poor.](https://meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889)

Developers need to be able to rely on abstractions. Many developers would consider it a non-starter to build a web app in 2015 without the help of a framework. Maybe you disagree with that, and that's fine. But before judging them, consider whether their needs may be more complex than yours—do they need to support it for years? Do they have large, distributed teams building it? It's surprising how easy things can become challenging when you go from a single developer hacking on a repo to a large app worked on by a massive organization. Maybe you don't care about that use case, but I do. I like building tools that can be used by my bank or my airline to make my experience using them even just a little bit better.

Large apps tend to have a minimum of several hundred kilobytes of code—often more—whether they're built with a framework or not. Developers need abstractions to build complex software, and whether they come from a framework or are hand-written, they negatively impact the performance of apps.

Even if you were to eliminate frameworks entirely, many apps would still have hundreds of kilobytes of JavaScript. Rather than saying "use less code," which most people would consider unrealistic, a better strategy is to reduce the cost of code.

Thankfully, everyone is working on this from multiple angles, which is what it will take to make mobile apps as fast as their native counterparts:

*   Hardware manufacturers are making CPUs faster.
*   Browser vendors are making their JavaScript engines faster (here's hoping Chrome catches up to Safari soon).
*   Framework authors are optimizing their code for the performance characteristics of the slowest browser they support, i.e. Chrome on Android.
*   Frameworks are working on reducing startup costs via strategies like dead code elimination and server-side rendering.

The bottom line is that I don't think "reduce the amount of code" is a reasonable lesson for the average developer to follow. Much better to let developers write as much code as they need for the cool apps they want to build, and then have tool vendors figure out how to make that fast.

Ironically, the existence of frameworks makes keeping up with the latest and greatest easier. Frameworks can track the best practices for eking out mobile performance, and you can take advantage of that just by upgrading the version of the framework you use, rather than rewriting the app.
