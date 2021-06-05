
var count = 0;
module.exports = {
  count,
  add: function (a, b) {
    count++;
    return a + b
  }
}