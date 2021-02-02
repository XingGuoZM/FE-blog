const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/index.js',

  devServer: {
    contentBase: path.join(__dirname, 'example'),
    compress: true,
    host: '0.0.0.0',
    port: 8000
  },
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
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/example',
  }
}