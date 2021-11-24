/**
 * 输入：'<div id="main" data-x="hello">Hello<span id="sub" /></div>'
 * 输出：
{
  tag: "div",
  selfClose: false,
  attributes: {
    "id": "main",
    "data-x": "hello"
  },
  text: "Hello",
  children: [
    {
      tag: "span",
      selfClose: true,
      attributes: {
        "id": "sub"
      }
    }
  ]
}
 * 
 */


const html2Object = (htmlStr) => {
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
  let stack = [];
  let root, currentElement;
  const start = (tag, attributes, selfClose, text) => {
    const element = {
      tag,
      attributes,
      selfClose,
      text,
      children: [],
    }
    if (!root) root = element;
    currentElement = element;
    stack.push(element);
  }
  const end = () => {
    const element = stack[stack.length - 1];
    stack.length--;
    currentElement = stack[stack.length - 1];
    if (currentElement) {
      currentElement.children.push(element);
    }
  }
  const parseStartTag = () => {
    const start = htmlStr.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: {},
        selfClose: false,
        text: '',
      };
      htmlStr = htmlStr.substring(start[0].length);
      let attr, end;
      while (!(end = htmlStr.match(startTagClose)) && (attr = htmlStr.match(attribute))) {
        htmlStr = htmlStr.substring(attr[0].length);
        match.attrs[attr[1]] = attr[3];
      }
      if (end) {
        if (end[0].trim() === '/>') {
          match.selfClose = true;
        }
        htmlStr = htmlStr.substring(end[0].length);
        return match;
      }
    }
  }
  while (htmlStr) {
    let text;
    const endIndex = htmlStr.indexOf('<');
    if (endIndex == 0) {
      const startMatch = parseStartTag();
      if (startMatch) {
        start(startMatch.tagName, startMatch.attrs, startMatch.selfClose);
        continue;
      }
      const endMatch = htmlStr.match(endTag);
      if (endMatch) {
        htmlStr = htmlStr.substring(endMatch[0].length);
        end();
      }
    } else if (endIndex > 0) {
      text = htmlStr.substring(0, endIndex);
      currentElement.text = text;
    }
    if (text) {
      htmlStr = htmlStr.substring(text.length);
    }
  }
  return root;
}
let htmlStr = `<div id="main" data-x="hello">Hello<span id="sub" /></div>`;
const res = html2Object(htmlStr);
console.log(res);
