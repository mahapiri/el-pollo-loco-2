class CharacterBar extends Statusbar {
    percentage = 100;
    y = 45;

    IMAGE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', // 1
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

    constructor() {
        super().loadImages(this.IMAGE);
        this.setPercentage(this.percentage);
    }
}