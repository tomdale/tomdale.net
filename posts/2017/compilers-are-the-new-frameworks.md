---
title: "Compilers are the New Frameworks"
date: '2017-09-05'
---

My current "investment thesis" is that what we call web frameworks are
transforming from runtime libraries into optimizing compilers. When it comes to
eking performance out of hand-authored JavaScript and accompanying runtime
libraries, we've reached the point of diminishing returns.

Increasingly, the bytes that get shipped to browsers will bear less and less
resemblance to the source code that web developers write.

In the same way that a compiled Android binary bears little resemblance to the
original Java source code, the assets we serve to users will be the
aggressively-optimized output of sophisticated build tools. The trend started by
minifiers like UglifyJS and continued by transpilers like Babel will only
accelerate.

This is a loss in some ways (who else got their web development start with View
Source?) but is a huge win for users, particularly in emerging markets.

Ember has always been driven by the idea that web apps are becoming more and
more like native apps over time. Initially, I thought that just meant
architecturally. Early on, the idea of a stateful UI app written entirely in
JavaScript was very controversial. But as these kinds of apps become more widely
accepted, it's increasingly clear to me that the next step is becoming more like
native apps in implementation details, too.

Between [WebAssembly](http://webassembly.org/), [SharedArrayBuffer and
Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics),
and maybe even [threads in
JavaScript](https://webkit.org/blog/7846/concurrent-javascript-it-can-work/),
the building blocks for the next generation of web applications are falling into
place. If you're interested in predicting the future of the web, just look at
what high-performance native systems look like, then figure out how we can apply
those ideas in the browser.

But that's not to suggest that the task is as simple as just porting good ideas
to web APIs. The constraints are very different.

Native code tends to have the luxury of not really caring about file size—a
small 40MB iOS app would get you laughed out of the room on the web. And AAA
game titles accept minutes-long load times in exchange for consistent 60fps
performance, but I shudder to think what a 30 second load time would do to the
conversion rate of your e-commerce site, 60fps or not.

Our job now is figuring out how to adapt the ideas of high-performance native
code while preserving what makes the web great: URLs, instant loading, and a
security model that allows us to forget that we run thousands and thousands of
untrusted scripts every day.

So here's my advice for anyone who wants to make a dent in the future of web
development: time to learn how compilers work.
