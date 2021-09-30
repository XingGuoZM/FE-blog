module.exports = function (source) {
  console.log('A', source);
  source = source.replace('console.log', '')
  return source;
}