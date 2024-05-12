class World {
    ctx;
    canvas;
    keyboard;
    button;
    camera_x = 0;
    timepassed = -1100;
    level = level1;
    character = new Character();
    throwObject = [];


    /**
     * create a canvas field in 2D
     * draw all objects to the world
     * @param {string} canvas - get the element by id of canvas in game.js
     */
    constructor(canvas, keyboard, button) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.button = button;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * set world to the character
     */
    setWorld() {
        this.character.world = this;
        this.level.endbossBar.world = this;
    }


    /**
     * 1. Clear the canvas
     * 2. Add all Objects to the Canvas
     * 3. Draw all objects to the canvas depending of the graphic performance
     */
    draw() {
        // this.playBackgroundMusic();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.cloud);


        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.level.bottleBar);
        this.addToMap(this.level.characterBar);
        this.addToMap(this.level.coinBar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addToMap(this.level.endbossBar);
        this.addObjectsToMap(this.throwObject);


        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        })
    }


    /**
     * draw the image for each object in an array
     * @param {array} object - get the array of the object
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * draw the image
     * @param {array} mo - get the object 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameRed(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * 1. save context
     * 2. Move to mo.width
     * 3. 
     * @param {*} mo - object of moveableobject 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * it will flip the image with the same x position
     * @param {*} mo  - object of moveableobejct
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * play the background music + set the volume
     */
    playBackgroundMusic() {
        if (!this.button.sound || this.character.dead) {
            this.level.background_music[0].pause();
        } else {
            this.level.background_music[0].play();
            this.level.background_music[0].volume = 1;
        }
    }


    /**
     * it will check if character is colliding with enemy, bottle or coin
     * start to throw the bottle
     * collecting bottle or coin
     */
    run() {
        setInterval(() => {
            this.checkCollisionsEnemies();
            this.checkCollisionsEndboss();
            this.checkThrowObjects();
            this.collectObjects(this.level.coin, this.level.coinBar);
            this.collectObjects(this.level.bottle, this.level.bottleBar);
        }, 1);
    }


    /**
     * checking if two objects are colliding
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingUp(enemy) || enemy.dead) {
                enemy.isDead();
                this.character.jump(5);
                setTimeout(() => {
                    this.deleteObject(this.level.enemies, i)
                }, 500);
            } else if (this.character.isColliding(enemy) && !this.character.isCollidingUp(enemy)) {
                this.character.hit();
                this.level.characterBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * check the collision of the endboss
     */
    checkCollisionsEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.level.characterBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * if you press keyboard "D" then it will create a new Bottel to throw.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.level.bottleBar.percentage > 0 && this.timepassed) {
            this.timepassed = false;
            setTimeout(() => {
                return this.timepassed = true;
            }, 300);
            this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
            this.level.bottleBar.percentage -= 20;
            this.level.bottleBar.setPercentage(this.level.bottleBar.percentage);
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 120, this.character.otherDirection);
            this.throwObject.push(bottle);
            bottle.throw();
        }

        this.throwObject.forEach((bottle, i) => {
            this.level.endboss.forEach((endboss, j) => {
                if (bottle.isColliding(endboss)) {
                    bottle.hit(bottle.x, bottle.y);
                    this.hitEndboss(j);
                    setTimeout(() => {
                        this.deleteObject(this.throwObject, i);
                    }, 500);
                }
            });
        });
    }


    /**
     * collect the object and delete the collected object
     * @param {array} arr - array of the collectable object
     */
    collectObjects(arr, bar) {
        if (bar.percentage < 100) {
            arr.forEach((object, i) => {
                if (this.character.isColliding(object)) {
                    this.addObject(object);
                    this.deleteObject(arr, i);
                }
            })
        }
    }


    /**
     * Add Coins or Bottles 
     * @param {*} object of the class Coin or Bottle
     */
    addObject(object) {
        if (object instanceof Coin) {
            this.addCoin();
        } else if (object instanceof Bottle) {
            this.addBottle();
        }
    }


    /**
     * add coins to the coin bar 
     */
    addCoin() {
        if (this.level.coinBar.percentage >= 100) {
            this.level.coinBar.percentage = 100;
        } else {
            this.level.coinBar.percentage += 10;
            this.level.coinBar.setPercentage(this.level.coinBar.percentage);
        }
    }


    /**
     * add bottles to the bottle bar
     */
    addBottle() {
        if (this.level.bottleBar.percentage >= 100) {
            this.level.bottleBar.percentage = 100;
        } else {
            this.level.bottleBar.percentage += 20;
            this.level.bottleBar.setPercentage(this.level.bottleBar.percentage);
        }
    }


    /**
     * get the right function when the endboss was hitting
     * @param {*} j - position of the array 
     */
    hitEndboss(j) {
        if (this.level.endbossBar.percentage <= 0) {
            this.level.endboss[0].dead = true;
            this.level.endboss[0].energy = 0;
            this.level.endboss[0].playDeadAnimation();
            // setTimeout(() => {
            //     this.deleteObject(this.level.endboss, j);
            //     this.deleteObject(this.level.endbossBar);
            // }, 4000);
        } else if (this.level.endbossBar.percentage > 0) {
            this.level.endboss[0].playHurtAnimation();
            setTimeout(() => {
                this.level.endboss[0].playAngryAnimation();
            }, 1500);
        }
        this.level.endboss[0].energy -= 10;
        this.level.endbossBar.percentage -= 10;
        this.level.endbossBar.setPercentage(this.level.endbossBar.percentage);
    }


    /**
     * delete the object
     * @param {array} array of coins or bottles 
     * @param {*} object of coins or bottles
     */
    deleteObject(arr, object) {
        delete arr[object];
    }

}