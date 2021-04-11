
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const FRUITS=['🍉','🍌','🍎','🥭','🍊','🍓','🍑','🍐','🍍','🍇'];
let cells=[];

// 绘制棋盘格
function drawCheckerboard() {
  ctx.fillStyle = '#fff';

  ctx.fillRect(0, 0, 500, 500);
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(5, 50 * i);
    ctx.lineTo(505, 50 * i );
    ctx.moveTo(50 * i, 5);
    ctx.lineTo(50 * i, 505);
    ctx.font = "10px serif";
  }
  ctx.stroke();
}
// 绘制水果icon
function drawFruits(){
  ctx.font = "35px serif";
  for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
      ctx.fillText(randomFruit(i), 12+50*i, 40+50*j);
    }
  }
}

function randomFruit(i){
  return FRUITS[Math.floor(Math.random(i)*10)]
}
function init(){
  drawCheckerboard();
  drawFruits();

}
function initCells(){
    for(let i=0;i<10;i++){
    cells[i]=[];
    for(let j=0;j<10;j++){
      cells[i][j]=0;
    }
  }
}
function clean(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
function gameLoop(){

}
// 点击选中
function getTarget(x,y){

    let cx=0;
    let cy=0;
    for(let i=0;i<10;i++){
      if(x<51*i+50){
        cx=i;
        break;
      }
    }
    for(let i=0;i<10;i++){
      if(y<51*i+50){
        cy=i;
        break;
      }
    }
    console.log(cells[cx][cy],cx,cy)
    if(cells[cx][cy]===0){
      cells[cx][cy]=1;
      ctx.fillStyle = 'rgba(0,255,255,.5)';
      ctx.fillRect(cx*50, cy*50, 50, 50);
    }else if(cells[cx][cy]===1){
      cells[cx][cy]=0;
    }
}

init();
initCells();
canvas.addEventListener('click',(e)=>{
  // clean();
  // init();
  
  getTarget(e.clientX,e.clientY);
});
