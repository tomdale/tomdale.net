import Content from './content';
import Post from './post';
import path = require('path');

export default class Media {
  type = 'media';

  inputPath: string;
  content: Content;

  constructor(filePath: string, content: Content) {
    this.inputPath = filePath;
    this.content = content;
  }

  get outputPath() {
    return path.join(this.content.outputPath, this.mediaPath);
  }

  get mediaPath() {
    return path.relative(path.dirname(this.content.inputPath), this.inputPath);
  }

  get month() {
    if (this.content instanceof Post) {
      return this.content.month;
    }
  }

  get year() {
    if (this.content instanceof Post) {
      return this.content.year;
    }
  }

  get slug() {
    return this.content.slug;
  }
}
