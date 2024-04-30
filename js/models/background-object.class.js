class BackgroundObject extends MoveableObject {
    x = 0;
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
     * it will load the image
     * @param {*} get the image source file
     */
    constructor(path) {
        super().loadImage(path);
    }
}