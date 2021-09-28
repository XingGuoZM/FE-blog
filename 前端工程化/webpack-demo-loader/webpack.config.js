
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' },
        {
          loader: path.join(__dirname, 'loaders/A.js'),
          options: {
            words: 'A'
          }
        },
        {
          loader: path.join(__dirname, 'loaders/B.js'),
          options: {
            words: 'B'
          }
        },
        {
          loader: path.join(__dirname, 'loaders/C.js'),
          options: {
            words: 'C'
          }
        }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
}