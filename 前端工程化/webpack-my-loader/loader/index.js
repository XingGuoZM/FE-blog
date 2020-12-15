
/**
 * 手写一个plugin示例
 * 功能：清除代码里的console
 * 
 * @babel/parser 将源代码解析成 AST
   @babel/traverse 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
   @babel/generator 将AST解码生成js代码
   @babel/types通过该模块对具体的AST节点进行进行增、删、改、查
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const gen = require('@babel/generator').default;
const t = require('@babel/types');

const { getOptions } = require('loader-utils') ;

module.exports= function(source){
  const options = getOptions(this);

  const ast = parser.parse(source,{sourceType:'module'});
  traverse(ast,{
    CallExpression(path){
      if(t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object,{name:"console"})){
        path.remove();
      }
    }
  })
  const output =gen(ast,{},source);
  return output.code;
}