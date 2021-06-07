const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
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
  plugins: [
    // new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'webpack-react',
      templateContent:
        `
        <html>
          <body>
            <div id='root'></div>
            <script src='./app.bundle.js'></script>
          </body>
        </html>
      `
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public'
  }
}