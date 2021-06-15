const path = require('path');

module.exports = {
  entry: './src/es-module/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, '/public'),
  }
}