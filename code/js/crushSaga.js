
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const FRUITS=['🍉','🍌','🍎','🥭','🍊','🍓','🍑','🍐','🍍','🍇'];

// 绘制棋盘格
function drawCheckerboard() {
  ctx.fillStyle = '#fff';

  ctx.fillRect(0, 0, 500, 500);
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(5, 50 * i + 5);
    ctx.lineTo(505, 50 * i + 5);
    ctx.moveTo(50 * i + 5, 5);
    ctx.lineTo(50 * i + 5, 505);
    ctx.font = "35px serif";
  }
  ctx.stroke();
}
// 绘制
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

// 点击选中
function getTarget(){
  canvas.addEventListener('click',()=>{
    console.log(123);
  })
}

drawCheckerboard();
drawFruits();