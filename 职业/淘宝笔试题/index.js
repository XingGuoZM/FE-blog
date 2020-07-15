
// 求阿里数  

function aliNumber(number){
  let ans=[]
  for(let i=0;i<100;i++){
    if(squareNumber(squareNumber(squareNumber(i)))===1){
      ans.push(i)
    }
  }
  console.log(ans)
  return ans
}
// 获取数位,并求平方和
function squareNumber(number){
  if( number && typeof number == 'number'){
    return (number+'').split('').map(item=>item*item).reduce((prev,curr)=>prev+curr)
  }
  return false;
}
console.log(aliNumber(100))








