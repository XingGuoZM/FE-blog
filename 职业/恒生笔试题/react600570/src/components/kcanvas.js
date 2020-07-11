import React from 'react'
// import throttle from '../util/throttle'
class KCanvas extends React.Component{

    constructor(props){
        super(props);
        this.state={
            canvas:null,
            ctx:null
        }
    }
    drawLine(arr,linecolor) {
        const {ctx}=this.state
        ctx.beginPath();
        ctx.strokeStyle = linecolor;
        ctx.setLineDash([3, 1]);
        ctx.moveTo(arr[0][0],arr[0][1]);
        for (let i=1; i<arr.length; i++) {
            ctx.lineTo(arr[i][0],arr[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
    drawTab(width) {
        for(let i=0; i<90; i++) {
            for (let j=1; j<6; j++) {
                this.drawLine([ [7*i,100*j], [7*i+5,100*j] ], "#efefef");
                this.drawLine([ [100*j,7*i], [100*j,7*i+5] ], "#efefef");
            }
        }
    }
    moveEvent() {
        const {ctx,canvas}=this.state
        window.onmousemove = (e)=> {
            if (e.target.id === "myCanvas") {
                const rect = canvas.getBoundingClientRect()
                const x = (e.clientX - rect.left) * canvas.width / rect.width
                const y = (e.clientY - rect.top) * canvas.height / rect.height
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.drawTab(600);
                this.drawLine([ [0,y], [600,y] ], "#ccc");
                this.drawLine([ [x,0], [x,600] ], "#ccc");
            }
        };
    }
    componentDidMount(){
        const ctx = document.getElementById('myCanvas').getContext('2d');
        const canvas=document.getElementById('myCanvas')
        this.setState({ctx,canvas},()=>{
            this.moveEvent()
        })
    }
    render(){
        return<canvas id='myCanvas' style={{width:'100%',height:'500px',backgroundColor:'#fff',marginTop:'50px',marginBottom:'50px'}}></canvas>
    }
}

export default KCanvas