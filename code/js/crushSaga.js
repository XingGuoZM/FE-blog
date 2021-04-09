
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

// 绘制棋盘格
function drawCheckerboard() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 500, 500);
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(5, 50 * i + 5);
    ctx.lineTo(505, 50 * i + 5);
    ctx.moveTo(50 * i + 5, 5);
    ctx.lineTo(50 * i + 5, 505);
  }
  ctx.stroke();
}

drawCheckerboard()