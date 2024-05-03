class DrawableObject {
    x = 100;
    y = 50;
    width = 100;
    height = 280;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * drawing the objects
     * @param {*} ctx - canas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /** 
     * is drawing a frame 
     * @param {string} ctx - our data of the canvas
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


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
     * play all images to create a animation
     * @param {array} image - array of images
     */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}