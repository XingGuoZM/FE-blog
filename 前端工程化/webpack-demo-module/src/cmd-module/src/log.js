define(function (require, exports, module) {

  function log() {
    console.log(...arguments);
  }
  module.exports = { log }
})