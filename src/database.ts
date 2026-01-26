// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require('glob') as { sync: (pattern: string) => string[] };
import _ from 'lodash';

import Post from './models/post';
import Page from './models/page';

interface Pages {
  [key: string]: Page;
}

export default class Database {
  posts: Post[];
  pages: Pages;

  constructor() {
    let posts = this.posts = (glob.sync('posts/**/*.md')
      .map((file: string) => Post.fromFile(file)) as Post[])
      .sort((a: Post, b: Post) => (b.date as any) - (a.date as any));

    for (let i = 0; i < this.visiblePosts.length; i++) {
      posts[i].next = posts[i+1] || null;
      posts[i].previous = posts[i-1] || null;
    }

    let pages: Pages = this.pages = {};

    (glob.sync('pages/**/*.md')
      .map((file: string) => Page.fromFile(file)) as Page[])
      .forEach((page: Page) => pages[page.slug] = page);
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
      .groupBy((post: Post) => post.date.year())
      .toPairs()
      .orderBy(([year]: [string, Post[]]) => year, 'desc')
      .map(([year, posts]: [string, Post[]]) => ({ year, posts }))
      .value();

    return years;
  }
}
