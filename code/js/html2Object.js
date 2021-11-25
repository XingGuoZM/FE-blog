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
/**
 * 
  伪代码
    1. 通过正则匹配到开始标签，通过startTagOpen匹配，可以获取到开始标签tag,入栈
    2. 切割html字符串
    3. 匹配属性，通过attribute匹配，循环直至所有attribute都匹配完成，可以获取所有的attributes
    4. 切割html字符串
    5. 匹配开始标签的闭合, >或者/> ,通过startTagClose匹配,可以知道是否为自闭合selfClose
    6. 切割html字符串
    7. 匹配到子级标签的开始或者自己结束标签的第一个标示符, <, 可以获取到标签的内部文本text
    8. 切割字符串
    9. 如果是结束标签,出栈，构建对象树，可以获取到children，继续循环
    10. 如果是新的开始标签，继续循环
 */

const html2Object = (htmlStr) => {
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
  let stack = [];
  let root;
  // 匹配开标签开始
  const matchTagStart = (element) => {
    const tagStart = htmlStr.match(startTagOpen);
    if (tagStart) {
      element.tag = tagStart[1];
      stack.push(element);
      htmlStr = htmlStr.substring(tagStart[0].length);
    }
  }
  // 匹配标签属性
  const matchTagAttribute = (element) => {
    while (htmlStr.match(attribute)) {
      let attr = htmlStr.match(attribute);
      element.attributes[attr[1]] = attr[3];
      if (attr) htmlStr = htmlStr.substring(attr[0].length);
    }
  }
  // 匹配开标签闭合
  const matchTagClose = (element) => {
    const tagClose = htmlStr.match(startTagClose);
    if (tagClose) {
      if (tagClose[0].trim() === '/>') {
        element.selfClose = true;
        const c = stack.pop();
        const p = stack.pop();
        if (p) {
          p.children.push(c);
          stack.push(p);
        }
      }
      htmlStr = htmlStr.substring(tagClose[0].length);
    }
  }
  // 匹配闭合标签
  const matchTagEnd = () => {
    const et = htmlStr.match(endTag);
    if (et) {
      const c = stack.pop();
      const p = stack.pop();
      if (p) {
        p.children.push(c);
        stack.push(p);
        root = JSON.parse(JSON.stringify(stack));
      }
      htmlStr = htmlStr.substring(et[0].length);
    }
  }
  // 匹配标签内容
  const matchTagText = (element) => {
    const index = htmlStr.indexOf('<');
    element.text = htmlStr.substring(0, index);
    htmlStr = htmlStr.substring(index);
  }
  while (htmlStr) {
    let element = {
      tag: '',
      text: '',
      selfClose: false,
      attributes: {},
      children: [],
    }
    matchTagStart(element);
    matchTagAttribute(element);
    matchTagClose(element);
    matchTagText(element);
    matchTagEnd(element);
  }
  return root;
}
let htmlStr = `<div id="main" data-x="hello">Hello<span id="sub" /><div id="sup"><span>Tom</span></div></div>`;
const res = html2Object(htmlStr);
console.log(res);
