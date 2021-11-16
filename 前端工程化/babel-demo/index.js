const { parse } = require("@babel/parser");
const generate = require("@babel/generator");
const traverse = require("@babel/traverse");
const fs = require('fs');
// parser:解析
// babelParser.parse("()=>{console.log(123)}", {});
// tranform:转换成ast
// generate:生成js代码
// traverse:遍历ast
const code = 'const fn=(n)=>n*n';
const ast = parse(code);
fs.writeFileSync('./path.json', JSON.stringify(ast));
traverse.default(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = 'x';
    }
  }
});
const output = generate.default(ast, {}, code);
console.log(output);
// console.log(output)