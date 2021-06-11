const webpack = require('webpack');

const compiler = webpack({
  entry: './src/app.js'
});

const watching = compiler.watch({
  aggregateTimeout: 300,
}, (err, stats) => {
  console.log('watching...');
});
compiler.run((err, stats) => {
  console.log('running....', stats);
});
watching.close(() => {
  console.log('watching end...')
})




