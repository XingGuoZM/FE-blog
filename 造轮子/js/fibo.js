// 斐波拉契数列
/**
 * 
 * @param {*} n
 * 0，1，1，2，3，5，8，13，21，34，55，......
 * 当 n >= 2，an = an - 1 + an - 2 
 */
// 法一: 递归
function fibo1(n){
  if(n<=0) return 0;
  if(n===1) return 1;
  return fibo1(n-1)+fibo1(n-2);
} 


// 法二：动态规划
function fibo2(n){
  if(n<=0) return 0;
  if(n===1) return 1;
  let arr=[0,1];
  for(let i=2;i<=n;i++){
    arr[i]=arr[i-1]+arr[i-2];
  }
  return arr[n]
}
// 法二变化：使用变量代替数组
function fibo3(n){
  if(n<=0) return 0;
  if(n===1) return 1;

  let a=0,b=1;
  for(let i=2;i<=n;i++){
    b=a+b;
    a=b-a;
  }
  return b;
}

let ans=fibo3(3);
console.log(ans);