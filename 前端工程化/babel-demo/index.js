const babelParser = require("@babel/parser");
// parser:解析
babelParser.parse("()=>{console.log(123)}", {});
// tranform:转换
// generate:生成