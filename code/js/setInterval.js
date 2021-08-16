

function interval(fn, delay) {
  let start;
  function loop(fn, delay, ms) {
    if (!start) start = ms;
    let elapse = ms - start;
    if (elapse > delay) {
      fn && fn();
      start = ms;
    }
    window.requestAnimationFrame((ms) => loop(fn, delay, ms));
  }
  window.requestAnimationFrame((ms) => loop(fn, delay, ms));
}

interval(() => { console.log(123) }, 1000);


