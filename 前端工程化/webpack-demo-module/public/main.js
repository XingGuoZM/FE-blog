(() => {
  var o = {
    498: o => {
      o.exports = {
        log: function (o) {
          console.log(o)
        }
      }
    }
  },
    r = {};
  !function e(t) {
    var n = r[t];
    if (void 0 !== n) return n.exports;
    var l = r[t] = { exports: {} };
    return o[t](l, l.exports, e), l.exports
  }(498)("hello world")
})();