const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{publicPath:config.output.publicPath}));

app.listen(5000,()=>{
  console.log('app listening on port 5000!\n');
})

