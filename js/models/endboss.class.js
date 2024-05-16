class Endboss extends MoveableObject {
    world;
    x = 2300;
    y = 70;
    width = 200;
    height = 380;
    energy = 100;
    speedY = 25;
    speed = 0;
    acceleration = 0.3;
    offset = {
        top: 140,
        bottom: 30,
        left: 30,
        right: 30
    }
    otherDirection = false;

    IMAGE_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGE_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGE_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGE_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGE_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * load the endboss
     */
    constructor() {
        super().loadImages(this.IMAGE_ANGRY);
        this.loadImages(this.IMAGE_WALK);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
        this.animate();
    }


    /**
     * initiates the animation loop for the end boss.
     */
    endbossFight() {
        this.speed = 10;
        this.setStoppableIntervals(() => {
            if (!this.world.hit) {
                if (this.world.distance < 250) {
                    this.playAttackAnimation();
                } else if (this.world.distance < 1000) {
                    this.animate();
                } else {
                    this.playAngryAnimation();
                }
            } else {
                this.playHurtAnimation();
                setTimeout(() => {
                    this.world.hit = false;
                }, 200);
            }
        }, 250);
    }


    /**
     * moves the end boss towards the character
     */
    moveTowardsCharacter() {
        if (this.world.distance < 600) {
            if (this.x < this.world.character.x) {
                this.otherDirection = true;
            } else if (this.x - 250 > this.world.character.x) {
                this.otherDirection = false;
            }
        }
    }


    /**
     * animate the walking endboss
     */
    animate() {
        if (!this.otherDirection) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
        this.playAnimation(this.IMAGE_WALK);
    }

    /**
     * animate the dead endboss
     */
    playDeadAnimation() {
        this.stopIntervals();
        this.setStoppableIntervals(() => {
            this.y += this.speedY
            this.speedY += this.acceleration;
            this.playAnimation(this.IMAGE_DEAD);
            // this.oneTimeAnimation(this.IMAGE_DEAD, 'img/4_enemie_boss_chicken/5_dead/G26.png');
            setTimeout(() => {
                this.setY();
            }, 100); 
        }, 300);
    }

    /**
     * set the y-position at 800
     */
    setY() {
        setTimeout(() => {
            this.y = 800;
        }, 1000);
    }


    /**
     * animate the hurt endboss
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGE_HURT);
    }


    /**
     * animate the angry endboss
     */
    playAngryAnimation() {
        this.playAnimation(this.IMAGE_ANGRY);
    }

    /**
     * animate the angry endboss
     */
    playAttackAnimation() {
        this.speed += 5;
        this.animate();
        this.playAnimation(this.IMAGE_ATTACK);
    }
}