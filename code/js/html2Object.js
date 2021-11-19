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

const advance = (n) => {
  htmlStr = htmlStr.substring(n);
}
const parseStartTag = () => {
  const start = htmlStr.match(startTagOpen);
  if (start) {
    const match = {
      tagName: start[1],
      attrs: []
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

parseStartTag();
// console.log(htmlStr);
const res = '</span>123'.match(endTag);
console.log(res);


