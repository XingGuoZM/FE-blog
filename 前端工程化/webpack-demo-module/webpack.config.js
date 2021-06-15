const path = require('path');

module.exports = {
  entry: './src/cjs-module/index.js',
  output: {
    path: path.join(__dirname, '/public'),
  }
}