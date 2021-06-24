import { add } from './add.mjs';
console.log('log');
add(1, 2);
function log() {
  console.log(...arguments);
};

export {
  log
}