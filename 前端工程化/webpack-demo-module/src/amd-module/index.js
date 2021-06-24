requirejs.config({
  baseUrl: 'src',
  paths: {
    app: '../src'
  }
});
require(['./add', './log'], function (util, common) {
  const res = util.add(1, 2);
  common.log(res);
});