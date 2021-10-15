module.exports = function (source) {
  // 去除所有的log
  source = source.replace(/console.log\([^\)]+\);/g, '');
  return source;
}