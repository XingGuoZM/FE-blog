
// const { multi } = require('./multi');

// multi(1, 2);
// const log = require('./log.js');

// log('hello')
// console.log(log)

require('./sum');
require('./sum').msg = '123';
console.log(require('./sum'));