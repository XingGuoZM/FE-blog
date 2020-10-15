class Node{
    static fromArray(data){
      let head = new this;
      data.reduce((prev_node,num)=>{
        let new_node=new this;
        new_node.data=num;
        prev_node.next=new_node;
        return new_node;
      },head);
      return head;
    }
    toArray(){
      let arr = []
      for(let node=this.next;node;node=node.next){
        arr.push(node.data);
      }
      return arr;
    }
    //链表长度
    length(){
        return this.toArray().length;
    }
    //对链表排序
    sort(){
        return this.toArray().sort();
    }
}

let list = Node.fromArray([9,1,5,2,8,4,7,6,3]);
list.sort();
list.toArray(); //[1,2,3,4,5,6,7,8,9]