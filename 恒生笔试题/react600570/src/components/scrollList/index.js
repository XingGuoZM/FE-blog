import React from 'react';
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            listData:[],
            listWrapperHeight:450,
            listHeight:500,
            cellHeight:50,
            pageNum:1,
            pageSize:20,
            currData:[],
            preDistance:0,
            currSelected:-1,
        }
    }
    componentWillMount(){
        // 获取数据
        this.getData();
    }
    componentDidMount(){
        // 滚动事件监听
        document.getElementById('list').addEventListener('scroll',this.handleScroll)
        // 键盘事件监听
        window.addEventListener('keyup',this.handleKeyup)
    }
    getData(){
        //模拟数据 
        const { pageNum,listData,pageSize,currData}=this.state
        let data=[...currData.slice(10)]
        let all=JSON.parse(JSON.stringify(listData))
        for(let i=0;i<pageSize;i++){ 
            let count=i+(pageNum-1)*pageSize
            let item ='第 '+count+' 条数据'
            data.push(item) 
        }
        all.push(data)
        this.setState({currData:data,listData:all})
    }
    renderDom(){
        const { pageSize,currData,pageNum,listHeight,cellHeight,currSelected } = this.state
        let domSize=parseInt(pageSize/2)
        let dom=new Array(domSize).fill(1)
        const activeStyle={
            backgroundColor:'#f2f2f2'
        }

        const renderListDom=[0,1].map(ele=>{
            let isOdd = ele===1
            return (<div className='listDom' style={{top:`${(isOdd?(pageNum):(pageNum-1))*cellHeight*domSize}px`}} key={ele}>
                {dom.map((item,index)=>{
                    let selectedIndex = index+ele*domSize+(pageNum-1)*domSize
                    return (<div className='cell' 
                        style={{
                            height:cellHeight+'px',
                            lineHeight:cellHeight+'px',
                            backgroundColor:currSelected===selectedIndex?'#f2f2f2':null
                        }} 
                        key={index}
                        onClick={()=>this.handleSelect(selectedIndex)}>
                            {isOdd?currData[index+domSize]:currData[index]}
                        </div>)
                    })
                }
            </div>)
        })
        return (<div className='list' style={{height:listHeight+'px'}}>
            {renderListDom}
        </div>)
    }

    handleKeyup=(e)=>{
        let {currSelected,pageNum,pageSize}=this.state
        if(e.keyCode===40){
            ++currSelected
            if(currSelected/pageSize===pageNum){
                this.handleNextPage();
            }
            this.setState({currSelected})
        }else if(e.keyCode===38){
            --currSelected
            if(currSelected<-1) currSelected=-1
            this.setState({currSelected})
        }
    }
    handleSelect=(currSelected)=>{
        console.log(currSelected)
        if(this.state.currSelected===currSelected){
            this.setState({currSelected:-1})
        }else{
            this.setState({currSelected})
        }
    }
    handlePrevPage=()=>{
        const {pageNum,listData} = this.state
        let currPageNum = pageNum < 2 ? 1 : (pageNum-1)
        let currData = listData[currPageNum-1]
        this.setState({pageNum:currPageNum,currData})
    }
    handleNextPage=()=>{
        const {pageSize,pageNum, listData, listHeight,cellHeight} = this.state
        let domSize = parseInt(pageSize/2)
   
        let currListHeight = listHeight+cellHeight*domSize
        let currData = listData[pageNum-1]
        let currPageNum = pageNum+1
        this.setState({listHeight:currListHeight,pageNum:currPageNum,currData})
        this.getData(pageNum+1)
    }
    handleScroll=(e)=>{
        const distance=e.target.scrollTop
        const { pageSize,preDistance,pageNum,cellHeight }=this.state
        let domSize = parseInt(pageSize/2)
        // 滚动方向
        const scrollDirection = distance-preDistance
        this.setState({preDistance:distance})
        // 向上滚动
        if (distance > domSize*cellHeight*pageNum && scrollDirection > 0) {
            this.handleNextPage()
        }
        // 向下滚动
       if (distance <= domSize*cellHeight*(pageNum-1) && scrollDirection < 0) {
            this.handlePrevPage();
       }
    }

    render(){
        const { listWrapperHeight } = this.state
        return(<div className="listWrapper" style={{height:listWrapperHeight+'px'}} id='list'>
            {this.renderDom()}
        </div>)
    }
}
export default ScrollList