class Endboss extends MoveableObject {
    x = 2300;
    y = 70;
    width = 200;
    height = 380;
    energy = 100;
    speedY = 1;
    acceleration = 1;
    walking;
    hurting;
    angry;
    offset = {
        top: 70,
        bottom: 30,
        left: 30,
        right: 30
    }

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
        this.speed = 0.75 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * animate the walking endboss
     */
    animate() {
        this.loadImage('img/4_enemie_boss_chicken/1_walk/G2.png');

        // this.setStoppableIntervals(() => {
        //     this.playAnimation(this.IMAGE_WALK);
        // }, 1000 / 3);
    }

    walk() {
        this.setStoppableIntervals(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGE_WALK);
        }, 1000 / 3);
    }


    /**
     * animate the dead endboss
     */
    playDeadAnimation() {
        this.y = 85;
        this.stopIntervals();
        this.setStoppableIntervals(() => {
            this.y += this.speedY
            this.speedY += this.acceleration;
            this.playAnimation(this.IMAGE_DEAD);
        }, 700);
    }


    /**
     * animate the hurt endboss
     */
    playHurtAnimation() {
        this.stopIntervals();
        this.setStoppableIntervals(() => {
            this.playAnimation(this.IMAGE_HURT);
        }, 1000 / 10);
    }


    /**
     * animate the angry endboss
     */
    playAngryAnimation() {
        this.stopIntervals();
        this.setStoppableIntervals(() => {
            this.playAnimation(this.IMAGE_ANGRY);
        }, 1000 / 2);
    }
}