const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={
  mode: 'development',
  entry:'./src/main.tsx',
  plugins:[
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title:'app',template:'public/index.html'})
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      { test: /\.tsx?$/, loader: "ts-loader" }
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