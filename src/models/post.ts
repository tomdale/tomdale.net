import fs = require('fs');
import fm = require('front-matter');
import moment = require('moment');
import path = require('path');

import Content from './content';

import marked from '../utils/marked';

let posts: Post[] = [];

export default class Post extends Content {
  type = 'post';

  inputPath: string;
  attributes: fm.Attributes;
  previous: Post | null;
  next: Post | null;

  static fromFile(filePath: string) {
    let data = fs.readFileSync(filePath).toString();
    let metadata = fm(data);
    return new Post(filePath, metadata);
  }

  render(): string {
    return this.templates.post({
      post: this
    });
  }

  get hidden() {
    return this.attributes.hidden;
  }

  get url() {
    let date = this.date.format('YYYY/MM');
    let slug = this.slug;

    return `/${date}/${this.slug}/`
  }

  get month() {
    return this.date.format('MM');
  }

  get year() {
    return this.date.format('YYYY');
  }

  get excerpt() {
    return marked(this.excerptText);
  }

  get excerptText() {
    let lines = this._body.split('\n');
    let buf = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (line !== '') {
        buf.push(line);
        continue;
      }

      if (buf.length > 0) {
        break;
      }
    }

    return buf.join('\n').trim();
  }

  get image() {
    return this.attributes.image;
  }
}
