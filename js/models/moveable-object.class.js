class MoveableObject {
    x = 100;
    y = 150;
    width = 100;
    height = 280;
    img;
    speed;
    imageCache = {

    };
    currentImage = 0;
    speed = 0.2;


    /**
     * it will generate a new Image
     * @param {string} path - here you can put your path from your img file 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * load images of an array to push to imageCach
     * @param {array} arr - array of the image source files 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image(); // <img src="">
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    /**
     * object will move to the right
     */
    moveRight() {
        console.log('Moving Right');
    }


    /**
     * object will move to the left
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}