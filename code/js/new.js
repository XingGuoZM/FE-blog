//手动实现一个简易new

function myNew(func, ...args){
	let obj = {};
	obj.__proto__ = func.prototype;
	let ans = func.call(obj, ...args);
	return typeof(result) === 'object' ? ans :obj;
}


function A(a){
	this.name='123'
}
console.log(myNew(A,12)); 
