class MoveableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    dead = false;


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
     * @returns check if character is above ground expect Throwable Object
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
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
    jump(speedY) {
        this.speedY = speedY;
    }


    // /**
    //  * detect if two objects are colliding
    //  * @param {string} obj - object
    //  * @returns 
    //  */
    // isColliding(mo) {
    //     return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    // }

    isCollidingUp(mo) {
        return this.y + this.height >= mo.y && 
            this.y + this.height <= mo.y + mo.height && 
            this.x < mo.x + mo.width && 
            this.x + this.width > mo.x;
    }



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


    /**
     * reduce the energy level by hitting
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * get the boolean value by hurting
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * returns the energy level by 0 when the character is dead
     * @returns 
     */
    isDead() {
        return this.energy == 0;
    }
}