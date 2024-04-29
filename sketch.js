//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//

//初始设置
let start = 0;
let oscA, oscB;
let envA, envB;
let playingA = false, playingB = false;
let playingL = false, playingH = false;
let fftA, fftB;//不知道是什么但是傅立叶你好
let waveformA = [], waveformB = [];
let waveSize = 200;
let waveformButtons = [];
let sliders = [];
let sliderAttack, sliderDecay, sliderSustain, sliderRelease;
let sliderFreqA, sliderFreqB;
let oscHeightA = 50;
let splashImg1;
let BG;
let BowlL
let BowlH
let audioStarted = false; 
var mode=0;

//背景 splash 设置
function preload(){
  
  BowlL=loadSound('Bowl Low.mp3')
  BowlH=loadSound('Bowl High.mp3')
  splashImg1=loadImage('splash1.jpg');
  splash2=loadImage('splash2.jpg');
  splash3=loadImage('splash3.jpg');
  BG=loadImage('111.jpg');
}

//Osc基础设置
function setup() {
  createCanvas(min(windowWidth, 800), min(windowHeight, 600));
  intro = new Splash();
  getAudioContext().suspend();
  if(start==3){
    oscA = new p5.Oscillator('sine');
    oscB = new p5.Oscillator('sine');
    envA = new p5.Envelope();
    envB = new p5.Envelope();
    envA.setADSR(0.1, 0.2, 0.5, 0.5);
    envB.setADSR(0.1, 0.2, 0.5, 0.5);
    fftA = new p5.FFT();
    fftB = new p5.FFT();
    fftA.setInput(oscA);
    fftB.setInput(oscB);
    
  
//Freq滑块
    createWaveformButtons(oscA, envA, oscHeightA);
    createADSRSliders(envA, oscHeightA);
    createFrequencySliders(oscA, oscHeightA + 195);

   createWaveformButtons(oscB, envB, height / 2 + 20 + 20);
   createADSRSliders(envB, height / 2 + 20 + 20);
   createFrequencySliders(oscB, height / 2 + 220 + 17);
    
  }
}

//锁定画布
function windowResized() {
  resizeCanvas(min(windowWidth, 800), min(windowHeight, 600));
}

//波形按钮
function createWaveformButtons(osc, env, yPos) {
  let waveforms = ['sine', 'triangle', 'square', 'sawtooth'];
  waveforms.forEach((waveform, index) => {
    let btn = createButton(waveform);
    btn.position(40, yPos + index * 50);
    btn.mousePressed(() => osc.setType(waveform));
     waveformButtons.push(btn);
  });
}

//ADSR滑块
function createADSRSliders(env, yPos) {
  sliderAttack = createSlider(0, 1, 0.1, 0.01);
  sliderDecay = createSlider(0, 1, 0.2, 0.01);
  sliderSustain = createSlider(0, 1, 0.5, 0.01);
  sliderRelease = createSlider(0, 1, 0.5, 0.01);
  sliderAttack.position(150, yPos);
  sliderDecay.position(150, yPos + 50);
  sliderSustain.position(150, yPos + 100);
  sliderRelease.position(150, yPos + 150);
  sliders.push(sliderAttack);
  sliders.push(sliderDecay);
  sliders.push(sliderSustain);
  sliders.push(sliderRelease);
  
  sliderAttack.input(() => env.setADSR(sliderAttack.value(), sliderDecay.value(), sliderSustain.value(), sliderRelease.value()));
  sliderDecay.input(() => env.setADSR(sliderAttack.value(), sliderDecay.value(), sliderSustain.value(), sliderRelease.value()));
  sliderSustain.input(() => env.setADSR(sliderAttack.value(), sliderDecay.value(), sliderSustain.value(), sliderRelease.value()));
  sliderRelease.input(() => env.setADSR(sliderAttack.value(), sliderDecay.value(), sliderSustain.value(), sliderRelease.value()));
}

//频率滑块
function createFrequencySliders(osc, yPos) {
  let sliderFreq = createSlider(20, 2000, 440, 1);
  sliderFreq.position(width - 130, yPos-120);
  sliderFreq.style('transform', 'rotate(+270deg');
  sliderFreq.style('width', '170px');
  sliderFreq.input(() => osc.freq(sliderFreq.value()));
  sliders.push(sliderFreq);
}

//ADSR名字格式
function frequencySlidersLable(){
  noFill();
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(0);
  text('Freq ', 762, 319);
  text('Freq ', 762, 25);
}

//画ADSR标签
function ADSRLabels() {
  text('Attack', sliderAttack.x + sliderAttack.width + 40, sliderAttack.y + 10);
  text('Decay', sliderDecay.x + sliderDecay.width + 40, sliderDecay.y + 10);
  text('Sustain', sliderSustain.x + sliderSustain.width + 40, sliderSustain.y + 10);
  text('Release', sliderRelease.x + sliderRelease.width + 40, sliderRelease.y + 10);
  text('Attack', sliderAttack.x + sliderAttack.width + 40, oscHeightA + 10);
  text('Decay', sliderDecay.x + sliderDecay.width + 40, oscHeightA + 60);
  text('Sustain', sliderSustain.x + sliderSustain.width + 40, oscHeightA + 110);
  text('Release', sliderRelease.x + sliderRelease.width + 40, oscHeightA + 160);
}

//Splash
function splash(){
  if(start==0){
    image(splashImg1,0,0,800,600); 
  }else if(start==1){
    image(splash2,0,0,800,600);
    // 隐藏所有按钮
    waveformButtons.forEach(btn => {
      btn.hide();
    });
    // 隐藏所有滑块
    sliders.forEach(slider => {
      slider.hide();
    });
  }else if(start==2){
    image(splash3,0,0,800,600);
  }
}

function showControls() {
  waveformButtons.forEach(btn => btn.show());
  sliders.forEach(slider => slider.show());
}

function mousePressed(){
  if(mode==1)
    start++;
}

function draw() {
  if (mouseIsPressed == true && intro.update() == true) {
    mode = 1;
    setTimeout(function() {
      if(start==0)
      start=1;
    }, 1000);   
  }
  if (mode != 0) {
    background(BG);
    intro.hide();
    
    if(start>2){
        userStartAudio();
        audioStarted = true;
        
      if(start==3){
        setup();
        start++;
        
      }
    
     ADSRLabels();
     frequencySlidersLable();

     waveformA = fftA.waveform();
     waveformB = fftB.waveform();

     drawWaveform(waveformA, width / 2 + 20, 50, 'A');
     drawWaveform(waveformB, width / 2 + 20, height / 2 + 20, 'B');

     drawWaveformDisplay(width / 2 + 20, 50, 'A');
     drawWaveformDisplay(width / 2 + 20, height / 2 + 20, 'B');
      
     showControls();
   }
   if(start<3){
     splash();
   }
 }
}

//Visualizer
function drawWaveform(waveform, xPos, yPos, oscLabel) {
  push();
  noFill();
  beginShape();
  stroke(0);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, xPos, xPos + waveSize*1.46);
    let y = map(waveform[i], -1, 1.6, yPos * 1.148 + waveSize - 72, yPos);
    vertex(x, y);
  }
  endShape();
  pop();
  text('Oscillator ' + oscLabel, xPos + waveSize*1.46 / 2 - width * 5 / 10, yPos * 1.09 - 30);
}

//Visualizer标签
function drawWaveformDisplay(xPos, yPos, oscLabel) {
  noFill();
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(0);
  text('Visualizer ' + oscLabel, xPos + waveSize*1.46 / 2, yPos * 1.09 - 30);
}


//音频触发
function keyPressed() {
  if (key === 'a' || key === 'A') {
    if (!playingA) {
      oscA.start();
      envA.play(oscA);
      playingA = true;
    }
  } else if ((key === 's' || key === 'S')) {
    if (!playingB) {
      oscB.start();
      envB.play(oscB);
      playingB = true;
    }
  }  if (key === 'l' ) {
    if (!playingL) {
      BowlL.play();
      playingL = true;}
  } else if (key === 'h') {
    if (!playingH) {
      BowlH.play();
      playingH = true;}
  }
}

function keyReleased() {
  if ((key === 'a' || key === 'A') && playingA) {
    envA.triggerRelease(oscA);
    playingA = false;
  } else if ((key === 's' || key === 'S') && playingB) {
    envB.triggerRelease(oscB);
    playingB = false;
  }  if (key === 'l'  && playingL) {
    playingL = false;
  } else if (key === 'h' && playingH) {
    playingH = false;}
  if(key=='?'||key=='/'){
    start=1;
  }
  if(key=='i'){
    mode=0;
    setup();
     // 隐藏所有按钮
    waveformButtons.forEach(btn => {
      btn.hide();
    });
     // 隐藏所有滑块
    sliders.forEach(slider => {
      slider.hide();
    });
  }
}

