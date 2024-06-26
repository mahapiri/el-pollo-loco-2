class EndbossBar extends Statusbar {
    percentage = 100;
    x = 510;
    y = -60;

    IMAGE = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]


    /**
     * load image of the endboss bar and invalidate the percentage of it
     */
    constructor() {
        super().loadImages(this.IMAGE);
        this.setPercentage(this.percentage);
    }
}