const createEventHub = () => ({
  hub: Object.create(null),
  // 订阅
  sub(event,handle){
    if(!this.hub[event]) this.hub[event]=[];
    this.hub[event].push(handle);
  },
  //发布
  pub(event,data){
    (this.hub[event] || []).forEach(handle=>handle(data));
  },
  //取消
  off(event,handle){
    let index = this.hub[event].indexOf(handle);
    index>-1 && this.hub[event].splice(index,1);
  }
})


// 测试

const eventHub = createEventHub();
const handle = data =>{
  console.log(data);
}

eventHub.sub('myEvent',handle);
eventHub.sub('myEvent',()=>{
  console.log('handle2')
});
eventHub.sub('myEvent2',()=>{
  console.log('eventHub',eventHub);
});

eventHub.pub('myEvent','a string !!!');
eventHub.pub('myEvent',{arg:'a object!!!'});
eventHub.pub('myEvent2');

eventHub.off('myEvent',handle);

