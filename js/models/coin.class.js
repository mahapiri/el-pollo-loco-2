class Coin extends DrawableObject {
    x;
    y;
    height = 140;
    width = 140;

    IMAGE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE);
        this.animate();
        this.x = x;
        this.y = y;
    }


    /**
     * play the animation for the coin icon
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE); 
        }, 250);
    }
}