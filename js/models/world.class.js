class World {
    ctx;
    canvas;
    keyboard;
    button;
    gameStarted;
    camera_x = 0;
    timepassed = true;
    firstContact = false;
    level = level1;
    character = new Character();
    throwObject = [];
    i = 0;
    distance;
    hit = false;


    /**
     * create a canvas field in 2D
     * draw all objects to the world
     * @param {string} canvas - get the element by id of canvas in game.js
     */
    constructor(canvas, keyboard, button, gameStarted) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.button = button;
        this.gameStarted = gameStarted;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * set world to the character
     */
    setWorld() {
        this.character.world = this;
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
        this.addToMap(this.level.endbossBar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
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
        // mo.drawFrame(this.ctx);
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
            this.distance = Math.abs(this.level.endboss.x - this.character.x);
            this.endbossFirstContact();
            this.checkCollisionsEnemies();
            this.checkCollisionsEndboss();
            this.checkThrowObjects();
            this.collectObjects(this.level.coin, this.level.coinBar);
            this.collectObjects(this.level.bottle, this.level.bottleBar);
            this.moveTowardsCharacter();
        }, 100 / 60);
    }

    moveTowardsCharacter() {
        if (this.level.endboss.x < this.character.x) {
            this.level.endboss.otherDirection = true;
        } else {
            this.level.endboss.otherDirection = false;
        }
    }


    endbossFirstContact() {
        if (this.character.x > 200) {
            if (!this.firstContact) {
                this.level.endboss.speed = 10;
                this.firstContact = true;
                this.level.endbossBar.y = 60;
                this.endbossFight();
            }
        }
    }


    /**
     * get the right function when the endboss was hitting
     * @param {array} j - position of the array 
     */
    hitEndboss() {
        if (this.level.endbossBar.percentage <= 0) {
            this.endbossIsDead();
        }
        this.setEndbossHealth();
    }


    endbossFight() {
        setInterval(() => {
            console.log(this.hit);
            if (!this.hit) {
                // this.level.endboss.stopIntervals();
                if (this.distance < 250) {
                    this.level.endboss.playAttackAnimation();
                } else if (this.distance < 1000) {
                    this.level.endboss.animate();
                } else {
                    this.level.endboss.playAngryAnimation();
                }
            } else {
                this.level.endboss.playHurtAnimation();
                setTimeout(() => {
                    this.hit = false;
                }, 1500);
            }
        }, 300);
    }

    // this.level.endboss.playHurtAnimation();
    // this.level.endboss.playAngryAnimation();

    endbossIsDead() {
        this.level.endboss.dead = true;
        this.level.endboss.isDead();
        this.level.endboss.playDeadAnimation();
    }


    setEndbossHealth() {
        this.level.endboss.hit();
        this.level.endbossBar.setPercentage(this.level.endboss.energy);
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
                this.character.x -= 10;
                this.character.hit();
                this.level.characterBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * check the collision of the endboss
     */
    checkCollisionsEndboss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.level.characterBar.setPercentage(this.character.energy);
        }
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
            this.level.bottleBar.percentage -= 10;
            this.level.bottleBar.setPercentage(this.level.bottleBar.percentage);
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 120, this.character.otherDirection);
            this.throwObject.push(bottle);
            bottle.throw();
        }

        this.throwObject.forEach((bottle, i) => {
            if (bottle.isColliding(this.level.endboss) && !this.hit) {
                this.hit = true;
                bottle.hit(bottle.x, bottle.y);
                this.hitEndboss();
                setTimeout(() => {
                    this.deleteObject(this.throwObject, i);
                }, 250);
            }
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
            this.level.bottleBar.percentage += 10;
            this.level.bottleBar.setPercentage(this.level.bottleBar.percentage);
        }
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