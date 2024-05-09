class World {
    ctx;
    canvas;
    keyboard;
    button;
    camera_x = 0;
    timepassed = -1100;
    level = level1;
    character = new Character();
    bottleBar = new BottleBar();
    characterBar = new CharacterBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    endbossBar = new EndbossBar();

    throwObject = [];
    coin = [
        new Coin(400, 300),
        new Coin(500, 300),
        new Coin(600, 300),
        new Coin(700, 300),
        new Coin(800, 300),
        new Coin(900, 300),
        new Coin(1000, 300),
        new Coin(1100, 300),
    ];
    bottle = [
        new Bottle(400, 340),
        new Bottle(500, 340),
        new Bottle(600, 340),
        new Bottle(700, 340),
        new Bottle(800, 340),
        new Bottle(900, 340),
        new Bottle(1000, 340)
    ];


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
        this.addToMap(this.bottleBar);
        this.addToMap(this.characterBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.coin);
        this.addObjectsToMap(this.bottle);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
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
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectObjects(this.coin);
            this.collectObjects(this.bottle);
        }, 10);
    }


    /**
     * checking if two objects are colliding
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingUp(enemy) || enemy.dead) {
                enemy.isDead();
                this.character.jump(5);
                setTimeout(() => {
                    this.deleteObject(this.level.enemies, i)
                }, 500);
            } else if (this.character.isColliding(enemy) && !this.character.isCollidingUp(enemy)) {
                this.character.hit();
                this.characterBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * if you press keyboard "D" then it will create a new Bottel to throw.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0 && this.timepassed) {
            this.timepassed = false;
            setTimeout(() => {
                return this.timepassed = true;
            }, 300);
            this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
            this.bottleBar.percentage -= 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
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
    collectObjects(arr) {
        arr.forEach((object, i) => {
            if (this.character.isColliding(object)) {
                this.addObject(object);
                this.deleteObject(arr, i);
            }
        })
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
        if (this.coinBar.percentage >= 100) {
            this.coinBar.percentage = 100;
        } else {
            this.coinBar.percentage += 20;
            this.coinBar.setPercentage(this.coinBar.percentage);
        }
    }


    /**
     * add bottles to the bottle bar
     */
    addBottle() {
        if (this.bottleBar.percentage >= 100) {
            this.bottleBar.percentage = 100;
        } else {
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
        }
    }

    hitEndboss(j) {
        if (this.endbossBar.percentage <= 0) {
            this.level.endboss[0].dead = true;
            this.level.endboss[0].energy = 0;
            this.level.endboss[0].playDeadAnimation();
            setTimeout(() => {
                this.deleteObject(this.level.endboss, j);
            }, 4000);
        } else {
            this.level.endboss[0].energy -= 40;
            this.endbossBar.percentage -= 40;
            this.endbossBar.setPercentage(this.endbossBar.percentage);
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