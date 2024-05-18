class DrawableObject {
    x = 100;
    y = 50;
    width = 100;
    height = 280;
    img;
    imageCache = {};
    stoppableIntervals = [];
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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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


    /**
    * play the sound
    */
    playSound(file, volume) {
        if (button.sound) {
            file.volume = volume;
            file.play();
        } else {
            file.pause();
        }
    }


    /**
    * push all stoppable setinterval functions
    * @param {function} fn function name for the setInterval
    * @param {number} time interval
    */
    setStoppableIntervals(fn, time) {
        let id = setInterval(fn, time);
        this.stoppableIntervals.push(id);
    }


    /**
     * stop the setInterval
     */
    stopIntervals() {
        this.stoppableIntervals.forEach(clearInterval);
    }
}