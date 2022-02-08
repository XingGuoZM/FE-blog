var UglifyJS = require("uglify-js");
var fs = require('fs');
// var code = require('./code');
const code = {
  "file1.js": "const add=(first, second)=> { return first + second; }",
  "file2.js": "console.log(add(1 + 2, 3 + 4));"
};
var result = UglifyJS.minify(code);

fs.writeFile('./test.json', JSON.stringify(result), () => { });