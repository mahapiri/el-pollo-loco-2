class Bottle extends DrawableObject {
    x;
    y = 340;
    height = 80;
    width = 60;
    offset = {
        top: 20,
        bottom: 10,
        left: 20,
        right: 20
    }

    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * load the bottle image and place it to a random position
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_GROUND);
        // this.x = 400 + Math.random() * 1500;
        this.x = 150;
        this.animate();
    }


    /**
     * animate the bottle on ground
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 200 + Math.random() * 200);
    }
}