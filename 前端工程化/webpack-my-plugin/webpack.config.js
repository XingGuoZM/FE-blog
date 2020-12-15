const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MyPlugin = require('./plugin/index');

module.exports = {
  entry:'./src/index.js',
  plugins:[
    new HtmlWebpackPlugin({title:'my-plugin'}),
    new MyPlugin({options:true})
  ],
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'./'
  }
}