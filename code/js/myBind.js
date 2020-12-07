Function.prototype.myBind = function(context,...args){
  const fn = this;
  return function(){
    fn.call(context, ...arguments,...args);
  }
}



const app = {
  name: 'app',
  getName(version) {
      console.log(this.name + ': ' + version)
  }
};

app.getName.myBind({ name: 'hello' }, 1.1)(2.2); 