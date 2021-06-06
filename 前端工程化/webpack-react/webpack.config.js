const path = require('path');
// const consoleLogBuild = require('./plugins/test');
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    host: '0.0.0.0',
    port: 8000
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  // plugins: [
  //   new consoleLogBuild()
  // ],
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public'
  }
}