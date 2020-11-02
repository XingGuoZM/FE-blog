
仓库地址：[excel2json](https://github.com/XingGuoZM/node-scripts/blob/master/excel2json.js)  
### 目录结构  
![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200801110428433-688502957.png)

### 第一步：安装exceljs  
```js
npm i -S exceljs
```

### 第二步：编写excel2json脚本  
```js
const fs = require('fs')
const Excel = require('exceljs');

//输入 src dst：json目录下存放目标文件 excel2json.xlsx -> excel2json.json
// src：读取的excel文件目录
// dst：导出的json文件目录
 const excel2json = async function(src,dst){
    const result=[];
    let keys=[];
    const workbook = new Excel.Workbook();
    // 读取excel
    await workbook.xlsx.readFile(src);
    const worksheet = workbook.getWorksheet(1); //获取第一个worksheet
    worksheet.eachRow((row, rowNumber)=> {
        let obj={};
        // cell.type单元格类型：6-公式 ;2-数值；3-字符串
        row.eachCell((cell, colNumber)=>{
            const value=cell.value;
            if(rowNumber===1) keys.push(value);
            else obj[keys[colNumber-1]]=value;
        });
        if(rowNumber>1) result.push(obj)
    });
    console.log(result)
    // 写入流
    await fs.writeFileSync(dst,JSON.stringify(result));

}

excel2json('./excel/excel2json.xlsx','./json/excel2json.json');
```
### 运行查看效果  
```
node excel2json
```

### 测试效果
excel文件  
![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200801110658199-1159316628.png)

json文件  
![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200801110741584-684716773.png)



### 参考  
- [利用ExcelJS读取Excel文件](https://blog.csdn.net/guo1wu3shi4/article/details/95084089)
- [ExcelJS](https://github.com/exceljs/exceljs/blob/master/README_zh.md#%E8%AF%BB-xlsx)
