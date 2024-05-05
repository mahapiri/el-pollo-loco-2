class Intro extends DrawableObject {
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
        this.drawPlayButton(150, 60);
    }


    drawPlayButton(width, height) {
        this.ctx.save(); // Aktuellen Zustand des Zeichenkontexts speichern
        this.drawShadow(); // Schatten setzen
        this.ctx.fillStyle = '#FF9600'; // Button-Farbe setzen
        let buttonX = 285;
        let buttonY = 40;
        let buttonWidth = width;
        let buttonHeight = height;
        let cornerRadius = 10;
    
        // Button-Rechteck mit abgerundeten Ecken zeichnen
        this.ctx.beginPath();
        this.ctx.moveTo(buttonX + cornerRadius, buttonY);
        this.ctx.arcTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + buttonHeight, cornerRadius);
        this.ctx.arcTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX, buttonY + buttonHeight, cornerRadius);
        this.ctx.arcTo(buttonX, buttonY + buttonHeight, buttonX, buttonY, cornerRadius);
        this.ctx.arcTo(buttonX, buttonY, buttonX + buttonWidth, buttonY, cornerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    
        // Rand um den Button zeichnen
        this.ctx.strokeStyle = '#FF8D37'; // Randfarbe setzen
        this.ctx.lineWidth = 1; // Linienbreite setzen
        this.ctx.stroke();
    
        // Text im Button zeichnen
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; // Schatten für Text deaktivieren
        this.ctx.fillStyle = '#ffffff'; // Textfarbe setzen
        this.ctx.font = '32px Boogaloo';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('START', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    
        this.ctx.restore(); // Zurück zum vorherigen Zustand des Zeichenkontexts
    }
    
    drawShadow() {
        // Schatten-Eigenschaften setzen
        this.ctx.shadowBlur = 10; // Unschärfe des Schattens
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.25)'; // Farbe des Schattens
        this.ctx.shadowOffsetX = 0; // Horizontaler Offset des Schattens
        this.ctx.shadowOffsetY = 0; // Vertikaler Offset des Schattens
    }
    
}