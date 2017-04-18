---
title: "SemVer Shouldn't Mean More Breaking Changes"
date: 2016-12-15 22:22:54
---

There’s a fundamental mistake I see a lot of open source maintainers make when
they start thinking about Semantic Versioning, or SemVer.

A SemVer major bumps allow you to communicate to your users that you’ve made
breaking changes in your library. It makes it easier for package managers to
understand when they can upgrade dependencies automatically, and when they
should let a human deal with it.

But, ease of communication ≠ ease of dealing with the breaking change.

Just because your project follows SemVer to the letter does not make breaking
changes painless or free. SemVer doesn’t solve the human problem: frequent
breaking changes cause users to feel more and more behind, until the idea of
ever getting on the latest version without a rewrite feels impossible.

SemVer allows you to better communicate breaking changes, but it doesn’t change
the fact that they have significant community cost.

Sometimes, of course, your library starts to get so dragged down by the
technical weight of old APIs that you have to make a very hard decision to
deprecate and remove them. People will be upset in the short term, and there may
be a percentage of users who never make the jump, but it’s the right decision
for the future of your software.

But that decision requires careful contextual analysis and should be done
sparingly. It also requires an intuition about your community and their mood
about churn vs. making progress.

To me, the idea of regularly scheduled major versions (and hence regularly
scheduled breaking changes) is a scary one. It incentivizes contributors to be
brash about removing things that they no longer consider valuable. Hey, there’s
a breaking change scheduled anyway, right? We’ve fulfilled our end of the
bargain, so might as well get rid of it.

Every community has a different ability to absorb change, and it fluctuates over
time. To keep a community from becoming fragmented, you need to carefully read
the tea leaves and make a reasoned decision about the right time to make a
break. Otherwise, you run the risk of another Python 3, but now your community
fragmentation is spread out over even more versions.
