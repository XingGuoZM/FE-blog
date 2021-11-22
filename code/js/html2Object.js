let htmlStr = `<div id="main" data-x="hello">Hello<span id="sub" /></div>`;
// let htmlStr = `<div id="main" data-x="hello"/>`;
// const result = {
//   tag: "div",
//   selfClose: false,
//   attributes: {
//     "id": "main",
//     "data-x": "hello"
//   },
//   text: "Hello",
//   children: [
//     {
//       tag: "span",
//       selfClose: true,
//       attributes: {
//         "id": "sub"
//       }
//     }
//   ]
// }
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
let stack = [];
let root, currentParent;
const createAstElement = (tag, attr) => {
  return {
    type: 1,
    tag,
    attr,
    children: [],
    parent: null,
  }
}
const start = (tagName, attr) => {
  const element = createAstElement(tagName, attr);
  if (!root) root = element;
  currentParent = element;
  stack.push(element);
}
const end = (tagName) => {
  const element = stack[stack.length - 1];
  stack.length--;
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    element.parent = currentParent;
    currentParent.children = element;
  }
}
const chars = (text) => {
  currentParent.children.push({
    type: 3,
    text,
  })
}
const advance = (n) => {
  htmlStr = htmlStr.substring(n);
}
const parseStartTag = () => {
  const start = htmlStr.match(startTagOpen);
  if (start) {
    const match = {
      tagName: start[1],
      attrs: [],
      inner: ''
    };
    advance(start[0].length);
    let attr, end;
    while (!(end = htmlStr.match(startTagClose)) && (attr = htmlStr.match(attribute))) {
      advance(attr[0].length);
      match.attrs.push({ key: attr[1], value: attr[3] });
    }
    if (end) {
      advance(end[0].length);
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
      start(startMatch.tagName, startMatch.attrs);
      continue;
    }
    const endMatch = htmlStr.match(endTag);
    if (endMatch) {
      advance(endMatch[0].length);
      end(endMatch[1]);
    }
  } else if (endIndex > 0) {
    text = htmlStr.substring(0, endIndex);
    chars(text);
  }
  if (text) {
    advance(text.length);
  }
}

console.log(root);


