import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);

export function higlightTypescriptSource(source: string) {
  return hljs.highlight(source, {
    language: 'typescript',
  }).value;
}

export function higlightHtmlSource(source: string) {
  return hljs.highlight(source, {
    language: 'html',
  }).value;
}

export function higlightXmlSource(source: string) {
  return hljs.highlight(source, {
    language: 'xml',
  }).value;
}

export function higlightBashSource(source: string) {
  return hljs.highlight(source, {
    language: 'bash',
  }).value;
}
