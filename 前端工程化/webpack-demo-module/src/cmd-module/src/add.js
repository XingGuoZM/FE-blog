define(['log'], function (require, exports, module) {
  const util = require('./log');
  console.log(util)
  function add(a, b) {

    return a + b;
  }

  module.exports = { add }
});