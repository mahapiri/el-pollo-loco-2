class Intro extends DrawableObject{
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    canvas; 
    ctx;
    keyboard; 

    INTRO = 'img/9_intro_outro_screens/start/startscreen_1.png';

    constructor(canvas, keyboard) {
        super().loadImage(this.INTRO);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.img.onload = this.draw.bind(this);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}