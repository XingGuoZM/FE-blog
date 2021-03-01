function Singleton(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function() {
  console.log(this.name);
}
Singleton.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

const a = Singleton.getInstance('a');
const b = Singleton.getInstance('b');

console.log(a===b);//true
console.log(a);
console.log(b);