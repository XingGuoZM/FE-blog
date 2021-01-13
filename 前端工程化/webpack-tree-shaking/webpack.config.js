const path = require('path');

module.exports={
  entry:'./src/index.js',
  output:{
    filename:'[name].bundle.js',
    path:__dirname+'/dist',
  },
  mode:'development',
  devServer:{
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000
  }
}