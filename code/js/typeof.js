function myTypeof(arg){
  let typeStr = Object.prototype.toString.call(arg);
  if(arg === null) return 'object';
  return typeStr.split(' ')[1].split(']')[0].toLowerCase()+'';
}

const ans = myTypeof(NaN);
console.log(ans)