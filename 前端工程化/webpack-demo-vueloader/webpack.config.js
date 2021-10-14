const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: path.join(__dirname, 'loaders/removeLog.js'),
          },
          {
            loader: 'vue-loader'
          },
        ]
      },
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    host: '127.0.0.1',
    port: 8000
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}