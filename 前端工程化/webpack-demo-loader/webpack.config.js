
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        loader: path.join(__dirname, 'loaders/custom-babel-loader.js')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'hello page',
    template: './dist/index.html'
  })],
  mode: 'development'
}