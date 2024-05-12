class Chicken extends MoveableObject {
    y = 345;
    width = 60;
    height = 80;


    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    chicken_sound = new Audio('audio/chicken.mp3');
    sound_volume = 0;
    play_sound = 1000;


    /**
     * it will load the chicken and place it to the x position of 200px + random number of 500px
     * object are moving to the left
     * @param {*} path - image source file
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGE_WALKING);
        this.loadImage(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        // this.playSound();
    }


    /**
     * all images are loading while modular operator is repeating the images
     * 
     */
    animate() {
        this.setStoppableIntervals(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.setStoppableIntervals(() => {
            this.playAnimation(this.IMAGE_WALKING);
        }, 1000 / 10);
    }


    /**
     * play the sound for the chicken
     */
    playSound() {
        setInterval(() => {
            this.chicken_sound.volume = this.sound_volume;
            this.chicken_sound.play();
        }, this.play_sound);
        
    }


    /**
     * set the dead image if the chicken is dead
     */
    isDead() {
        this.dead = true;
        this.img.src = this.IMAGES_DEAD;
        this.speed = 0; 
    }
}