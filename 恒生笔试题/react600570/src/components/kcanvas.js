import React from 'react'
import throttle from '../util/throttle'
class KCanvas extends React.Component{

    constructor(props){
        super(props);
        this.state={
            canvas:null,
            ctx:null
        }
    }
    clearCanvas() {  
        const{ctx,canvas}=this.state
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }  
    drawLine(left,top){
        // const context=document.getElementById("myCanvas").getContext("2d"); 
        const{ctx,canvas}=this.state
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 1]);
        ctx.moveTo(left, 0);
        ctx.lineTo(left, 400);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([0.5, 1]);
        ctx.moveTo(0,top)
        ctx.lineTo(400,top);
        ctx.stroke();
        ctx.closePath();
    }
    componentDidMount(){
        const ctx = document.getElementById('myCanvas').getContext('2d');
        const canvas=document.getElementById('myCanvas')
        this.setState({ctx,canvas})
        document.getElementById('myCanvas').addEventListener('mousemove',(e)=>{
            const rect = canvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) * canvas.width / rect.width
            const y = (e.clientY - rect.top) * canvas.height / rect.height
            this.clearCanvas()
            this.drawLine(x,y)
        })
    }
    render(){
        return<canvas id='myCanvas' style={{width:'400px',height:'400px',backgroundColor:'#fff',marginTop:'50px',marginBottom:'50px'}}></canvas>
    }
}

export default KCanvas