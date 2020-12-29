const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin= require('vue-loader/lib/plugin');

module.exports = {
  entry:'./src/index.js',
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({title:'webpack-vue'}),
    new VueLoaderPlugin()
  ],
  output:{
    filename:'[name].bundle.js'
  }
}