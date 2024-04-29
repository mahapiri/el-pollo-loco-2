class MoveableObject {
    x = 100;
    y = 150;
    width = 100; 
    height = 280;
    img;

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