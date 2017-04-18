import fs = require('fs');
import fse = require('fs-extra');
import path = require('path');
import mkdirp = require('mkdirp');
import sass = require('node-sass');

import Generator from './generator';
import Media from './models/media';

let generator = new Generator();

let posts = generator.database.posts;
let pages = values(generator.database.pages);
let media: Media[] = [];

interface Renderable {
  outputPath: string;
  render(): string | Buffer;
}

interface Copyable {
  inputPath: string;
  outputPath: string;
}

type Buildable = Renderable | Copyable;

// Expand array of posts and pages to include their media entries.
let content: Buildable[] = [...posts, ...pages]
  .map(p => [p, ...p.media])
  .reduce((a, b) => a.concat(b));

content.push({
  outputPath: 'archive/',
  render() {
    return generator.generateArchive();
  }
});

content.push({
  outputPath: '/',
  render() {
    return generator.generateIndex();
  }
});

content.push({
  outputPath: 'style.css',
  render() {
    return sass.renderSync({
      file: path.join(__dirname, '../styles/style.scss')
    }).css;
  }
})

function hasExtension(file: string) {
  return file.indexOf('.') > -1;
}

for (let item of content) {
  let outputPath = item.outputPath;

  if (!hasExtension(outputPath)) {
    outputPath = path.join(outputPath, 'index.html');
  } 

  outputPath = path.join('./dist/', outputPath);

  mkdirp.sync(path.dirname(outputPath));

  if (isRenderable(item)) {
    console.log(`Generating ${outputPath}`);
    fs.writeFileSync(outputPath, item.render(), 'utf8');
  } else {
    console.log(`Copying ${outputPath}`);
    fse.copySync(item.inputPath, outputPath);
  }
}

function isRenderable(item: Buildable): item is Renderable {
  return (item as Renderable).render !== undefined;
}

function values<T>(obj: { [key: string]: T }) {
  return Object.keys(obj)
    .map(key => obj[key]);
}

let pub = fs.readdirSync('public');

for (let file of pub) {
  fse.copySync(path.join('public', file), path.join('dist', file));
}
