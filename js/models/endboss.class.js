class Endboss extends MoveableObject {
    x = 400;
    y = 70;
    width = 200;
    height = 380;
    energy = 100;
    speedY = 25;
    speed = 1;
    acceleration = 0.2;
    walking;
    hurting;
    angry;
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
     * animate the walking endboss
     */
    animate() {
        if(!this.otherDirection) {
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
        // this.setStoppableIntervals(() => {
        this.y += this.speedY
        this.speedY += this.acceleration;
        this.oneTimeAnimation(this.IMAGE_DEAD, 'img/4_enemie_boss_chicken/5_dead/G26.png');
        this.setY();
        // }, 1000 / 2);
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
        this.stopIntervals();
        this.playAnimation(this.IMAGE_ANGRY);
    }

    /**
     * animate the angry endboss
     */
    playAttackAnimation() {
        let i = 0;
        this.speed += 3.75 + Math.random() * 0.5;
        this.moveLeft();
        if (i < 2) {
            this.playAnimation(this.IMAGE_ATTACK);
            i++;
        }
    }

}