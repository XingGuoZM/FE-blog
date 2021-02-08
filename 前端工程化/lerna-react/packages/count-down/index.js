const Hello = require('hello-world');

function CountDown() {
  Hello();
  return 'count-down'
}
console.log(CountDown());

module.exports = { CountDown }