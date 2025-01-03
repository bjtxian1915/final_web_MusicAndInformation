let p = [];
let ripples = []; // 用於儲存波紋資料
let currentHue = 180; // 初始色相
const hueStep = 30; // 每次點擊增加的色相步長
const hamburger = document.querySelector('.hamburger');
        const menu = document.querySelector('.menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });


function setup() {
  colorMode(HSB, 300, 50, 90, 900); // 使用 HSB 顏色模式，包含透明度
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 初始化隨機點
  for (let i = 0; i < 30; i++) {
    p[i] = createVector(random(width), random(height), random(width));
  }
}

let dists = [];

function draw() {
  noStroke();
  fill(0, 0, 0, 100); // 黑色遮罩，透明度為 5（數值越小，效果越慢）
  rect(0, 0, width, height);

  background(0, 0, 10, 25); // 半透明背景，產生淡出效果

  let s = round(width / 100); // 計算方格大小
  for (let x = 0; x <= width + s; x += s) {
    for (let y = 0; y <= height + s; y += s) {

      // 計算每個隨機點與當前像素的距離
      for (let i = 0; i < p.length; i++) {
        let v = p[i];
        let z = (width / 2) * (sin((0.5 * millis()) / 1000) + 1);
        let d = dist(x, y, z, v.x, v.y, v.z);
        dists[i] = d;
        
        // 微調隨機點位置，增加動態效果
        p[i].x += random(-1, 1) * 0.001;
        p[i].y += random(-1, 1) * 0.001;
      }
      
      let o = sort(dists); // 對距離進行排序

      // 計算顏色，基於固定的 currentHue
      let baseHue = map(o[0], 0, 250, 180, 50); // 基於最近距離映射色相
      let saturation = map(o[1], 0, 250, 100, 100); // 基於第二近距離映射飽和度
      let brightness = map(o[2], 0, 100, 50, 54); // 基於第三近距離映射亮度

      fill((baseHue + currentHue) % 360, saturation, brightness); // 設定填充色
      let u = createVector(x, y);
      push();
      translate(u.x, u.y);
      rect(0, 0, s, s); // 繪製方格
      pop();
    }
  }

  // 繪製水波紋效果
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    stroke(r.hue, r.saturation, r.brightness, r.alpha); // 設定波紋的顏色和透明度
    strokeWeight(5);
    noFill();
    ellipse(r.pos.x, r.pos.y, r.size); // 繪製波紋

    // 更新波紋的大小和透明度
    r.size += 3; // 波紋擴大
    r.alpha -= 2; // 波紋逐漸變透明

    // 移除透明度過低的波紋
    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 重新初始化隨機點位置以適應新畫布大小
  for (let i = 0; i < p.length; i++) {
    p[i] = createVector(random(width), random(height), random(width));
  }
}

// 滑鼠點擊時產生水波紋並固定色相變化
function mousePressed() {
  // 在滑鼠點擊位置新增一個波紋
  ripples.push({
    pos: createVector(mouseX, mouseY), // 波紋起始位置為滑鼠點擊位置
    hue: currentHue, // 使用當前的固定色相
    saturation: 80,
    brightness: 100,
    alpha: 80, // 初始透明度
    size: 10 // 初始波紋大小
  });

  // 固定步長增加色相，確保色彩和諧
  currentHue = (currentHue + hueStep) % 720;
}
