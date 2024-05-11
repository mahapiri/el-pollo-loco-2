class Bottle extends DrawableObject {
    x;
    y = 340;
    height = 80;
    width = 60;

    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_GROUND);
        this.x = 300 + Math.random() * 1000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 200 + Math.random() * 200);
    }
}