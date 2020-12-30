const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
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
  plugins: [

  ],
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public'
  }
}