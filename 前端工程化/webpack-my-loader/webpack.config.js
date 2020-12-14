const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry:'./src/index.js',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader: path.resolve(__dirname,'loader/index.js'),
            options:{name:'hello webpack'}
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({title:'myLoader'})
  ],
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'./'
  }
}