import React from 'react'
import throttle from '../util/throttle'
import data from '../mock/waterfall'
import './waterfall.css';
class WaterFall extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listHead:data.tableHead,
            list:[],
            currPage:1,
            currRow:null,
        }
    }

    handleScroll=()=>{
        let index=this.state.currPage*20-1
        let top=document.getElementById('list'+index).getBoundingClientRect().top
        if(top<=500){
            let currPage=this.state.currPage+1
            let list=[]
            this.setState({currPage},()=>{
                list=this.state.list.concat(data.getData((this.state.currPage-1)*20,this.state.currPage*20))
                this.setState({list})
            })
        }
    }
    handleClick=(currRow)=>{
        this.setState({currRow})
    }
    componentDidMount(){
        let list=data.getData((this.state.currPage-1)*20,this.state.currPage*20);
        this.setState({list})
        document.getElementById('list').addEventListener('scroll',throttle(this.handleScroll,300))
        window.addEventListener('keyup',(e)=>{
            let row=this.state.currRow
            if(e.keyCode===38){
                let currRow=--row;
                this.setState({currRow})
            }else if(e.keyCode===40){
                let currRow=++row
                this.setState({currRow})
            }
        })
    }
    render(){
        const{currRow,listHead,list}=this.state
        let activeStyle={backgroundColor:'lightblue',color:'#282c34'}
        let head=Object.entries(listHead)
        let headCells=head.map(item=><td className='cell' key={item[0]}>{item[1]}</td>)
        let listDiv=list&&list.map(item=><tr 
            className='row' 
            style={currRow===item.index?activeStyle:null} 
            id={'list'+item.index} 
            key={item.index} 
            onClick={()=>this.handleClick(item.index)}>
                {head.map(cell=><td className='cell' key={cell[0]}>{item[cell[0]]}</td>)}
            </tr>)
        return (
            <div className='list' id='list'>
            <table className="list" >
                <thead>
                    <tr className="listHead">{headCells}</tr>
                </thead>
                <tbody>
                    {listDiv}
                </tbody>
            </table>
            </div>)
    }
}

export default WaterFall