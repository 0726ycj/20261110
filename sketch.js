let idleSheet; // 儲存角色 1 原本的七格精靈圖
let walkSheet; // 儲存角色 1 的八格走路精靈圖
let characterX; // 儲存角色中心點的水平位置
let facingDirection = 1; // 設定角色初始面向右方
const idleFrameCount = 7; // 設定原本精靈圖中的動畫影格數
const walkFrameCount = 8; // 設定走路精靈圖中的動畫影格數
const framesPerStep = 8; // 設定每個影格停留的繪圖次數
const moveSpeed = 5; // 設定角色每個繪圖影格的移動距離

function preload() { // 在畫布建立前載入角色圖片
  idleSheet = loadImage('1/01/武器0008.png'); // 載入角色 1 原本的精靈圖檔
  walkSheet = loadImage('1/03/走0009.png'); // 載入角色 1 的走路精靈圖檔
} // 結束圖片載入函式

function setup() { // 設定全螢幕畫布與繪圖模式
  createCanvas(windowWidth, windowHeight); // 依照目前視窗大小建立畫布
  imageMode(CENTER); // 使用圖片中心作為繪製座標以便轉向
  noSmooth(); // 保留像素精靈圖的清晰邊緣
  characterX = width / 2; // 將角色初始位置放在畫布水平中央
} // 結束初始設定函式

function draw() { // 每個動畫影格執行一次繪製
  background('#87CEEB'); // 以天空藍清除並填滿整個畫布
  const movingRight = keyIsDown(RIGHT_ARROW); // 偵測是否按住鍵盤右鍵
  const movingLeft = keyIsDown(LEFT_ARROW); // 偵測是否按住鍵盤左鍵
  const isWalking = movingRight || movingLeft; // 判斷角色是否正在走路動畫狀態
  if (movingRight) { // 按住右鍵時向右移動
    characterX += moveSpeed; // 增加角色的水平座標
    facingDirection = 1; // 讓角色面向右方
  } else if (movingLeft) { // 按住左鍵時向左移動
    characterX -= moveSpeed; // 減少角色的水平座標
    facingDirection = -1; // 讓角色面向左方
  } // 結束左右移動判斷
  const activeSheet = isWalking ? walkSheet : idleSheet; // 依按鍵狀態選擇走路或原本的精靈圖
  const activeFrameCount = isWalking ? walkFrameCount : idleFrameCount; // 取得目前精靈圖的影格總數
  const frameWidth = activeSheet.width / activeFrameCount; // 計算每格精靈圖的來源寬度
  const frameHeight = activeSheet.height; // 取得精靈圖的來源高度
  const currentFrame = floor(frameCount / framesPerStep) % activeFrameCount; // 循環選取目前精靈圖中的影格
  const displayScale = min(4, max(2, height * 0.004), width / frameWidth); // 依畫面大小調整角色比例並確保不超出窄畫布
  const displayWidth = frameWidth * displayScale; // 計算角色顯示寬度
  const displayHeight = frameHeight * displayScale; // 計算角色顯示高度
  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色中心位置以停在畫布左右邊界
  push(); // 儲存目前的畫布轉換狀態
  translate(characterX, height / 2); // 將繪圖原點移到角色中心位置
  scale(facingDirection, 1); // 依角色面向水平翻轉精靈圖
  image(activeSheet, 0, 0, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 繪製目前動畫影格
  pop(); // 還原畫布轉換狀態
} // 結束每格繪製函式

function keyPressed() { // 接收鍵盤按下事件
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷是否按下左右方向鍵
    return false; // 阻止方向鍵捲動網頁
  } // 結束方向鍵判斷
} // 結束鍵盤事件函式

function windowResized() { // 視窗尺寸改變時重新調整畫布
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿目前視窗
  characterX = constrain(characterX, 0, width); // 調整角色位置以符合新的畫布寬度
} // 結束視窗尺寸調整函式
