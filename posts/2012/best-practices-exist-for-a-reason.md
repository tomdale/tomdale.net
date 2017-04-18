---
title: Best Practices Exist for a Reason
id: 593
comment: false
categories:
  - General
date: 2012-04-28 20:54:18
tags:
---

If you've ever used node.js, you've probably also used Isaac Schlueter's npm, the node package manager. By maintaining a central repository to which authors can quickly publish their JavaScript modules, npm has made it easy to get started building node apps and its popularity has exploded over the past year. Unfortunately, two months ago, [the hashed passwords of all npm accounts were leaked.](https://gist.github.com/2001456) npm uses CouchDB for its backend, and the default security model is to grant administrator access to all databases, but only when connections originate from the same machine. It appears that in this case, the CouchDB server was made accessible to the world over HTTP with the default access settings left in place.

In retrospect, it's obviously a dumb mistake, but the same kind of dumb mistake you or I or anyone ten times smarter than us could make; whether because we're sick or tired or under pressure or simply because we're using a new system that we've never used before.

The community's reaction to the security leak was relatively forgiving, and rightly so. After all, npm is a community project that was created and is maintained for free, and we all benefit from the enormous amount of time and energy that Isaac and the other npm contributors have generously donated.

And yet, npm is no longer just a hobby project. Thousands of people rely on it to provide services to themselves, their friends, and to paying customers. Additionally, when it comes to security, there can be repercussions far beyond the original breach. Anyone who created an npm account and used the same password for another web service is potentially at risk.

So this is the eternal balancing act that open source maintainers (and, indeed, many startups) must face: limited time and resources for building, securing and maintaining systems that will be used by hundreds, thousands, or even millions of people.

Which is why I have been so saddened and, yes, angry, about the recent trend in the JavaScript community; to throw away the best practices we have spent a long time honing in what, to my eyes, is an act of machismo; a revolt against good engineering practices for the sake of revolting rather than to make the world a better place.

As a community we've advocated for these things precisely because most comers to JavaScript are not us, not as invested in the language and the ecosystem as us; but rather have been thrown at some problem because all of a sudden it's 2012 and not writing JavaScript is no longer an option. They are not JavaScript developers per se; they are Java developers or Ruby developers or .NET developers or any of the thousands of possible kinds of developers who are now thrust into this unfamiliar world where JavaScript is the substrate that holds the web together.

Here's the thing about best practices: at the point at which you become sufficiently experienced, you understand why they are good and so can choose to not use them as the situation allows. Your understanding of the language or the ecosystem or the particular problem at hand has allowed you to view the problem from the same vantage point of the people that came up with those best practices; and so you are free to discard them if the situation merits.

But until your understanding has crystallized, not following those best practices can cost you hours of wasted time tracking down bugs that didn't have to otherwise exist. But **writing code before you have an expert-level understanding is okay**. It's okay because it is reality and there is nothing you can do to change the fact that people with a very tenuous grasp of these technologies are being thrown at hard problems that they will solve one way or another.

Which is why I have to admit that my blood boiled when I read [Isaac's post about automatic semicolon insertion](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding). I don't want to re-litigate the semicolon debate because I think we were all tired of it before it even began. What I want to highlight is a general attitude that I find very disappointing:

> I am sorry that, instead of educating you, the leaders in this language community have given you lies and fear.

By couching it in these terms, it implies that anyone who follows best practices has given in to "lies and fear!" Who wants to be swayed by that?

A more generous interpretation is that the leaders Isaac accuses of spreading lies and fear know that the reality is that you have a month to ship a JavaScript app, and asking you to understand the ECMAScript spec is not reasonable. (Because it's not just automatic semicolon insertion, right? It's `this` binding and anonymous functions and a million other features of JavaScript that confuse newcomers.)

We can't front-load complexity and let people sort it out. That way lies madness. We must distill the rules down so that people can be effective, and help them along their journey towards JavaScript mastery. It's a learning curve, not a learning cliff.

So I have to vehemently disagree with this statement in Isaac's post:

> If you don’t understand how statements in JavaScript are terminated, then you just don’t know JavaScript very well, and shouldn’t write JavaScript programs professionally without supervision…

I find this staggeringly condescending, but maybe it's just my reading of it. But even if my reading is wrong, it rejects reality. Isaac knows this because the npm team deployed a misconfigured CouchDB instance to production **and it's not their fault.** To suggest they needed "supervision" is absurd. They were not expert-level CouchDB users but they had a job to do so they picked the tool and went to town. This is a CouchDB failing; because the best practices were not made clear enough or the default settings were not strict enough.

So let's learn from our mistakes and realize that the bulk of JavaScript developers are not experts. Let's stop tearing down the hard work our predecessors have done to shepherd JavaScript from a toy language to the language that is revolutionizing how the web applications are built. Let's embrace good engineering practices and have the sense to know when to ignore them, and not abandon them altogether to prove how smart we are. We're all in this together.