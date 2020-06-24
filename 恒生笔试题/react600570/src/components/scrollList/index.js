import React from 'react';
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listDom:[],
            listData:[],
            listHeight:1000,
            currPage:1,
            currData:[],
            preDistance:0
        }
    }
    componentWillMount(){
        // dom数量
        let arr=[]
        for(let i=0;i<20;i++){ arr.push(i) }
        this.setState({listDom:arr})
        this.getData();
    }
    getData(pageNum,pageSize){
        //模拟数据 
        let data=[]
        const{listData}=this.state
        let all=JSON.parse(JSON.stringify(listData))
        for(let i=0;i<20;i++){ data.push(i+(this.state.currPage-1)*20) }
        all.push(data)
        this.setState({currData:data,listData:all})
    }
    componentDidMount(){
        document.getElementById('list').addEventListener('scroll',this.handleScroll)
    }
    handleScroll=(e)=>{
        const distance=e.target.scrollTop
        // 滚动方向
        const scrollDirection = distance-this.state.preDistance
        this.setState({preDistance:distance})
        // 向下滑动
        if(distance>=700*this.state.currPage && scrollDirection>0){
            let currPage=this.state.currPage+1
            let listHeight=this.state.listHeight+1000
            let currData=this.state.listData[currPage-2]
            this.setState({listHeight,currPage,currData})
            this.getData()
        }
        // 向上滑动
       if (distance<=700*(this.state.currPage-1)&&scrollDirection<0){
            let currPage=(this.state.currPage-1<1)?1:(this.state.currPage-1)
            let currData=this.state.listData[currPage-1]
            this.setState({currPage,currData})
       }
    }
    renderDom(listDom,currPage,currData){
        return listDom.map(item=><div className='cell' style={{top:item*60+10+(currPage-1)*700+'px'}} key={item}>
            {currData[item]}
            </div>)
    }
    render(){
        let {listHeight,currPage,listDom,currData}=this.state
        
        return(<div className="listWrapper" id='list'>
            <div className='list' style={{height:listHeight+'px'}}>
                {this.renderDom(listDom,currPage,currData)}
            </div>
        </div>)
    }
}
export default ScrollList