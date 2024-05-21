class ThrowableObject extends MoveableObject {
    height = 80;
    width = 40;
    otherDirection = false;
    throwInterval;
    rotation;
    acceleration = 0.10;
    speedY = 3;
    i = 0;


    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',

    ];

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    throwing_sound = new Audio('audio/throw.mp3');
    splashing_sound = new Audio('audio/glass.mp3');


    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.preloadImages();
        this.preloadAudio();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.setX();
    }


    /**
     * preload Images
     */
    preloadImages() {
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
    }


    /**
     * preload Audio
     */
    preloadAudio() {
        this.throwing_sound.load();
        this.splashing_sound.load();
    }


    /**
     * set the x position of the bottle
     */
    setX() {
        if (this.otherDirection) {
            this.x = this.x - 60;
        }
    }


    /**
     * validate which direction and then throw the object
     */
    throw() {
        this.playSound(this.throwing_sound, 0.5);
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x -= 200;
            } else {
                this.x += 200;
            }

        }, 200);
        this.rotation = setInterval(() => {
            this.playAnimation(this.BOTTLE_ROTATION);
        }, 70);
    }


    /**
     * play the splash animation of the bottle when hitting
     * @param {number} x position of the endboss
     * @param {number} y position of the endboss
     */
    hit(x, y) {
        clearInterval(this.throwInterval);
        clearInterval(this.rotation);
        clearInterval(this.gravity);
        this.x = x;
        this.y = y;
        this.speedY = 0;
        this.speed = 0;
        this.playAnimation(this.BOTTLE_SPLASH);
        this.playSound(this.splashing_sound, 0.5);
    }
}