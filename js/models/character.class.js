class Character extends MoveableObject {
    world;
    speed = 5;

    IMAGE_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    /**
     * load the image of the main character
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGE_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGE_WALKING.length;
                let path = this.IMAGE_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 1000 / 25);
    }



    /**
     * jump function
     */
    jump() {

    }
}