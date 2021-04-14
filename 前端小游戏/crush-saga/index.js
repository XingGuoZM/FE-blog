

let cells = [];
let prev={
  x:-1,
  y:-1
};
let curr={
  x:-1,
  y:-1,
};

// 绘制棋盘格
function drawCheckerboard() {
  ctx.fillStyle = '#fff';

  ctx.fillRect(0, 0, 500, 500);
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(5, 50 * i);
    ctx.lineTo(505, 50 * i);
    ctx.moveTo(50 * i, 5);
    ctx.lineTo(50 * i, 505);
    ctx.font = "10px serif";
  }
  ctx.stroke();
}
// 绘制水果icon
function drawFruits() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCheckerboard();

  for(let i=0;i<cells.length;i++){
    for(let j=0;j<cells[0].length;j++){
      ctx.font = "35px serif";
      ctx.fillText(cells[j][i], 12 + 50 * i, 40 + 50 * j);
    }
  }
}

function randomFruit(i) {
  return FRUITS[Math.floor(Math.random(i) * 10)]
}
function init() {
 
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    for (let j = 0; j < 10; j++) {
      cells[i][j]=randomFruit(i)
    }
  }
  drawFruits();
}
function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 5个可消除
function eliminateFive(){
  for(let i=0;i<cells.length;i++){
    for(let j=0;j<cells[i].length-5;j++){
      if(cells[i][j]===cells[i][j+1] && 
        cells[i][j+1]=== cells[i][j+2] &&
        cells[i][j+2]===cells[i][j+3] && 
        cells[i][j+3]=== cells[i][j+4]
      ){
        cells[i][j]=5;
        cells[i][j+1]=5;
        cells[i][j+2]=5;
        cells[i][j+3]=5;
        cells[i][j+4]=5;
        break;
      }
    }
  }
}
function eliminate() {
  for(let i=0;i<cells.length;i++){
    for(let j=0;j<cells[i].length-2;j++){
      if(cells[i][j]===cells[i][j+1] &&cells[i][j+1]=== cells[i][j+2]){
        cells[i][j]=1;
        cells[i][j+1]=1;
        cells[i][j+2]=1;
        setTimeout(()=>{
          enSmall(i,j);
          enSmall(i,j+1);
          enSmall(i,j+2);
        },1000)
        
        break;
      }
    }
  }
  for(let i=0;i<cells.length-2;i++){
    for(let j=0;j<cells[i].length;j++){
      if(cells[i][j]===cells[i+1][j] &&cells[i+1][j]=== cells[i+2][j]){
        cells[i][j]=2;
        cells[i+1][j]=2;
        cells[i+2][j]=2;
        break;
      }
    }
  }
  // drawFruits();
}
// 点击选中
function getTarget(x, y) {

  let cx = 0;
  let cy = 0;
  for (let i = 0; i < 10; i++) {
    if (x < 51 * i + 50) {
      cx = i;
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (y < 51 * i + 50) {
      cy = i;
      break;
    }
  }

  prev.x=curr.x;
  prev.y=curr.y;
  curr.x=cx;
  curr.y=cy;
  
  if (cells[cx][cy] === 0) {
    cells[cx][cy] = 1;
    ctx.fillStyle = 'rgba(0,255,255,.5)';
    ctx.fillRect(cx * 50, cy * 50, 50, 50);
  } else if (cells[cx][cy] === 1) {
    cells[cx][cy] = 0;
  }
  if(prev.x!==-1 && prev.y!==-1){
    switchCell();  
  }
}

function gameLoop() {

}
function enSmall(x,y,ms){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCheckerboard();

  for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
      if(i===x && j===y){
        ctx.font = "0px serif";
        ctx.fillText(cells[j][i], 12 + 50 * i, 40 + 50 * j);
      }else{
        ctx.font = "35px serif";
        ctx.fillText(cells[j][i], 12 + 50 * i, 40 + 50 * j);
      }
    }
  }
}
function switchCell(){
  let tpm = cells[prev.y][prev.x];
  cells[prev.y][prev.x]=cells[curr.y][curr.x];
  cells[curr.y][curr.x]=tpm;
  drawFruits();
  prev.x=-1;
  prev.y=-1;
  curr.x=-1;
  curr.y=-1;
  eliminate();
}
init();
eliminate();
// initCells();
canvas.addEventListener('click', (e) => {
  // clean();
  // init();

  getTarget(e.clientX, e.clientY);
});
