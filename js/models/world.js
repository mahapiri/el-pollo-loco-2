class World {
    ctx;
    canvas;
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
    ];
    cloud = new Cloud();
    background = new BackgroundObject();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        })
        this.ctx.drawImage(this.cloud.img, this.cloud.x, this.cloud.y, this.cloud.width, this.cloud.height);
        this.ctx.drawImage(this.background.img, this.background.x, this.background.y, this.background.width, this.background.height);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        })
    }
}