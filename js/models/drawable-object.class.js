class DrawableObject {
    x = 100;
    y = 50;
    width = 100;
    height = 280;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    /**
     * drawing the objects
     * @param {*} ctx - canvas
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Failed to load', e);
            console.log('Image Fail', this.img.src);
        }

    }


    /** 
     * is drawing a frame 
     * @param {string} ctx - our data of the canvas
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * drawing the frame
     * @param {*} ctx - get the ctx of the canvas 
     */
    drawFrameRed(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
            let frameX = this.x + this.offset.left;
            let frameY = this.y + this.offset.top;
            let frameWidth = this.width - this.offset.left - this.offset.right;
            let frameHeight = this.height - this.offset.top - this.offset.bottom;
            
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(frameX, frameY, frameWidth, frameHeight);
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

    
    /**
     * play all images to create a anmimation but only once time
     * @param {path} image path
     */
    oneTimeAnimation(image, endImg) {
        for (let i = 0; i < image.length; i++) {
            let path = image[i];
            this.img = this.imageCache[path];
        }
        this.loadImage(endImg);
    }
}