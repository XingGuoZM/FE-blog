
### 概述

散列表 又叫 哈希表 (hash table)。通过访问key而直接访问存储的value值。它的key - value之间存在一个映射函数，我们可以通过key值和“看不到”的映射函数（散列函数）访问对应的value值。这加快了查找的速度！存放记录的数组称做散列表

- insert(node): 向二叉树插入一个节点
- search(node): 在二叉树中查找一个节点
- inOrderTraverse(node,callback): 中序遍历二叉树 
- preOrderTraverse(node,callback): 先序遍历二叉树
- postOrderTraverse(node,callback): 后序遍历二叉树
- min(): 返回二叉树中最小的节点
- max(): 返回二叉树中最大的节点
- remove(node): 移除二叉树中指定节点

### 实现最大堆
```js
function MaxHeap(initDataArray, maxSize = 9999) {
    let arr=initDataArray || [];

    let currSize=arr.length;
 //填充heap，目前还不是一个堆
    let heap=new Array(arr.length);

    function init() {

        for(let i=0; i<currSize;i++){
            heap[i]=arr[i];
        }
        //最后一个分支节点的父节点
        let currPos=Math.floor((currSize-2)/2);
        while (currPos>=0){
			//局部自上向下下滑调整
            shif_down(currPos, currSize-1);
            //调整下一个分支节点
            currPos--;
        }

    }

    function shif_down(start,m) {
        //父节点
        let parentIndex=start,
            //左子节点
            maxChildIndex=parentIndex*2+1;

        while (maxChildIndex<=m){
            if(maxChildIndex<m && heap[maxChildIndex]<heap[maxChildIndex+1]){
                //一直指向最大关键码最大的那个子节点
                maxChildIndex=maxChildIndex+1;
            }
            if(heap[parentIndex]>=heap[maxChildIndex]){
                break;
            }else {
                //交换
                let temp=heap[parentIndex];
                heap[parentIndex]=heap[maxChildIndex];
                heap[maxChildIndex]=temp;
                parentIndex=maxChildIndex;
                maxChildIndex=maxChildIndex*2+1
            }
        }
    }
    /**
     * 插入一个数据
     *
     * @param {*} data 数据值
     * @returns {boolean} isSuccess 返回插入是否成功
     */
    this.insert = function (data) {
        //如果当前大小等于最大容量
        if(currSize===maxSize){
            return false
        }

        heap[currSize]=data;
        shif_up(currSize);
        currSize++;
        return true;
    };

    function shif_up(start) {
        let childIndex=start;   //当前叶节点
        let parentIndex=Math.floor((childIndex-1)/2); //父节点

        while (childIndex>0){
            //如果大就不交换
            if(heap[parentIndex]>=heap[childIndex]){
                break;
            }else {
                let temp=heap[parentIndex];
                heap[parentIndex]=heap[childIndex];
                heap[childIndex]=temp;
                childIndex=parentIndex;
                parentIndex=Math.floor((parentIndex-1)/2);
            }
        }
    }

    /**
     * 移除根元素，并返回根元素数据
     *
     * @returns {*} data 根元素的数据值
     */
    this.removeRoot = function () {
        if(currSize<=0){
            return null;
        }
        let maxValue=heap[0];
        heap[0]=heap[currSize];
        currSize--;
        shif_down(0, currSize-1);
        return maxValue;
    };

    init();

}

/**
 * 二叉树节点构造函数
 * @class
 * @param {*} data
 */
function BinaryTreeNode(data) {

    this.data = data;

    this.parent = null;

    this.leftChild = null;
    this.rightChild = null;

}

const maxHeap = new MaxHeap();

const initDataArray = [];
for (let index = 0; index < 5; index++) {

    const value = 5 + 95 * Math.random();

    if (-1 === initDataArray.indexOf(value)) {
        // 没有重复值
        initDataArray.push(value);
        if (!maxHeap.insert(value)) {
            // 插入失败，重新生成一个
            index--;
        }
    } else {
        // 重复了，重新生成一个
        index--;
    }

}
```

### 参考

- [javascript什么是堆，什么是栈？](https://blog.csdn.net/Jkssns/article/details/103444071)