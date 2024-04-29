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
let sliderAttackA, sliderDecayA, sliderSustainA, sliderReleaseA,sliderAttackB, sliderDecayB, sliderSustainB, sliderReleaseB;
let sliderFreqA, sliderFreqB;
let oscHeightA = 50;
let splashImg1;
let BG;
let BowlL
let BowlH
let audioStarted = false;
var mode=0;
let guide=0;


//背景 splash 设置
function preload(){

  BowlL=loadSound('assets/Bowl Low.mp3')
  BowlH=loadSound('assets/Bowl High.mp3')
  splashImg1=loadImage('assets/splash1.jpg');
  splash2=loadImage('assets/splash2.jpg');
  splash3=loadImage('assets/splash3.jpg');
  BG=loadImage('assets/111.jpg');
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
    createADSRSlidersForOscA(envA, oscHeightA);
    createFrequencySliders(oscA, oscHeightA + 195);

    createWaveformButtons(oscB, envB, height / 2 + 20 + 20);
    createADSRSlidersForOscB(envB, height / 2 + 20 + 20);
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
// 对于 Oscillator A
function createADSRSlidersForOscA(env, yPos) {
  sliderAttackA = createSlider(0, 1, 0.1, 0.01);
  sliderDecayA = createSlider(0, 1, 0.2, 0.01);
  sliderSustainA = createSlider(0, 1, 0.5, 0.01);
  sliderReleaseA = createSlider(0, 1, 0.5, 0.01);

  sliderAttackA.position(150, yPos);
  sliderDecayA.position(150, yPos + 50);
  sliderSustainA.position(150, yPos + 100);
  sliderReleaseA.position(150, yPos + 150);

  sliders.push(sliderAttackA);
  sliders.push(sliderDecayA);
  sliders.push(sliderSustainA);
  sliders.push(sliderReleaseA);

  sliderAttackA.input(() => env.setADSR(sliderAttackA.value(), sliderDecayA.value(), sliderSustainA.value(), sliderReleaseA.value()));
  sliderDecayA.input(() => env.setADSR(sliderAttackA.value(), sliderDecayA.value(), sliderSustainA.value(), sliderReleaseA.value()));
  sliderSustainA.input(() => env.setADSR(sliderAttackA.value(), sliderDecayA.value(), sliderSustainA.value(), sliderReleaseA.value()));
  sliderReleaseA.input(() => env.setADSR(sliderAttackA.value(), sliderDecayA.value(), sliderSustainA.value(), sliderReleaseA.value()));
}

// 对于 Oscillator B
function createADSRSlidersForOscB(env, yPos) {
  sliderAttackB = createSlider(0, 1, 0.1, 0.01);
  sliderDecayB = createSlider(0, 1, 0.2, 0.01);
  sliderSustainB = createSlider(0, 1, 0.5, 0.01);
  sliderReleaseB = createSlider(0, 1, 0.5, 0.01);

  sliderAttackB.position(150, yPos);
  sliderDecayB.position(150, yPos + 50);
  sliderSustainB.position(150, yPos + 100);
  sliderReleaseB.position(150, yPos + 150);

  sliders.push(sliderAttackB);
  sliders.push(sliderDecayB);
  sliders.push(sliderSustainB);
  sliders.push(sliderReleaseB);

  sliderAttackB.input(() => env.setADSR(sliderAttackB.value(), sliderDecayB.value(), sliderSustainB.value(), sliderReleaseB.value()));
  sliderDecayB.input(() => env.setADSR(sliderAttackB.value(), sliderDecayB.value(), sliderSustainB.value(), sliderReleaseB.value()));
  sliderSustainB.input(() => env.setADSR(sliderAttackB.value(), sliderDecayB.value(), sliderSustainB.value(), sliderReleaseB.value()));
  sliderReleaseB.input(() => env.setADSR(sliderAttackB.value(), sliderDecayB.value(), sliderSustainB.value(), sliderReleaseB.value()));
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
  text('Attack', sliderAttackA.x + sliderAttackA.width + 40, sliderAttackB.y + 10);
  text('Decay', sliderDecayA.x + sliderDecayA.width + 40, sliderDecayB.y + 10);
  text('Sustain', sliderSustainA.x + sliderSustainA.width + 40, sliderSustainB.y + 10);
  text('Release', sliderReleaseA.x + sliderReleaseA.width + 40, sliderReleaseB.y + 10);
  text('Attack', sliderAttackA.x + sliderAttackA.width + 40, oscHeightA + 10);
  text('Decay', sliderDecayA.x + sliderDecayA.width + 40, oscHeightA + 60);
  text('Sustain', sliderSustainA.x + sliderSustainA.width + 40, oscHeightA + 110);
  text('Release', sliderReleaseA.x + sliderReleaseA.width + 40, oscHeightA + 160);
}

//Splash
function splash(){
  if(start==0){
    image(splashImg1,0,0,800,600);
  }else if(start==1||guide==1){
    image(splash2,0,0,800,600);
    // 隐藏所有按钮
    waveformButtons.forEach(btn => {
      btn.hide();
    });
    // 隐藏所有滑块
    sliders.forEach(slider => {
      slider.hide();
    });
  }else if(start==2||guide==2){
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
  if(guide>0)
    guide++;
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


      if(!(guide>0&&guide<3))
        showControls();
    }
    if(start<3||(guide>0&&guide<3)){
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
      envA.triggerAttack(oscA);
      playingA = true;
    }
  } else if (key === 's' || key === 'S') {
    if (!playingB) {
      oscB.start();
      envB.triggerAttack(oscB);
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
    guide=1;
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

