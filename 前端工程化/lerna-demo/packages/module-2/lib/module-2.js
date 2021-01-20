'use strict';
const module1 = require('module-1');

// 验证引入的module-1
module1();

module.exports = module2;

function module2() {
    // TODO
    console.log('module-2');
}
