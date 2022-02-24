//手动实现一个简易new

// 方式一
function myNew(func, ...args) {
	let obj = {};
	obj.__proto__ = func.prototype;
	let result = func.call(obj, ...args);
	return typeof (result) === 'object' ? result : obj;
}
// 方式二
function myNew2() {
	const Constructor = [].shift.call(arguments);
	const obj = Object.create(Constructor.prototype);
	const ret = Constructor.apply(obj, arguments);
	return (typeof ret === 'object' && ret !== null) ? ret : obj;
}
function A(a) {
	this.name = '123'
}
console.log(myNew(A, 12)); 
