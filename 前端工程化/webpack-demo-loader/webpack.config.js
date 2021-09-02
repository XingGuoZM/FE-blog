

const path = require('path');

module.exports = {
  entry: './src/index',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        loader: path.join(__dirname, 'loaders/custom-babel-loader.js')
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
}