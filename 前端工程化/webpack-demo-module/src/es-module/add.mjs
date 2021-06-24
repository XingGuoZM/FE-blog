import { log } from './log.mjs';
console.log('add');
function add(a, b) {
  log(a, b)
  return a + b;
}

export {
  add
}
