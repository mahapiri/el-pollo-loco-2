class CoinBar extends Statusbar {
    y = 85;

    IMAGE = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]


    /**
     * load image of the coinbar bar and invalidate the percentage of it
     */
    constructor() {
        super().loadImages(this.IMAGE);
        this.setPercentage(this.percentage);
    }
}