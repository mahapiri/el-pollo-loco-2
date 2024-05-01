class MoveableObject {
    x = 100;
    y = 50;
    width = 100;
    height = 280;
    img;
    speed;
    imageCache = {

    };
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;


    applyGravity() {
            setInterval(() => {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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


    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * object will move to the right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * object will move to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     *  jump function with a speedy = 20
    */
    jump() {
        this.speedY = 20;
    }
}