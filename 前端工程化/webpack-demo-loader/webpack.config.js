
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' },
        {
          loader: path.join(__dirname, 'loaders/A.js'),
        },
        {
          loader: path.join(__dirname, 'loaders/B.js'),
        },
        {
          loader: path.join(__dirname, 'loaders/C.js'),
        }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  mode: 'development'
}