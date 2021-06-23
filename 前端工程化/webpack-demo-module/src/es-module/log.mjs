import { add } from './add.mjs';

add(1, 2);
function log() {
  console.log(...arguments);
};

export {
  log
}