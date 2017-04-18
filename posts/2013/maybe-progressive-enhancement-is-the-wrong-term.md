---
title: Maybe Progressive Enhancement is the Wrong Term
id: 875
comment: false
categories:
  - General
date: 2013-09-04 16:20:29
tags:
---

Many of the responses to my last article, [Progressive Enhancement: Zed's Dead, Baby](http://tomdale.net/2013/09/progressive-enhancement-is-dead/),
were that I "didn't get" progressive enhancement.

"'Progressive enhancement' isn't 'working with JavaScript disabled,'" proponents argued.

First, many, many people conflate the two. [Sigh JavaScript](http://sighjavascript.tumblr.com)
is an exercise in lobotomizing browsers and then expecting websites to still work with them. This is a little bit
like arguing that we should still be laying out our websites using tables and inline styles in case users disable
CSS. No. JavaScript is part of the web platform; you don't get to take it away and expect the web to work.

So, maybe it is time to choose a new term that doesn't carry with it the baggage of the past.

Second, many people argued that web applications should always be initially
rendered on the server. Only once the browser has finished rendering that initial
HTML payload should JavaScript then take over.

These folks agree that 100% JavaScript-driven apps (like [Bustle](http://bustle.com)) are faster than
traditional, server-rendered apps after the initial load, but argue that any increase in time-to-initial-content
is an unacceptable tradeoff.

While I think that for many apps, it _is_ an acceptable tradeoff, it clearly isn't for many others, like
Twitter.

Unfortunately, telling people to "just render the initial HTML on the server" is a bit like saying "it's easy to
end world hunger; just give everyone some food." You've described the solution while leaving out many of the important
details in the middle. Doing this in a sane way that scales up to a large application requires architecting your
app in such a way that you can separate out certain parts, like data fetching and HTML rendering, and do those just
on the server.

Once you've done that, you need to somehow transfer the state that the server used to do its initial render over to
the client, so it can pick up where the server left off.

You can do this by hand (see Airbnb's [Rendr](https://github.com/airbnb/rendr)) but it requires so much manual labor that any application of complexity would quickly fall apart.

That being said, I agree that this is where JavaScript applications are heading, and I think Ember is strongly positioned
to be one of the first to deliver a comprehensive solution to both web spidering and initial server renders that improve
the "time to first content." We've been thinking about this for a long time and have designed Ember's architecture around it.
I laid out our plan last June in an interview on the [Herding Code podcast](http://herdingcode.com/herding-code-169-tom-dale-and-rob-conery-on-the-emberjs-angularjs-cage-match-at-ndc/). (I start talking about this around the 19:30 mark.)

I think that once we deliver server-side renders that can hand off seamlessly to JavaScript on the client, we will be able to combine the speed of initial load times of traditional web applications with the snappy performance and superior maintainability of 100% JavaScript apps like Bustle and its peers.

Of course, there are many UI issues that we still need to figure out as a community. For one thing, server-rendered apps can leave you with a non-functional Potemkin village of UI elements until the JavaScript finishes loading, leading to frustrating phantom clicks that go nowhere.

Just don't dismiss 100% JavaScript apps because of where they are today. The future is coming fast.