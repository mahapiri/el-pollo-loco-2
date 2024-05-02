class MoveableObject extends DrawableObject {
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;


    /**
     * when characte is in the air, then character will automatically come down
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * 
     * @returns check if character is above ground
     */
    isAboveGround() {
        return this.y < 150;
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


    // /**
    //  * detect if two objects are colliding
    //  * @param {string} obj - object
    //  * @returns 
    //  */
    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height); //&&
    //         // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }


    /**
     * proof it two characte are colliding
     * @param {object} mo - get the moveableobject
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }
}