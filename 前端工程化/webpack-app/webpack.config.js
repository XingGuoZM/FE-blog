const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={
  mode: 'development',
  entry:'./src/index.js',
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title:'app'})
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react','module:@babel/plugin-transform-react-jsx']
          }
        }
      }
    ]
  },
  output:{
    path: path.join(__dirname,'public'),
    filename:"index.bundle.js"
  },
  devServer:{
    contentBase:'./public',
    port:8080,
    hot:true,
    inline:true
  }
}