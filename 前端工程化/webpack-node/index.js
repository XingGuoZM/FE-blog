const webpack = require('webpack');

const compiler = webpack({
  entry: './src/app.js'
});
const watching = compiler.watch({}, (err, stats) => {
  console.log('watching...');
});
compiler.run((err, stats) => {
  console.log('running....');
});
watching.close(() => {
  console.log('watching end...');
});

compiler.hooks.compile.tap('myPlugin', (params) => {
  console.log('compile hooks');
});


compiler.hooks.compilation.tap('ssl', (compilation) => {
  console.log('compilation hooks');
  compilation.hooks.buildModule.tap('aa', (module) => {
    module.useSourceMap = true;
    console.log('buildModule');
  });

  compilation.hooks.finishModules.tap('bb', (a) => {
    console.log('finishModules');
  });
});

compiler.hooks.afterCompile.tap('after', () => {
  console.log('after compilation hooks');
});
