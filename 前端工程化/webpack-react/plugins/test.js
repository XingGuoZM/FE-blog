/**
 *  手写一个plugin示例
 */
const fs = require('fs')
const pluginName = 'consoleLogOnBuildWebpackPlugin';

class MyPlugin {
  apply(compiler) {
    compiler.hooks.compile.tap(pluginName, params => {
      console.log('webpack 构建过程开始');
    });
    // let modules = [];
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      compilation.chunks.forEach(chunk => {
        // chunk包含多个模块，通过chunk.modulesIterable可以遍历模块列表      
        for (const module of chunk.modulesIterable) {
          // module包含多个依赖，通过module.dependencies进行遍历      	

          module.dependencies.forEach(dependency => {
            // console.log(dependency);
            // modules.push(dependency);
          });
          // 
        }
        // fs.writeFileSync('./plugins/dependency.json', JSON.stringify(modules));
        cb();
      });
    })
  }
}

module.exports = MyPlugin;