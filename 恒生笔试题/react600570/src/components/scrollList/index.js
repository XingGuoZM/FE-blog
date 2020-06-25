import React from 'react';
// import throttle from '../../util/throttle'
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
        for(let i=0;i<this.state.pageSize;i++){ arr.push(i) }
        this.setState({listDom:arr})
        this.getData();
    }
    getData(pageNum,pageSize){
        //模拟数据 
        let data=[]
        const{listData}=this.state
        let all=JSON.parse(JSON.stringify(listData))
        for(let i=0;i<this.state.pageSize;i++){ 
            let count=i+(this.state.currPage-1)*this.state.pageSize
            let item ='第 '+count+' 条数据'
            data.push(item) 
        }
        all.push(data)
        this.setState({currData:data,listData:all})
    }
    componentDidMount(){
        document.getElementById('list').addEventListener('scroll',this.handleScroll)
        // 键盘事件监听
        this.handleKeyup()
    }
    handleKeyup(){
        window.addEventListener('keyup',(e)=>{
            let {currSelected}=this.state
            // console.log(currSelected)
            // currSelected=currSelected+(this.state.currPage-1)*20
            console.log(currSelected)
            if(e.keyCode===40){
                e.preventDefault();
                ++currSelected
                this.setState({currSelected})
            }else if(e.keyCode===38){
                e.preventDefault();
                --currSelected
                this.setState({currSelected})
            }
        })
    }
    handleSelect=(currSelected)=>{
        // console.log(currSelected,currSelected+(this.state.currPage-1)*20)
        // console.log(currSelected)
        if(this.state.currSelected===currSelected){
            this.setState({currSelected:-1})
        }else{
            this.setState({currSelected})
        }
    }
    handleScroll=(e)=>{
        const distance=e.target.scrollTop
        // 滚动方向
        const scrollDirection = distance-this.state.preDistance
        this.setState({preDistance:distance})
        // 向上滚动
        // console.log(distance,this.state.fetchHeight*this.state.currPage)
       
        if(distance>=this.state.fetchHeight*this.state.currPage && scrollDirection>0){
            let currPage=this.state.currPage+1
            let listHeight=this.state.listHeight+1000
            let currData=this.state.listData[currPage-2]
            this.setState({listHeight,currPage,currData})
            // this.setState({isLoading:true})
            // window.setTimeout(()=>{
                // this.setState({isLoading:false})
                this.getData()
            // },2000)
        }
        // 向下滚动
       if (distance<=this.state.fetchHeight*(this.state.currPage-1)&&scrollDirection<0){
            let currPage=(this.state.currPage-1<1)?1:(this.state.currPage-1)
            let currData=this.state.listData[currPage-1]
            this.setState({currPage,currData})
       }
    }
    renderDom(listDom,currPage,currData,currSelected){
        let activeStyle={
            backgroundColor:'rgba(255,111,0,.06)',
            border:'solid 1px #ff6f00',
            color:'#ff6f00'
        }
        return listDom.map(item=>{
            let isActive=currSelected===item+(this.state.currPage-1)*this.state.pageSize?activeStyle:null
            return <div className='cell' onClick={()=>this.handleSelect(item+(this.state.currPage-1)*this.state.pageSize)} 
                style={{...isActive,top:item*(50+10)+10+(currPage-1)*this.state.fetchHeight+'px'}} key={item}>
                {currData[item]}
            </div>})
    }
    render(){
        let {listHeight,currPage,listDom,currData,currSelected}=this.state
        
        return(<div className="listWrapper" id='list'>
            <div className='list' style={{height:listHeight+'px'}}>
                {this.renderDom(listDom,currPage,currData,currSelected)}
                <div className='loading' style={{top:listHeight+'px'}}>数据加载中...</div>
            </div>
        </div>)
    }
}
export default ScrollList