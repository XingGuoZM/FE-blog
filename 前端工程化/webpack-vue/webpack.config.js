const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin= require('vue-loader/lib/plugin');

module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins:[
    // new HtmlWebpackPlugin({title:'webpack-vue'}),
    new VueLoaderPlugin()
  ],
  output:{
    filename:'[name].bundle.js',
    path: __dirname + '/dist',
  }
}