alert("点击页面 任意位置 开始游戏");

var elements = document.getElementsByTagName("*");
var isMusicPlaying = false; // 标志变量，用于判断音乐是否正在播放

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function (event) {
    if (!isMusicPlaying) {
      event.stopPropagation(); // 停止事件传播

      var bgmusic = new Audio('music/bg.mp3');
      bgmusic.loop = true;
      bgmusic.volume = 0.25;
      bgmusic.play();

      isMusicPlaying = true; // 将标志变量设置为 true，表示音乐正在播放
    }
  });
}

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
//target.addEventListener('click', () => {
  //const qqNumber = prompt('：');
  //targetImage.src = 'https://q.qlogo.cn/g?b=qq&nk=' + qqNumber + '&s=640';
//});

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

    message.textContent = '正在瞄准';

    var audio = new Audio('../music/shoot.mp3');

    audio.play();

    setTimeout(function () {
      const f = Math.abs(targetX - gunX); // 获取X坐标的误差，为防止负数，进行绝对值操作

      if (f <= 5) {
        //高度减少
        targetImage.style.objectFit = 'cover';
        targetImage.style.objectPosition = 'top';
        targetImage.height = targetImage.height / 1.25;

        score = score + 1; // 加分

        if (targetImage.height == "0") {
          alert("游戏结束！本次得分：" + score);
        }

        message.textContent = '干的不错！当前分数：' + score; // 成功提示
        targetX = Math.random() * 90; // 靶子随机X坐标
      } else {
        message.textContent = '再接再厉！当前分数：' + score; // 没射中提示
      }

      updatePositions(); // 刷新X坐标

      timen = setTimeout(() => {
        message.textContent = '';
      }, 2500); // 在2.5秒后隐藏提示信息

    }, 1000);
  }
});

let timen = setTimeout(() => {
  message.textContent = '';
}, 2500);

// 射击
shootButton.addEventListener('click', () => {
  clearTimeout(timen); // 把之前的定时器取消

  message.textContent = '正在瞄准';

  var audio = new Audio('../music/shoot.mp3');

  audio.play();

  setTimeout(function () {
    const f = Math.abs(targetX - gunX); // 获取X坐标的误差，为防止负数，进行绝对值操作

    if (f <= 5) {
      //高度减少
      targetImage.style.objectFit = 'cover';
      targetImage.style.objectPosition = 'top';
      targetImage.height = targetImage.height / 1.25;

      score = score + 1; // 加分

      if (targetImage.height == "0") {
        alert("游戏结束！本次得分：" + score);
      }

      message.textContent = '干的不错！当前分数：' + score; // 成功提示
      targetX = Math.random() * 90; // 靶子随机X坐标
    } else {
      message.textContent = '再接再厉！当前分数：' + score; // 没射中提示
    }

    updatePositions(); // 刷新X坐标

    timen = setTimeout(() => {
      message.textContent = '';
    }, 2500); // 在2.5秒后隐藏提示信息

  }, 1000);
});

function random_x() {
  targetX = Math.random() * 90; // 靶子随机X坐标
  updatePositions();
}

//随机移动，增加难度，可以选择开启
//setInterval(random_x, 3000);

// 刷新X坐标
updatePositions();