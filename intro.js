class Splash {
  constructor() {
    this.canvas = createCanvas(800, 600); // 创建并存储画布对象
    this.splashBorder = 150;
    image(splashImg1, 0, 0, this.canvas.width, this.canvas.height);
    fill(255, 255, 255, 190);
    stroke(255, 255, 0);
    rect(this.splashBorder, this.splashBorder*1.05, this.canvas.width - this.splashBorder * 2, this.canvas.height - this.splashBorder * 1.2);

    fill(255, 255, 0);
    strokeWeight(1);

    stroke(155, 100, 0);
    line(this.canvas.width - this.splashBorder - 40, this.splashBorder + 20, this.canvas.width - this.splashBorder - 20, this.splashBorder + 40);
    line(this.canvas.width - this.splashBorder - 20, this.splashBorder + 20, this.canvas.width - this.splashBorder - 40, this.splashBorder + 40);
    

    this.title = createDiv("Monk Synth");
    this.title.style('color: #565658; font-family: Arial, Helvetica, sans-serif; text-align: center; font-size: 24px; transform: translateX(130%); text-shadow: -0.5px -0.5px 0 #FFC107, 0.5px -0.5px 0 #FFC107, -0.5px 0.5px 0 #FFC107, 0.5px 0.5px 0 #FFC107;');
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);

    this.name = createDiv("Tian Li & Zichen Huang");
    this.name.style('color:#565658; transform: translateX(80%)');
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

    this.info = createDiv("This synthesizer is called Monk Synth, inspired by Zichen who wanted to add a Buddha ASCII art for good luck in coding without bugs. We adopted a Buddhist theme throughout.<p> The synthesizer has two oscillators, each capable of selecting different waveforms and modifying ADSR and frequency. Additionally, each oscillator is equipped with an oscilloscope.<p> We have also hidden two Easter eggs in this synthesizer for you to discover! <p><a href=https://editor.p5js.org/1805318611/sketches/ivbzDqVz1>view code</a>");
    this.info.style('color:#565658');
    this.info.position(this.splashBorder + 20, this.splashBorder + 100);
    this.info.size(this.canvas.width - this.splashBorder * 2 - 50, this.canvas.height - this.splashBorder * 2 - 50);
  }

  update() {
    if (mouseX > this.canvas.width - this.splashBorder - 40 &&
      mouseX < this.canvas.width - this.splashBorder - 20 && mouseY < this.splashBorder + 40 && mouseY > this.splashBorder + 20) {
      return true;
    }
  }

  hide() {
    this.title.remove();
    this.name.remove();
    this.info.remove();
  }
}
