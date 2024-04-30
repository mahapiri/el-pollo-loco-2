class Chicken extends MoveableObject {
    y = 345;
    width = 60;
    height = 80;

    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
     * it will load the chicken and place it to the x position of 200px + random number of 500px
     * object are moving to the left
     * @param {*} path - image source file
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGE_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGE_WALKING.length;
            let path = this.IMAGE_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }
}