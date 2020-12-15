/**
 *  手写一个plugin示例
 */

class MyPlugin{
  apply(compiler){
    compiler.hooks.compilation.tap('CompilationPlugin',compilation=>{
      // console.log(stats)
      compilation.hooks.optimize.tap('CompilationPlugin',()=>{
        console.log('正在优化资源');
      })
    })
  }
}

module.exports = MyPlugin;