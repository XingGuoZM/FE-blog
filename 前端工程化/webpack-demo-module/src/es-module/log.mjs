function log() {
  console.log(...arguments);
};

function other() {
  console.log('other log');
}

export {
  log,
  other
}
export default log;