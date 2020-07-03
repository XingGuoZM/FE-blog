import React from 'react';
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            debounceTimer:null,
            throttleTimer:null,
            // 滚动高度，当滚动条滚动至该高度是开始追加数据
            fetchHeight:580,
            
            listDom:[],
            listData:[],
            listHeight:500,
            currPage:1,
            pageSize:20,
            currData:[],
            preDistance:0,
            isLoading:false,
            
            currSelected:-1
        }
    }
    componentWillMount(){
        // dom数量
        let arr=[]
        const{currPage}=this.state;
        for(let i=0;i<this.state.pageSize;i++){ arr.push(i) }
        this.setState({listDom:arr})
        this.getData(currPage);
    }
    getData(pageNum){
        //模拟数据 
        let data=[]
        const{listData,pageSize}=this.state
        let all=JSON.parse(JSON.stringify(listData))
        for(let i=0;i<pageSize;i++){ 
            let count=i+(pageNum-1)*pageSize
            let item ='第 '+count+' 条数据'
            data.push(item) 
        }
        all.push(data)
        this.setState({currData:data,listData:all})
    }
    componentDidMount(){
        // 滚动事件监听
        document.getElementById('list').addEventListener('scroll',this.handleScroll)
        // 键盘事件监听
        // this.handleKeyup()
        window.addEventListener('keyup',(e)=>this.handleKeyup(e))
    }
    handleKeyup(e){
        let {currSelected,currPage,pageSize}=this.state
        if(e.keyCode===40){
            e.preventDefault();
            ++currSelected
            if(currSelected/pageSize===currPage){
                console.log("currSelected",currPage)
                this.handleNextPage();
            }
            this.setState({currSelected})
        }else if(e.keyCode===38){
            e.preventDefault();
            --currSelected
            this.setState({currSelected})
        }
    }
    handleSelect=(currSelected)=>{
        console.log(currSelected,this.state.currSelected)
        if(this.state.currSelected===currSelected){
            this.setState({currSelected:-1})
        }else{
            this.setState({currSelected})
        }
    }
    handlePrevPage=()=>{
        let currPage=(this.state.currPage-1<1)?1:(this.state.currPage-1)
        let currData=this.state.listData[currPage-1]
        this.setState({currPage,currData})
    }
    handleNextPage=()=>{
        let currPage=this.state.currPage+1
        let listHeight=this.state.listHeight+500
        let currData=this.state.listData[currPage-2]
        this.setState({listHeight,currPage,currData})
        this.getData(currPage)
    }
    handleScroll=(e)=>{

        const distance=e.target.scrollTop
        // 滚动方向
        const scrollDirection = distance-this.state.preDistance
        this.setState({preDistance:distance})
        // 向上滚动
        if(distance>500*this.state.currPage && scrollDirection>0){
            this.handleNextPage()
        }
        // 向下滚动
       if (distance<=500*(this.state.currPage-1)&&scrollDirection<0){
            this.handlePrevPage();
       }
    }
    renderDom(domData){
        const{currPage}=this.state
        return domData.map(item=>(<div className='cell' key={item}>{item+(currPage-1)*10}</div>))
    }
    render(){
        let {listHeight,currPage}=this.state
        let prevDom=[0,1,2,3,4,5,6,7,8,9]
        let currDom=[10,11,12,13,14,15,16,17,18,19]
        return(<div className="listWrapper" id='list'>
            <div className='list' style={{height:listHeight+'px'}}>
                <div className='prevDom' style={{top:`${(currPage-1)*500}px`}}>{this.renderDom(prevDom)}</div>
                <div className='currDom' style={{top:`${(currPage)*500}px`}}>{this.renderDom(currDom)}</div>
                {/* <div className='nextDom' style={{top:`${(currPage+1)*500}px`}}>{this.renderDom(nextDom)}</div> */}
                {/* <div className='loading' style={{top:listHeight+'px'}}>数据加载中...</div> */}
            </div>
        </div>)
    }
}
export default ScrollList