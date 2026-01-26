import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require('glob') as { sync: (pattern: string, options?: any) => string[] };

import marked from "../utils/marked";
import smartypants from '../utils/smartypants';

import { generator } from '../generator';
import Media from './media';
import { loadTemplates } from "../templates";

interface FrontMatterResult {
  body: string;
  attributes: Record<string, any>;
}

interface ContentConstructor<T> {
  new(filePath: string, metadata: FrontMatterResult): T;
}

abstract class Content {
  abstract type: string;
  inputPath: string;
  attributes: Record<string, any>;
  templates: HandlebarsTemplates;
  _body: string;

  static fromFile<T extends Content>(this: ContentConstructor<T>, filePath: string): T {
    let data = fs.readFileSync(filePath).toString();
    let metadata = fm<Record<string, any>>(data);
    return new this(filePath, metadata);
  }

  constructor(inputPath: string, { body, attributes }: FrontMatterResult) {
    this.inputPath = inputPath;
    this.attributes = attributes;
    this.templates = loadTemplates();
    this._body = body;
  }

  get outputPath() {
    return generator.serialize(this.type, this);
  }

  get slug() {
    return path.basename(this.inputPath, '.md');
  }

  get date(): moment.Moment {
    return moment(this.attributes.date);
  }

  get title() {
    let title = this.attributes.title || '';
    return smartypants(title);
  }

  get body() {
    return marked(this._body);
  }

  get media(): Media[] {
    if (!this.hasOwnDirectory()) { return []; }

    let mediaPath = path.dirname(this.inputPath);
    let media = glob.sync('**/*', { cwd: mediaPath })
      .filter(file => file !== path.relative(mediaPath, this.inputPath))
      .map(file => path.join(mediaPath, file))
      .map(file => new Media(file, this));

    return media;
  }

  private hasOwnDirectory() {
    let dirname = path.dirname(this.inputPath);
    return dirname.split(path.sep).pop() === this.slug;
  }
}


export default Content;
