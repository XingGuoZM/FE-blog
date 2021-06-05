// a.mjs
import b from './funcA.mjs';
console.log('a starting');
console.log(b());
export default function () {
  return 'run func A';
}
console.log('a done');