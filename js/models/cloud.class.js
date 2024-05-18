class Cloud extends MoveableObject {
    x = 400;
    y = 0;
    height = 400;
    width = 480;

    IMAGE = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png',
    ]


    /**
     * load the image of the cloud with the position between 0 and 500 px
     * cloud moving to the left
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }


    /**
     * animate the movement of the cloud
     */
    animate() {
        this.setStoppableIntervals(() => {
            this.moveLeft();
            this.changeX();
        }, 25);
    }


    /**
     * change the x position at -1440 to 480 * 7
     */
    changeX() {
        if (this.x == -1440) {
            this.x = 480 * 7;
        }
    }
}