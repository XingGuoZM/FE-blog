import React from 'react';
import './index.css'
class ScrollList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listData:[],
            listHeight:1000,
            currPage:1
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
        // console.log(e.target.scrollTop)
        const distance=e.target.scrollTop
        let listHeight=this.state.listHeight+1000
        let currPage=this.state.currPage+1
        console.log(distance,this.state.currPage*700)
        if(distance>700*this.state.currPage){
            this.setState({listHeight,currPage})
        }
    }
    render(){
        let {listHeight}=this.state
        let rows=this.state.listData.map(item=><div className='cell' style={{top:item*60+10+'px'}} key={item}>{item}</div>)
        return(<div className="listWrapper" id='list'>
            <div className='list' style={{height:listHeight+'px'}}>
                {rows}
            </div>
        </div>)
    }
}
export default ScrollList