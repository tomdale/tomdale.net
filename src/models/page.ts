import fs = require('fs');
import fm = require('front-matter');

import Content from './content';
import marked from "../utils/marked";

export default class Page extends Content {
  type = 'page';

  static fromFile(filePath: string) {
    let data = fs.readFileSync(filePath).toString();
    let metadata = fm(data);
    return new Page(filePath, metadata);
  }

  render(): string {
    return this.templates.page({
      page: this,
      title: this.title
    });
  }
}
