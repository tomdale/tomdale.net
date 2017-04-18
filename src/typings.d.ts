declare module 'front-matter' {
  namespace Frontmatter {
    interface Attributes {
      [key: string]: any;
    }

    interface Content {
      /** contains the extracted yaml attributes in json form */
      attributes: Attributes;
      /** contains the string contents below the yaml separators */
      body: string;
      /** contains the original yaml string contents */
      frontmatter: string;
    }

    function test(str: string): boolean;
  }

  function Frontmatter(document: string): Frontmatter.Content;

  export = Frontmatter;
}

declare module 'route-recognizer' {
  class RouteRecognizer<H> {
    add: (routes: Route<H>[], options?: RouteOptions) => void
    recognize: (path: string) => MatchedRoute<H>[]
    generate(name: string, params: any): string;
  }

  interface RouteOptions {
    as: string;
  }

  interface Route<H> {
    path: string;
    handler: H;
  }

  interface MatchedRoute<H> {
    handler: H
    params: { [key: string]: string }
  }

  export = RouteRecognizer;
}
