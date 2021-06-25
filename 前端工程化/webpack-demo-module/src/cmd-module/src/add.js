define(['log'], function (require, exports, module) {
  const util = require('./log');
  function add(a, b) {
    util.log(a, b);
    return a + b;
  }
  module.exports = { add }
});