function Hello(name) {
  this.name = 'hello world';
  this.setName = function (name) {
    this.name = name;
  }
  this.getName = function () {
    return this.name;
  }
}

export default Hello;