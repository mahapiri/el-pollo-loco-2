class BackgroundObject extends MoveableObject {
    y = 0;
    width = 720;
    height = 480;

    IMG_BACKGROUND = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/1_first_layer/1.png'
    ];


    /**
     * load all background images and set the position to x
     * @param {string} path - get the image source file
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
    }
}