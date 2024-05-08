class Background extends DrawableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    IMAGE = 'img/9_intro_outro_screens/start/startscreen_2.png';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}