class Cloud extends MoveableObject {
    x = 40;
    y = 50;
    height = 100;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
    }
}