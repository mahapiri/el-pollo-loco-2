class MoveableObject {
    x;
    y;
    img;
    height;
    width;

    /**
     * it will generate a new Image
     * @param {path} here you can put your path from your img file 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {
        
    }
}