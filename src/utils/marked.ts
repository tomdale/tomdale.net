import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';

function highlight(code: string, lang = '') {
  if (!lang) { return code; }

  let filePath = '';
  if (lang.indexOf('.') > -1) {
    filePath = `<div class="filename">${lang}</div>`;
    lang = lang.slice(lang.lastIndexOf('.') + 1);
  }
  try {
    return filePath + hljs.highlight(code, { language: lang }).value;
  } catch {
    return filePath + code;
  }
}

const renderer = new Renderer();
renderer.heading = function({ text, depth }: { text: string; depth: number }) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth}>
  <a name="${escapedText}" href="#${escapedText}">
    <span class="header-link"></span>
  ${text}
  </a>
</h${depth}>`;
};

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const highlighted = highlight(text, lang || '');
  return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${highlighted}</code></pre>`;
};

marked.use({
  renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
});

export default function parse(text: string): string {
  return marked.parse(text) as string;
}
