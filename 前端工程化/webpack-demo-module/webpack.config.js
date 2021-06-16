const path = require('path');

module.exports = {
  entry: './src/cjs-module/index.js',
  mode: 'development',
  devtool: '',
  output: {
    path: path.join(__dirname, '/public'),
  }
}