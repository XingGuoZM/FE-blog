import { log } from './log.mjs';
function add(a, b) {
  log(a, b)
  return a + b;
}

export {
  add
}
