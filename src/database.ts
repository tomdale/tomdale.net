import glob = require('glob');
import _ = require('lodash');

import Post from './models/post';
import Page from './models/page';

interface Pages {
  [key: string]: Page;
}

export default class Database {
  posts: Post[];
  pages: Pages;

  constructor() {
    let posts = this.posts = glob.sync('posts/**/*.md')
      .map(Post.fromFile)
      .sort((a, b) => b.attributes.date - a.attributes.date);

    for (let i = 0; i < this.visiblePosts.length; i++) {
      posts[i].next = posts[i+1] || null;
      posts[i].previous = posts[i-1] || null;
    }

    let pages: Pages = this.pages = {};

    glob.sync('pages/**/*.md')
      .map(Page.fromFile)
      .forEach(page => pages[page.slug] = page);
  }

  get visiblePosts() {
    return this.posts.filter(p => !p.hidden);
  }

  findPost(slug: string) {
    return this.posts.find(post => post.slug === slug);
  }

  findPage(slug: string) {
    return this.pages[slug];
  }

  /** Returns the latest post. */
  latest(): Post {
    return this.visiblePosts[0];
  }

  /** Returns the most recent posts, not including the latest post. */
  recent(count = 5): Post[] {
    return this.visiblePosts.slice(1, count);
  }

  byDate() {
    let years = _(this.visiblePosts)
      .groupBy(post => post.date.year())
      .toPairs()
      .orderBy(([year]) => year, 'desc')
      .map(([year, posts]) => ({ year, posts }))
      .value();

    return years;
  }
}
