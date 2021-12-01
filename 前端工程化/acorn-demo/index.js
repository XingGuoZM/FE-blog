const fs = require('fs');
const acorn = require("acorn");
const m = require('./module');
console.log(String(m));
const res = acorn.parse(m, { ecmaVersion: 2020 });
fs.writeFileSync('./ast.json', JSON.stringify(res));