let num=123;
let User = function(){};
let Cat = function(){};
let u=new User();
let c=new Cat();

console.log(typeof num==='number'); // true
console.log(u instanceof User);  // true
console.log(u instanceof Cat);  //false