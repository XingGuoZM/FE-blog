/**
 * 函数组合
 */
function compose(count,number){
  for(let i=0;i<count;i++){
    number=squareNumber(number)
  }
  return number
}
// 获取数位,并求平方和
function squareNumber(number){
  if( number && typeof number == 'number'){
    return (number+'').split('').map(item=>item*item).reduce((prev,curr)=>prev+curr)
  }
  return false;
}
// 阿里数
/**
 * 
 * @param {*} count 操作次数
 * @param {*} number 整数最大值（范围）
 */
function aliNumber(count,number){
  let ans=[]
  for(let i=0;i<=number;i++){
    if(compose(count,i)===1){
      ans.push(i)
    }
  }
  console.log(ans)
  return ans
}

aliNumber(5,100)











