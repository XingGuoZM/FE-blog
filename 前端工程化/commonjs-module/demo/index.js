var count = require('./calculator').count;

var add = require('./calculator').add;

console.log(count);

add(2, 3);

console.log(count);

count += 1;

console.log(count);

