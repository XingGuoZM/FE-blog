
define(['./log'], function ({ log }) {
  const add = function (a, b) {
    log(a, b);
    return a + b;
  }
  return { add };
});