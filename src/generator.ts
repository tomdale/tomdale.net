import RouteRecognizer from 'route-recognizer';
import * as fs from 'fs';
import * as path from 'path';
import Database from './database';
import { loadTemplates } from './templates';

export default class Generator {
  recognizer: RouteRecognizer;
  templates: HandlebarsTemplates;
  database: Database;

  constructor() {
    let recognizer = this.recognizer = new RouteRecognizer();

    this.addRoute('index', '/');
    this.addRoute('archive', '/archive');
    this.addRoute('post', '/:year/:month/:slug/');
    this.addRoute('postMedia', '/:year/:month/:slug/:mediaPath');
    this.addRoute('page', '/:slug');
    this.addRoute('pageMedia','/:slug/:mediaPath');

    this.templates = loadTemplates();
    this.database = new Database();
  }
  
  addRoute(name: string, path: string) {
    this.recognizer.add([{ path, handler: name }], { as: name });
  }

  serialize(name: string, params: any) {
    // Extract plain object from params (which may have getters)
    const plainParams: Record<string, string> = {};
    if (params.slug) plainParams.slug = params.slug;
    if (params.year) plainParams.year = params.year;
    if (params.month) plainParams.month = params.month;
    if (params.mediaPath) plainParams.mediaPath = params.mediaPath;
    return this.recognizer.generate(name, plainParams);
  }

  generate(path: string): string | Buffer | null {
    let results = this.recognizer.recognize(path);

    if (!results) { return null; }

    let result = results[0];
    if (!result) { return null };

    let handler = result.handler as string;
    switch (handler) {
      case 'index':
        return this.generateIndex();
      case 'archive':
        return this.generateArchive();
      case 'post':
        return this.generatePost(result.params['slug'] as string);
      case 'postMedia':
        return this.generateMedia(result.params as { [key: string]: string }) || null;
      case 'page':
        return this.generatePage(result.params['slug'] as string);
      case 'pageMedia':
        return this.generatePageMedia(result.params as { [key: string]: string }) || null;
    }

    return null;
  }

  generateIndex() {
    return this.templates.index({
      latest: this.database.latest(),
      recent: this.database.recent()
    });
  }

  generateArchive() {
    return this.templates.archive({
      years: this.database.byDate(),
      title: 'Archive'
    });
  }

  generatePost(slug: string) {
    let post = this.database.findPost(slug);
    return post ? post.render() : null;
  }

  generateMedia(params: { [key: string]: string }) {
    let { slug, mediaPath } = params;
    let post = this.database.findPost(slug);

    if (post) {
      let base = path.dirname(post.inputPath);
      mediaPath = path.join(base, mediaPath);
      return fs.readFileSync(mediaPath);
    }
  }

  generatePageMedia(params: { [key: string]: string }) {
    let { slug, mediaPath } = params;
    let page = this.database.findPage(slug);

    if (page) {
      let media = page.media;

      for (let medium of media) {
        if (medium.mediaPath === mediaPath) {
          return fs.readFileSync(medium.inputPath);
        }
      }
    }
  }

  generatePage(slug: string) {
    let page = this.database.findPage(slug);
    return page ? page.render() : null;
  }
}

export const generator = new Generator();
