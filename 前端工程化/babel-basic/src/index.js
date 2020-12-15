const parser = require('@babel/parser');

// module.exports = function(source){
  const ast = parser.parse('const fn = ()=>1',{sourceType:'module'});
  console.log(111,ast);
// }


