import Content from './content';

export default class Page extends Content {
  type = 'page';

  render(): string {
    return this.templates.page({
      page: this,
      title: this.title
    });
  }
}
