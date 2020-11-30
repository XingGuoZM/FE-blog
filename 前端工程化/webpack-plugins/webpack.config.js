const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry:{
    index:'./src/index.js',
    print: './src/print.js'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({title:'输出管理'})
  ],
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}