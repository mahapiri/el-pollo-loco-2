class Coin extends DrawableObject {
    x;
    y;
    height = 140;
    width = 140;
    offset = {
        top: 45,
        bottom: 45,
        left: 45,
        right: 45
    }

    IMAGE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE);
        this.animate();
        this.x = 300 + Math.random() * 1500;
        this.y = 100 + Math.random() * 100;
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