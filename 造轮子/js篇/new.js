//手动实现一个简易new

function myNew(fn, ...args){
	let instance = Object.create(fn.prototype);
	let result = fn.call(instance, ...args);
	return typeof result === 'object' ? result :instance;
}