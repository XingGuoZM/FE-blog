const fs = require('fs');
class logPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('logPlugin', (compilation) => {
      compilation.hooks.succeedModule.tap('logPlugin', (module) => {
        // module.parser.sourceType = 'module';
        fs.writeFileSync('./test.json', JSON.stringify(module));
      })
    })

  }
}

module.exports = logPlugin;