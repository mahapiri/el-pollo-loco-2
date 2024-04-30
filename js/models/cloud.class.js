class Cloud extends MoveableObject {
    x = 400;
    y = 20;
    height = 400;
    width = 480;


    /**
     * load the image of the cloud with the position between 0 and 500 px
     * cloud moving to the left
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.moveLeft();
    }
}