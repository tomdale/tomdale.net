---
title: The Future of the View Layer
id: 358
comment: false
categories:
  - General
date: 2011-03-10 22:22:54
tags:
---

_The views expressed below are my own and not those of the SproutCore core team._

Recently, Yehuda Katz and I have been making some changes to the
SproutCore view layer. We've pulled out basic functionality into a new
class called SC.CoreView, and broken the old SC.View (a behemoth) into
several files based on what features they add. We also introduced
SC.TemplateView, a subclass of SC.CoreView, that allows you to use
[Handlebars templates](http://handlebarsjs.com). [1][1] [2][2]

[1]: <http://blog.sproutcore.com/post/3594199971/introducing-sc-templateview-now-with-tutorial>
[2]: <http://blog.sproutcore.com/post/3575607410/sproutcore-1-5-pre-4-templateview-is-here>

_(After the Ember/SproutCore split, someone on the SproutCore team seems to have scrubbed these posts from their blog. —Ed)_

Changes like these can be scary because they introduce uncertainty, but
I want to assure you that the project is still headed in the same direction; we just have two additional goals:

* Reduce the learning curve for new developers
* Improve load time on low-power, low-bandwidth devices (e.g., iPad and Android tablets)

It turns out that these view changes put us on the path towards meeting both goals.

The `desktop` framework, which can best be described as SproutCore's
widget library, is its largest by far. The major reason for its size is
that we have re-implemented almost all desktop controls in JavaScript and HTML.
For example, SproutCore menu items flash when selected,
like they do in Mac OS X, and we have popovers that can anchor to
another on-screen element, like in iOS.

The downside to this sophistication is both an increase in code size and
an increase in cognitive overhead for developers new to SproutCore. In
particular, traditional web developers have a hard time learning how
views work; they are better off reading the [Cocoa guide to
views](http://developer.apple.com/library/mac/#documentation/cocoa/conceptual/CocoaViewsGuide/Introduction/Introduction.html)
than to read a book on JavaScript and DOM.

Today, when we ask developers to write SproutCore applications, we ask
them to throw away their existing expertise and commit entirely to the
framework. If in six months they decide it won't meet their needs, they
have to abandon almost all of their work. And it's almost
impossible to test the waters with an existing codebase, since
developers must throw away their entire view layer.

Many developers don't want or need native-style controls. They want to
throw together a quick application that still feels like a website.  We
can bring value to these developers, too. While SproutCore's view layer
complements the controller and model layers, it doesn't require
them---indeed, the point of MVC is to encapsulate these concerns. If we
can bring the sophistication of the data store and the robustness of
statechart-driven apps to everyone, we should.

Here's the thing about templates, though: _they're a better way of
doing what we've been doing all along._

At its core, a SproutCore view is a DOM representation plus a managed
layout. You need to build that DOM representation somehow, which means
either multiple DOM API calls, or lots of string concatenation
operations.

For example, here's the render method for SC.RadioView:

```js
render: function(dataSource, context) {
  var theme = dataSource.get('theme');

  var isSelected = dataSource.get('isSelected'),
      width = dataSource.get('width'),
      title = dataSource.get('title'),
      value = dataSource.get('value'),
      ariaLabeledBy = dataSource.get('ariaLabeledBy'),
      ariaLabel     = dataSource.get('ariaLabel');

  context.setClass({
    active: dataSource.get('isActive'),
    mixed: dataSource.get('isMixed'),
    sel: dataSource.get('isSelected'),
    disabled: !dataSource.get('isEnabled')
  });

  //accessing accessibility
  context.attr('role', 'radio');
  context.attr('aria-checked', isSelected);
  if(ariaLabel && ariaLabel !== "") {
    context.attr('aria-label', ariaLabel);
  }
  if(ariaLabeledBy && ariaLabeledBy !== "") {
    context.attr('aria-labelledby', ariaLabeledBy);
  }

  if (width) context.css('width', width);

  context.push('<span class = "button"></span>');

  context = context.begin('span').addClass('sc-button-label');
  theme.labelRenderDelegate.render(dataSource, context);
  context = context.end();
}
```

For those keeping track at home, that's 34 lines of code to generate
this:

```html
<div class="sc-radio-button mixed" aria-checked="true" role="radio" index="0">
  <span class="button"></span>
  <span class="sc-button-label">Item1</span>
</div>
```

And that's just to *create* the DOM representation. Updating it takes
another 27 lines of code, and it's not even efficient; if a single
property changes, it re-renders the entire label portion of the control.

Imagine if we could instead tell the radio view to use a template:

```hbs
<div {{bindClass "classNames isActive isMixed isSelected isEnabled"}}
     {{bindAttr role="ariaRole"
                aria-checked="ariaChecked"
                aria-label="ariaLabel"
                aria-labelledby="ariaLabeledBy"}}>
  <span class="button"></span>
  <span class="sc-button-label">
    {{renderDelegate "label"}}
  </span>
</div>
```

This is both shorter and easier to understand. But perhaps most
importantly, good abstractions allow us to make optimizations once.
Instead of each view trying (and failing) to optimize DOM access, and in
the process introducing a rat's nest of complicated logic, we can move
the complexity to the templating layer and have every view ever written
benefit from it.

We could, for example, use different optimizations for Internet Explorer
and Chrome. Because views are now stating _intent_ instead of atomic DOM
operations, we can choose the fastest path based on the performance
characteristics of the current environment. Decoupling allows
implementers to focus on behavior and appearance, not the intricacies of
DOM.

My point is this: template views are not meant as a replacement for
SC.View and our rich library of controls. In fact, template views can
serve to make desktop-style controls even better. If controls are easier
to implement, more people will make them, and then we all benefit.

Template views *are* designed to integrate with existing applications,
or to stand on their own if you need them to. As always, it's important
to pick the right tool for the job.

<hr>

Yehuda and I have recently made fixes to SC.TemplateView that allow it
to be used inside traditional view hierarchies. An updated prerelease
gem with these changes is in the works, or you can find them in the
master branch on GitHub.

We think there will be a lot of opportunity for existing SproutCore apps
to take advantage of templates.  For example, think of the many modern
Mac OS X applications that use a WebView to integrate HTML content.

If you're starting a new SproutCore application, you can decide which
works best for you. If you want a web-style application or a
desktop-style application (or some combination of the two), we want you
to feel like a first-class citizen. And if you opt for desktop-style, we
will work hard to ensure SC.TemplateView works with Greenhouse when it
ships.

_I will be discussing this and more at the [SF SproutCore meetup](http://www.meetup.com/sproutcore/events/16508797/), Tuesday, March 15._

_Thanks to Chris Swasey, Tyler Keating, Sudarshan Bhat and Peter Wagenet for reviewing this post. I tweet at [@tomdale](http://twitter.com/tomdale) if you want more timely updates._
