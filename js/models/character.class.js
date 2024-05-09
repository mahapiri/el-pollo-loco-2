class Character extends MoveableObject {
    world;
    speed = 5;
    y = 155;
    currentTime = new Date().getTime();

    IMAGE_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGE_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGE_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGE_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGE_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGE_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    walking_sound = new Audio('audio/running.mp3');


    /**
     * load the image of the main character
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGE_IDLE);
        this.loadImages(this.IMAGE_LONG_IDLE);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_JUMPING);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGE_HURT);
        this.applyGravity();
        this.animate();
    }


    /**
     * animate the character by walking with sound effects, go to the other direction
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if(!this.dead) {
                    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                        this.moveRight();
                        this.otherDirection = false;
                        this.walking_sound.play();
                    }

                    if (this.world.keyboard.LEFT && this.x > -615) {
                        this.moveLeft();
                        this.otherDirection = true;
                        this.walking_sound.play();
                    }

                    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                        this.jump();
                        this.currentTime = new Date().getTime();
                    }

                    this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGE_DEAD);
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.dead = true;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGE_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGE_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGE_WALKING);
                    this.currentTime = new Date().getTime();
                } else if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT || !this.world.keyboard.SPACE) {
                    this.nothingToDo();
                }
            }
        }, 1000 / 15);
    }


    /**
     * when the character nothing do
     */
    nothingToDo() {
        let timepassed = this.proofTime();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        if (timepassed > 9) {
            this.longWait();
        } else if (timepassed > 3) {
            this.wait();
        }
    }

    /**
     * proof the Time between the actual time and the time where the character is nothing to do 
     */
    proofTime() {
        let time = new Date().getTime();
        let timepassed = time - this.currentTime;
        timepassed = timepassed / 1000;
        return timepassed;
    }


    /**
     * play the wait images 
     */
    wait() {
        this.playAnimation(this.IMAGE_IDLE);
    }


    /**
     * play the long wait images
     */
    longWait() {
        this.playAnimation(this.IMAGE_LONG_IDLE);
    }
}