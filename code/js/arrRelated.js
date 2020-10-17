
// 交集
const intersection = function (arr1,arr2) {
    let mergeArr = arr1 && arr2 && arr1.concat(arr2);
    arr1 = arr2Id(arr1);
    arr2 = arr2Id(arr2);
    let idArr = arr1 && arr1.filter(item=>arr2.includes(item));
    return id2Arr(idArr,mergeArr);
}
// 并集
const union = function (arr1,arr2){
    let mergeArr = arr1 && arr2 && arr1.concat(arr2);
    let _arr1 = arr2Id(arr1);
    let _arr2 = arr2Id(arr2);
    let idArr = [...new Set(_arr1.concat(_arr2))];
    return id2Arr(idArr,mergeArr);
}
// 补集
const complement = function(arr1,arr2){
    let mergeArr = arr1 && arr2 && arr1.concat(arr2);
    arr1 = arr2Id(arr1);
    arr2 = arr2Id(arr2);
    let idArr = arr1.filter(item=>!arr2.includes(item));
    return id2Arr(idArr,mergeArr);
}

// 提取对象数组中的对象id
const arr2Id = (arr) => {
    return arr && arr.map(item=>item.id ? item.id : item);
}
// 通过id数组来还原对象数组
const id2Arr = (idArr, arr) => {
    return idArr && idArr.map(id=>{
        let curr = id;
        arr && arr.forEach(item => item.id===id && (curr=item));
        return curr;
    })
}





/**
 * ============测试================
 */
/**
 * 情形1:
// 基本数据类型数组
 */

const arr1=[1,2,3,5,6];
const arr2=[1,2,6,7,8];
/**
 * 情形2:
 * 对象类型数组
 */
const objArr1=[
    {id:'001',name:'zhangsan'},
    {id:'002',name:'tom'},
    {id:'003',name:'jack'},
    {id:'004',name:'fei'},
    {id:'005',name:'ming'}
];
const objArr2=[
    {id:'003',name:'jack'},
    {id:'005',name:'ming'},
    {id:'007',name:'hello'},
    {id:'008',name:'milk'},
];
/**
 * 情形3:
 * 基本类型和对象杂糅
 */
const multiArr1=[
    {id:'001',name:'zhangsan'},
    {id:'002',name:'tom'},
    {id:'003',name:'jack'},
    true,
    {id:'005',name:'ming'}
];
const multiArr2=[
    {id:'003',name:'jack'},
    {id:'005',name:'ming'},
    true,
    {id:'008',name:'milk'},
];
console.log('交集：',intersection(multiArr1,multiArr2));
console.log('并集：',union(objArr1,objArr2));
console.log('补集：',complement(arr1,arr2));

