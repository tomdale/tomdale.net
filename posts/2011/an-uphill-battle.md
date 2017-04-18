---
title: An Uphill Battle
id: 444
comment: false
categories:
  - General
date: 2011-05-21 13:46:09
tags:
---

Where is the web's Loren Brichter?

Loren Brichter's tiny company, atebits, created both Tweetie for Mac and Tweetie
for iOS, which were acquired by Twitter. Why does it take big teams, big
budgets, and long timelines to deliver web apps that have functionality and UI
that approaches that of an iPhone app put together by one or two people?

If you're a developer who is obsessive about building a quality user experience, you are most likely to create an iOS application. One reason is that Cocoa is able to operate at a higher level of abstraction than raw web primitives. It means that iOS developers can think more about how their UI or features should work, instead of how they should be implemented. The human brain is like a buffer: at a certain point, every new concept pushes something else off the other end. For web developers, buffer overflow is common as they grapple with cross-browser bugs or APIs that are openly design-by-committee.

**The web needs better abstractions**. There are, however, only a limited number of abstractions you can implement in under 5k of code. I'm sensitive to cultivating an attitude in the community that the only valuable problems worth solving are those that can be done under 5k (or 10k, or 20k, or…). I will take my share of the blame, and admit that many frameworks that tried to take on large problems ended up out-of-touch and crufty.

The web won't have a singular answer, and that's fine. But we have to avoid fostering a culture where people are afraid to tackle hard problems because they'll be seen as architecture astronauts. We shouldn't let the mistakes of the past make us timid about learning and moving forward.

***

Yesterday on Twitter, I posted:
> Just wanted to point out that Backbone is still listed on microjs.com, even though it's &gt;5k if you count dependencies.
> Which is fine; let's just be upfront about the fact that microjs.com is more akin to the cool kids table than a useful directory.

In retrospect, this came off crankier than I intended. Several people contacted me privately (and publicly!) and weren't sure why I was making a stink over something that, to them, seemed trivial. And while in the scheme of things it _is_ trivial, I think this arbitrary line in the sand we as a community have drawn is harmful to the future of the web.

I want the web to win. Everywhere.

So I want people to be aware of the abstractions we're giving up to hit our 5k target. If some things get included that are over 5k, and other things get rejected that are under the 5k limit, it sends a very mixed message to new developers about what is possible. If we're going to emphasize small codebases, let's be honest about the limitations that entails.

If we don't get our act together soon, proprietary platforms are going to become entrenched. Every new device that comes out is an opportunity that is ours to lose. The community has to figure out how we educate and recruit developers into the web fold. People will disagree with me about the best way to accomplish the task, and that's great. But I'd like to compete on things like developer productivity and finished products, not insinuation that anything over a certain size is inherently unsuitable for the web.

It's human nature that once we start assigning labels to things, we think about which side of the label we're on. I think that positioning microlibraries as a separate "thing" is a bad idea. There are just tools that fall on different sides of the size spectrum.

Writing efficient code is important. But when we decide that certain web abstractions are a bridge too far, we're actively discouraging precisely the developers that we need the most. When the next Loren Brichter comes along, I want to be able to say he or she is a web developer.

_Thanks to Majd Taby and Yehuda Katz for reviewing this post. I tweet as [@tomdale](http://www.twitter.com/tomdale) if you'd like more timely updates._
