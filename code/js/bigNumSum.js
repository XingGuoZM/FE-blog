function bigNumSum(a,b){
  let curr=0;
  while(curr<a.length || curr<b.length){
    if(!a[curr]){
      a="0"+a;
    }else if(!b[curr]){
      b='0'+b;
    }
    curr++;
  }
  let curried=0;
  const res = [];
  for(let i=a.length-1;i>-1;i--){
    const sum= curried+Number(a[i])+Number(b[i]);
    console.log(sum)
    if(sum>9){
      curried=1;
    }else{
      curried=0;
    }
    res[i]=sum%10;
  }
  if(curried===1){
    res.unshift(1);
  }
  return res.join('');
}
const res = bigNumSum('123','2')
console.log(res);