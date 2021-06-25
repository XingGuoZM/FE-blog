define(['hello'], function (require, exports, module) {
  require('hello')
  function log() {
    console.log(...arguments);
  }
  module.exports = { log }
})
