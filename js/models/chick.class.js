class Chick extends Chicken {
    y = 370;
    width = 40;
    height = 60;


    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    chicken_sound = new Audio('audio/chick.mp3');
    sound_volume = 0;
    play_sound = 2000;


    /**
     * load chick
     * position x to the canvas
     * move left with the animate images of the chick
     * play sound for the chick
     */
    constructor() {
        super().loadImages(this.IMAGE_WALKING);
        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        // this.playSound();
    }
}