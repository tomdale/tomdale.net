import marked = require('marked');
import hljs = require('highlight.js');

function highlight(code: string, lang: string) {
  let filePath = '';
  if (lang.indexOf('.') > -1) {
    filePath = `<div class="filename">${lang}</div>`;
    lang = lang.slice(lang.lastIndexOf('.') + 1);
  }
  return filePath + hljs.highlight(lang, code).value;
}

class Renderer extends marked.Renderer {
  heading(text: string, level: number) {
    let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return (
`<h${level}>
  <a name="${escapedText}" href="#${escapedText}">
    <span class="header-link"></span>
  ${text}
  </a>
</h${level}>`
    );
  }
}

marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  highlight
});

export default marked;
