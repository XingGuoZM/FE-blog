const path = require('path');
const { ModuleFilenameHelpers } = require('webpack');

module.exports = {
  entry:'./src/index',
  output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist')
  }
}