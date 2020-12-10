const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={
  mode: 'development',
  entry:'./src/index.js',
  plugins:[
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title:'app',template:'public/index.html'})
  ],
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      }
    ]
  },
  output:{
    path: path.join(__dirname,'public'),
    filename:"main.js"
  },
  devServer:{
    contentBase:'./public',
    port:8080,
    hot:true,
    inline:true
  }
}