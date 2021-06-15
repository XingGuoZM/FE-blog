const sum = require('./sum');
function multi(a, b) {
  sum(a, b);
  return a * b;
}

exports = { multi }