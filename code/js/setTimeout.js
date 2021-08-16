

function timeout(fn, delay) {
  let start;
  function loop(fn, delay, ms) {
    if (!start) start = ms;
    let elapse = ms - start;
    if (elapse < delay) {
      window.requestAnimationFrame((ms) => loop(fn, delay, ms));
    } else {
      fn && fn();
    }
  }
  window.requestAnimationFrame((ms) => loop(fn, delay, ms));
}

timeout(() => { console.log(123) }, 1000);


