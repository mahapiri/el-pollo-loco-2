class Endboss extends MoveableObject {
    x = 2300;
    y = 95;
    width = 200;
    height = 380;

    IMAGE_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * load the endboss
     */
    constructor() {
        super().loadImages(this.IMAGE_ANGRY);
        this.animate();
    }


    /**
     * animate the angry endboss
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_ANGRY);
        }, 1000 / 10);
    }

}