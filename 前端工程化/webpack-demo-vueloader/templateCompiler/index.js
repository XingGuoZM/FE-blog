const compiler = require('vue-template-compiler');

const res = compiler.compile('<h1>hello world</h1>');
console.log(JSON.stringify(res));