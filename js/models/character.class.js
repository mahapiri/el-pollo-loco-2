class Character extends MoveableObject {
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
            let i = this.currentImage % this.IMAGE_WALKING.length;
            let path = this.IMAGE_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 120);
    }



    /**
     * jump function
     */
    jump() {

    }
}