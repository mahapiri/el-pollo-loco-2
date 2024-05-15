class ThrowableObject extends MoveableObject {
    height = 80;
    width = 40;
    otherDirection = false;
    throwInterval;
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

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.setX();
    }


    /**
     * set the x position of the bottle
     */
    setX() {
        if(this.otherDirection) {
            this.x = this.x - 60;
        }
    }


    /**
     * validate which direction and then throw the object
     */
    throw() {
        this.speedY =  6;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if(this.otherDirection) {
                this.x -= 80;
            } else {
                this.x += 80; 
            }
            this.playAnimation(this.BOTTLE_ROTATION);
        }, 50);
    }


    /**
     * play the splash animation of the bottle when hitting
     * @param {number} x position of the endboss
     * @param {number} y position of the endboss
     */
    hit(x, y) {
        clearInterval(this.throwInterval);
        clearInterval(this.gravity);
        this.x = x;
        this.y = y;
        this.speedY = 0;
        this.speed = 0;
        this.playAnimation(this.BOTTLE_SPLASH);
    }
    
}