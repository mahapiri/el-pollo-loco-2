class Bottle extends DrawableObject {
    x;
    y;
    height = 80;
    width = 60;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
    }
}