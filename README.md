This is the source code for my website/blog, [tomdale.net](https://www.tomdale.net). It is a handrolled
static site generator written in TypeScript.

## License

The source code for the static site generator is released under the MIT license;
I hope it is useful to you!

The contents of the site (i.e., anything not inside the `src/` directory)
remains my copyright with all rights reserved.

## Layout

* `src/` - the source code for the static site generator
* `pages/` - Individual pages
* `posts/` - Blog posts, by convention grouped by year (but it'll find 'em wherever you put 'em)
* `public/` - Static content that will get included during a deploy
* `styles/` - Sass stylesheets. `style.scss` is the entry point; everything else must be manually imported.
* `templates/` - Handlebars templates. Partials start with an underscore.
* `dist/` - the built output

## Commands

* `npm start` - starts the development server at <http://localhost:4000/>
* `npm run build` - builds a static version of the site to `dist/`
* `npm run build:production` - same as above with minification and other optimizations applied
* `npm run minify` - runs the minification step against `dist/`
* `npm run deploy` - manual deploy to Netlify

## Architecture

The `Generator` (`src/generator.ts`) is like a router (in fact it uses
`route-recognizer.js` to do route matching). Files are scanned to create an
in-memory database and wrapped in the appropriate model class (see
`src/models/`).

In development, an Express server runs and routes requests to the generator,
which finds the appropriate model in the in-memory database and renders it with the
route's Handlebars template. (The file database and templates are rebuilt every
request so changes are reflected without having to restart the server.)

When doing a static build of the site, the contents of the database are
enumerated and a representation for each item is built. (This is where
`route-recognizer.js`'s ability to both serialize and deserialize paths really
comes in handy.)

Markdown content is rendered with `marked` and syntax highlighting is done with
`highlight.js` (see `src/utils/marked.ts`).

Media files can be colocated with a Markdown source file and inherit its URL.
So, for example, if you had:

* `posts/foo/bar/baz/bang/dumb-post.md`
* `posts/foo/bar/baz/bang/some-image.png`
* `posts/foo/bar/baz/bang/songs/power-of-love.mp3`

They would end up being generated at the URLs:

* `2017/06/dumb-post/index.html` (rendered post)
* `2017/06/dumb-post/some-image.png`
* `2017/06/dumb-post/songs/power-of-love.mp3`

TLDR you can put any post or page in a directory and any assets you throw in
there with it will be grouped correctly based on the routing rules specified in
the generator.
