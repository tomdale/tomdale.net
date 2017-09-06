---
title: "Broccoli and webpack"
date: 2017-08-08
---

Sometimes people ask me if we're going to replace Broccoli with webpack. What
most people don't realize is that Broccoli and webpack are actually two tastes
that taste great together.

Fundamentally, Broccoli and webpack are two very different tools, but inevitably
they get compared because they seem to occupy the same niche: build tools for
JavaScript web apps.

Of course, as JavaScript apps get more sophisticated, so too do our build needs. A
modern web app might have four or more distinct compilation steps:

1. Sass → CSS
2. TypeScript → JavaScript
3. JS modules → browser-compatible bundle
4. Unminified source → minified

webpack is an _amazing_ tool for efficiently packaging up JavaScript apps. At
the same time, it has a reputation for becoming a rat's nest of configuration
that gets harder and harder to extend over time.

Using webpack is a delightful experience at the beginning, but the more complex
your compilation pipeline gets, the more of a nightmare it becomes.

Why is that? _Because webpack is a JavaScript packager, not a tool for describing complex
transformations._

But here's the good news: Broccoli is an awesome tool for doing exactly that!
And when Broccoli is paired with webpack, it's a match made in
heaven.

## What is Broccoli?

You've probably heard of Broccoli before, but don't know exactly what it is.
It's like a variant of Grunt that Ember people prefer for some weird reason,
right?

Here's why Broccoli is so cool: _it's actually like React for the filesystem._

That's a bold statement, so let me explain what I mean.

React lets you declaratively express a hierarchy of UI components with clear
data flow between them, efficiently keeping the DOM up-to-date as underlying
state changes.

Broccoli lets you declaratively express chained transformations of files,
efficiently keeping the output directory up-to-date as input files change. These
transformation sequences are all described in JavaScript, so all of the tools
you're used to for managing complexity are available—no more out-of-control
config files!

Here's a small example that shows what a Broccoli build pipeline looks like:

```js
const { find, merge } = require('broccoli-fp');
const { promisify } = require('util');
const { transform } = require('babel-core');
const { render } = require('node-sass');

function buildJS() {
  return find('src/**/*.js')
    .map(contents => transform(contents).code)
    .concat('app.js');
}

function buildCSS() {
  const sass = promisify(render);
  return find('src/**/*.scss')
    .map(file => {
      return sass({ file })
        .then(result => result.css);
    })
    .concat('app.css')
}

module.exports = function() {
  let js = buildJS();
  let css = buildCSS();

  return merge([js, css]);
}
```

Even if you've never used Broccoli before, I hope you can intuit what this file
is describing.

First, we call `buildJS()`, which finds all of the `.js` files in our `src`
directory, transpiles them with Babel, and then concatenates them all into a
single file called `app.js`.

Second, we call `buildCSS()`, which finds all of the `.scss` files in `src`,
compiles them with the `node-sass` package, and concatenates them all into a
file call `app.css`.

Lastly, we merge the results of both of these operations into a single output directory.
If we had an input tree that looked like this:

```
src/
  components/
    Panel/
      component.js
      style.scss
    App/
      component.js
      style.scss
```

Our output directory (`dist/` by default) would look like this:

```
dist/
  app.js
  app.css
```

## Simple Building Blocks

Each transformation in Broccoli is provided by a plugin. The plugin API is extremely straightforward.
To write a basic plugin, you only have to know three things about the API:

1. Each plugin has an `inputPaths` property, an array of directory paths to read from.
2. Each plugin has an `outputPath` property, a path to a directory to write to.
3. Plugins must implement a `build()` method. When `build()` gets called, read
   all of the files from `inputPaths`, perform your transformation, and write
   the output to `outputPath`.

Plugins can either be synchronous or asynchronous; async plugins simply return a
`Promise` from the `build()` method.

Because Broccoli plugins work in terms of _files and paths_ rather than streams
or an invented virtual file system abstraction, they work with essentially any
existing tool, whether written for Node or not.

For example, we could write a Broccoli plugin that uses the `du` command line utility to
create a crude report of file sizes.

```js
const Plugin = require('broccoli-plugin');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = class FileSizeReport extends Plugin {
  async build() {
    let { inputPaths, outputPath } = this;

    await Promise.all(
      inputPaths.map(inputPath => {
        let cmd = `du -sh * >> "${outputPath}"/manifest.txt`;
        return execAsync(cmd, { cwd: inputPath });
      })
    );
  }
}
```

Now, probably you wouldn't write this exact plugin. But I want to highlight how
easy it is to build composable transformations with Broccoli, even when they're
using tools like `du` that date to the 1970's. If you believe in the Unix
philosophy, you will love Broccoli.

## Functional Programming for the Filesystem



## Conclusion

when all you have is a hammer, everything looks like a nail