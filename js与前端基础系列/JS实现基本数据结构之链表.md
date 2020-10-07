
### 概述
链表
### 实现需求
不使用现有的数据结构（数组、对象、Set、Map等）完成以下操作

1. 链表的创建
2. 链表的增删改查

### 实现一个简易的链表

```
/*======定义结构======*/
var node=function(element){
    this.element=element
    this.next=null
}
var linkedList=function(){
    this.head=new node("head")
    this.find=find
    this.insert=insert
    this.update=update
    this.remove=remove
}
/*======查找======*/
var find=function(item){
    let currNode=this.head
    while(currNode.element!==item){
        currNode=currNode.next
    }
    return currNode
}
/*======插入======*/
/**
*newElement:一个新节点，item:链表的目标节点
*1.查找找到目标节点，将新节点的next指向目标节点的下一个节点
*2.将目标节点的next指向这个新节点
*/
var insert=function(newElement,item){
    let newNode=new node(newElement)
    let currNode=this.find(item)
    newNode.next=currNode.next
    currNode.next=newNode
}
/*======修改======*/
/**
*查找到目标节点，将其element修改
*/
var update=function(item,newItem){
    let currNode=this.find(item)
    currNode.element=newItem
}
/*======删除======*/
/**
*找到匹配节点的前一个节点，将其next指向当前节点的下一个节点，即删除当前节点
*/
var remove=function(item){
    let currNode=this.head
    while(currNode.next!==null && currNode.next.element!==item){
        currNode=currNode.next
    }
    if(currNode.next!==null){
        currNode.next=currNode.next.next
    }
}
/*======测试代码======*/
var list=new linkedList();
list.insert('first','head')
list.insert('second','first')
list.insert('third','second')
console.log(list)
list.find('first')
console.log(list.find('first'))
list.update('third','three')
console.log(list)
list.remove('second')
console.log(list)
```


### 参考
- [JS中的算法与数据结构——链表(Linked-list)](https://www.jianshu.com/p/f254ec665e57)
