const module1 = require('module1');

function module2() {
  // console.log('moudule2');
  module1();
}
module.exports = {
  module2
}