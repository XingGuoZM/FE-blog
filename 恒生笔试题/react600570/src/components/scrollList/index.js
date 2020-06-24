import React from 'react';
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listData:[],
            listHeight:1000,
            currPage:1,
            preDistance:0
            // ratio:1
        }
    }
    componentWillMount(){
        let arr=[]
        for(let i=0;i<20;i++){ arr.push(i) }
        this.setState({listData:arr})
    }
    componentDidMount(){
        document.getElementById('list').addEventListener('scroll',this.handleScroll)
    }
    handleScroll=(e)=>{
        const distance=e.target.scrollTop
        // 滚动方向
        const scrollDirection = distance-this.state.preDistance
        this.setState({preDistance:distance})
        // 
        // console.log(distance,this.state.currPage*700,scrollDirection)
        // 向下滑动
        if(distance>=700*this.state.currPage && scrollDirection>0){
            let currPage=this.state.currPage+1
            let listHeight=this.state.listHeight+1000
            this.setState({listHeight,currPage})
        }
        // 向上滑动
       if (distance<=700*(this.state.currPage-1)&&scrollDirection<0){
            let currPage=(this.state.currPage-1<1)?1:(this.state.currPage-1)
            this.setState({currPage})
       }
    }
    render(){
        let {listHeight,currPage}=this.state
        let rows=this.state.listData.map(item=><div className='cell' style={{top:item*60+10+(currPage-1)*700+'px'}} key={item}>{item}</div>)
        return(<div className="listWrapper" id='list'>
            <div className='list' style={{height:listHeight+'px'}}>
                {rows}
            </div>
        </div>)
    }
}
export default ScrollList