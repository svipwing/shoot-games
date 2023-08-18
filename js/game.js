score = 0; // 分数

// 对元素进行选择，并放进变量
const target = document.querySelector('.target');
const gun = document.querySelector('.gun');
const moveLeftButton = document.getElementById('moveLeft');
const moveRightButton = document.getElementById('moveRight');
const shootButton = document.getElementById('shoot');
const message = document.getElementById('message');
const targetImage = document.getElementById('target_image');

// 彩蛋
target.addEventListener('click', () => {
  const qqNumber = prompt('请输入QQ号:');
  targetImage.src = 'https://q.qlogo.cn/g?b=qq&nk=' + qqNumber + '&s=640';
});

let targetX = 50; // 靶子的X坐标
let gunX = 50; // 枪的X坐标

// 刷新X坐标
function updatePositions() {
  target.style.left = targetX + '%'; // 靶子的坐标刷新
  gun.style.left = gunX + '%'; // 枪的坐标刷新
}

// 向左-按钮
moveLeftButton.addEventListener('click', () => {
  gunX = Math.max(gunX - 5, 0); // 防止超出范围
  updatePositions(); // 刷新X坐标
});

// 向右-按钮
moveRightButton.addEventListener('click', () => {
  gunX = Math.min(gunX + 5, 100); // 防止超出范围
  updatePositions(); // 刷新X坐标
});

// 移动-发射-键盘
document.addEventListener('keydown', function (event) {
  if (event.key === 'a') {
    gunX = Math.max(gunX - 5, 0); // 防止超出范围
    updatePositions(); // 刷新X坐标
  } else if (event.key === 'd') {
    gunX = Math.min(gunX + 5, 100); // 防止超出范围
    updatePositions(); // 刷新X坐标
  } else if (event.key === 's') {
    clearTimeout(timen); // 把之前的定时器取消
    const f = Math.abs(targetX - gunX); // 获取X坐标的误差，为防止负数，进行绝对值操作

    if (f <= 5) {
      score = score + 1; // 加分
      message.textContent = '干的不错！当前分数：' + score; // 成功提示
      targetX = Math.random() * 90; // 靶子随机X坐标
    } else {
      message.textContent = '再接再厉！当前分数：' + score; // 没射中提示
    }

    updatePositions(); // 刷新X坐标

    timen = setTimeout(() => {
      message.textContent = '';
    }, 2500); // 在2.5秒后隐藏提示信息
  }
});

let timen = setTimeout(() => {
  message.textContent = '';
}, 2500);

// 射击
shootButton.addEventListener('click', () => {
  clearTimeout(timen); // 把之前的定时器取消
  const f = Math.abs(targetX - gunX); // 获取X坐标的误差，为防止负数，进行绝对值操作

  if (f <= 5) {
    score = score + 1; // 加分
    message.textContent = '干的不错！当前分数：' + score; // 成功提示
    targetX = Math.random() * 90; // 靶子随机X坐标
  } else {
    message.textContent = '再接再厉！当前分数：' + score; // 没射中提示
  }

  updatePositions(); // 刷新X坐标

  timen = setTimeout(() => {
    message.textContent = '';
  }, 2500); // 在2.5秒后隐藏提示信息
});

// 刷新X坐标
updatePositions();