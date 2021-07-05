module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  mode: 'development',
  devtool: false,
  devServer: {
    contentBase: './dist',
    historyApiFallback: false,
    inline: true,
    host: '127.0.0.1'
  }
}