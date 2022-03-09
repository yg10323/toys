// 棋子位置
let piecePosition = {
  white: [{ x: 100, y: 100 }, { x: 100, y: 500 }],
  black: [{ x: 500, y: 100 }, { x: 500, y: 500 }]
}

this.canvas = document.getElementById('tutorial');
ctx = this.canvas.getContext('2d');


// 可走的位置
let freeSeat = [{ x: 300, y: 300 }, { x: 300, y: 500 }]
// 当前被点击棋子的位置
let clickedSeat = {}
// 下一步要走的位置
let nextSeat = {}

// websocket
// const socket = new WebSocket('ws://192.168.137.1:4043');
// socket.onmessage = function (event) {
//   // console.log('Message from server ', JSON.parse(event.data));
//   piecePosition = JSON.parse(event.data)[0]
//   freeSeat = JSON.parse(event.data)[1]
//   ctx.clearRect(0, 0, canvas.width, canvas.height)

//   console.log(piecePosition, freeSeat)

//   initial()
//   initData()
// }

// 初始化棋盘
function initial() {
  // 上
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(500, 100);
  ctx.stroke();

  // 右
  ctx.beginPath();
  ctx.moveTo(500, 100);
  ctx.lineTo(500, 500);
  ctx.stroke();

  // 左
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(100, 500);
  ctx.stroke();

  // 左对角
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(500, 500);
  ctx.stroke();

  // 右对角
  ctx.beginPath();
  ctx.moveTo(500, 100);
  ctx.lineTo(100, 500);
  ctx.stroke();

  // 圆牢房
  ctx.beginPath();
  ctx.arc(300, 500, 70, 0, 2 * Math.PI);
  ctx.stroke();
}

// 初始化棋子
function drawPieces() {
  for (let item of piecePosition.white) {
    ctx.beginPath();
    ctx.arc(item.x, item.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'white'
    ctx.fill();
    // 是否显示边框 => 用于被点击时
    // if (this.clickedSeat.white === item.y) {
    //   ctx.strokeStyle = 'red'
    //   ctx.stroke();
    // }
  }

  for (let item of piecePosition.black) {
    ctx.beginPath();
    ctx.arc(item.x, item.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'
    ctx.fill();
    // 是否显示边框 => 用于被点击时
    // if (this.clickedSeat.black === item.y) {
    //   ctx.strokeStyle = 'red'
    //   ctx.stroke();
    // }
  }

}

// 初始化数据并绑定点击事件
function initData() {
  // 画棋子
  drawPieces()

  // 监听点击事件
  canvas.addEventListener('click', e => {
    // 被点击的位置
    let x = Math.round(e.clientX / 100) * 100
    let y = Math.round(e.clientY / 100) * 100

    // console.log(x, y)
    const position = [...piecePosition.white, ...piecePosition.black]

    // 判断点击的是不是棋子
    for (let item of position) {
      if (JSON.stringify(item) === JSON.stringify({ x, y })) {
        clickedSeat.x = x, clickedSeat.y = y
      }
    }

    // 当点击过棋子并且下一步位置为空时, 记录下一步棋的位置
    if (JSON.stringify(clickedSeat) !== '{}' && JSON.stringify(nextSeat) === '{}') {
      for (let item of position) {
        // 如果下一步的位置有棋子, 直接结束
        if (JSON.stringify(item) === JSON.stringify({ x, y })) {
          return;
        }
      }
      // 下一步不是棋子的位置 且下一步的位置在可移动范围内
      for (let item of freeSeat) {
        if (JSON.stringify(item) === JSON.stringify({ x, y })) {
          // 当下一步是进牢时, 直接进行数据更新
          if (JSON.stringify({ x, y }) === JSON.stringify({ x: 300, y: 500 })) {
            resetCanvas(true)
            break;
          }
          nextSeat.x = x, nextSeat.y = y
          goStep()
        }
      }
    }
  })
}

// 移动棋子
function goStep(toCell = false) {
  // 替换piecePosition中的值为nextSeat
  const white = piecePosition.white, black = piecePosition.black
  for (let i in white) {
    if (JSON.stringify(white[i]) === JSON.stringify(clickedSeat)) {
      white[i] = nextSeat

    }
  }
  for (let i in black) {
    if (JSON.stringify(black[i]) === JSON.stringify(clickedSeat)) {
      black[i] = nextSeat
    }
  }
  // 重置画布
  resetCanvas(toCell)
}

// 判断赢家
function judgeWinner() {
  const winner = document.querySelector('.winner')
  if (piecePosition.white.length == 0) {
    winner.innerHTML = '赢家为 黑旗'

    setTimeout(() => {
      location.reload()
    }, 2000)
  } else if (piecePosition.black.length == 0) {
    winner.innerHTML = '赢家为 白旗'

    setTimeout(() => {
      location.reload()
    }, 2000)
  }

}

// 重置画布
function resetCanvas(toCell = false) {
  // 先更新数据
  updateData(toCell)
  // 清空原有画布并重新绘制
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  initial()
  drawPieces()

}

// 更新数据
function updateData(toCell) {
  // 棋子进牢
  if (toCell) {
    // 当前点击的棋子位置加入可移动范围
    freeSeat.push(deepClone(clickedSeat))

    // 且将该棋子删除
    const white = piecePosition.white, black = piecePosition.black
    for (let i in white) {
      if (JSON.stringify(white[i]) === JSON.stringify(clickedSeat)) {
        white.splice(i, 1)
      }
    }
    for (let i in black) {
      if (JSON.stringify(black[i]) === JSON.stringify(clickedSeat)) {
        black.splice(i, 1)
      }
    }
  } else {
    // 当没有棋子进牢时, 原先被点击棋子的位置变为可移动范围
    for (let i in freeSeat) {
      if (JSON.stringify(freeSeat[i]) === JSON.stringify(nextSeat)) {
        freeSeat[i] = deepClone(clickedSeat)
      }
    }

  }

  console.log(freeSeat)
  // 将棋子信息发送到服务器进行广播
  // socket.send(JSON.stringify([piecePosition, freeSeat]));

  // 初始化clickedSeat和nextSeat
  clickedSeat = {}
  nextSeat = {}

  // 每次更新数据后都判断一次有没有赢家
  judgeWinner()
}

// 深拷贝
function deepClone(obj) {
  // 对非对象进行过滤
  if (typeof obj !== 'object') return obj

  // 对null undefined 进行过滤
  if (obj == undefined) return obj

  // 对 RegExp Date Function 进行过滤
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Function) return new Function(obj)

  // 利用constructor进行实例化, 不管是对象还是数组
  let newObj = new obj.constructor()
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = this.deepClone(obj[key])
    }
  }

  return newObj
}

initial()
initData()

