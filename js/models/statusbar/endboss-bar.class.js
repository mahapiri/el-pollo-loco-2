class EndbossBar extends Statusbar {
    world;
    percentage = 100;
    x;
    y;

    IMAGE = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',

    ]

    constructor() {
        super().loadImages(this.IMAGE);
        this.setPercentage(this.percentage);
        this.setPosition();

    }

    setPosition() {
        setInterval(() => {
            if(typeof this.world !== 'undefined') {
                this.x = this.world.level.endboss[0].x;
                this.y = this.world.level.endboss[0].y - 15;
            }
        }, 10);
    }
}