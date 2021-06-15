function sum() {
  return [...arguments].reduce((cur, pre) => pre + cur);
}

export {
  sum
}

export default sum;
