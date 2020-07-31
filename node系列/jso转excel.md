
仓库地址：[json2excel](https://github.com/XingGuoZM/node-scripts/blob/master/json2excel.js)  
### 目录结构  
![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200801004323198-1414268881.png)

### 第一步：安装exceljs  
```
npm i -S exceljs
```

### 第二步：编写excel2json脚本  
```
const fs = require('fs')
const Excel = require('exceljs');

//输入 src dst：json目录下存放目标文件 json2excel.json
// src：读取的json文件目录
// dst：导出的excel文件目录
 const json2excel = async function(src,dst){
  const fileStream = await fs.readFileSync(src);
  const arr=JSON.parse(fileStream)
  const keys=Object.keys(arr[0]).map(item=> ({ header: item, key: item }));

  const workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: dst
  });
  const worksheet = workbook.addWorksheet('Sheet');
  worksheet.columns=keys
  for(let item of arr) {
    worksheet.addRow(item).commit();
  }
  workbook.commit();
}

json2excel('./json/json2excel.json','./excel/json2excel.xlsx');
```
### 运行查看效果  
```
node json2excel
```

### 测试效果  
json测试数据
```
[
  {
    "id":"001",
    "name":"张三",
    "sex":"男",
    "age":"12"
  },
  {
    "id":"002",
    "name":"李四",
    "sex":"男",
    "age":"12"
  },
  {
    "id":"003",
    "name":"王五",
    "sex":"男",
    "age":"12"
  }
]
```
运行后会在exel目录下生成json2excel.xlsx文件
![](https://img2020.cnblogs.com/blog/1347757/202008/1347757-20200801004437037-1311461026.png)


### 参考  
- [nodejs json 转换成 Excel 支持大数据](https://www.jianshu.com/p/8aa148435499)
