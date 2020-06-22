
const tableHead={
    index:'序号',
    name:'名称',
    code:'代码',
    rateIncrease:'涨幅',
    price:'现价',
    isIncrease:'涨跌',
    sell:'成交量',
    sellCount:'成交额',
    sellRate:'涨速',
    change:'换手',
    countRate:'量比',
    today:'今开',
    max:'最高',
    min:'最低',
    yestoday:'昨收',
    ttm:'市盈率',
    amplitude:'振幅',
    deviation:'委差',
    comparison:'委比'
}
const tableData=[
    {    
        index:1,
        name:'平安银行',
        code:'00001',
        rateIncrease:'0.22%',
        price:'13.62',
        isIncrease:'0.03',
        sell:'585972',
        sellCount:'8.02亿',
        sellRate:'0.07%',
        change:'0.30',
        countRate:'0.79',
        today:'13.68',
        max:'13.85',
        min:'13.58',
        yestoday:'13.59',
        ttm:'7.73',
        amplitude:'1.99',
        deviation:'-5.06%',
        comparison:'-2.53'
    }
]
function getData(start,end){
    let data=[]
    for(let i=start;i<end;i++){
        data.push({
            index:i,
            name:'平安银行',
            code:'00001',
            rateIncrease:'0.22%',
            price:'13.62',
            isIncrease:'0.03',
            sell:'585972',
            sellCount:'8.02亿',
            sellRate:'0.07%',
            change:'0.30',
            countRate:'0.79',
            today:'13.68',
            max:'13.85',
            min:'13.58',
            yestoday:'13.59',
            ttm:'7.73',
            amplitude:'1.99',
            deviation:'-5.06%',
            comparison:'-2.53'
        })
    }
    return data
}
export default {tableHead,getData}