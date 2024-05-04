class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    level = level1;
    character = new Character();
    characterBar = new CharacterBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
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
        new Bottle(400, 335),
        new Bottle(500, 335),
        new Bottle(600, 335),
        new Bottle(700, 335),
        new Bottle(800, 335),
        new Bottle(900, 335),
        new Bottle(1000, 335)
    ];


    /**
     * create a canvas field in 2D
     * draw all objects to the world
     * @param {string} canvas - get the element by id of canvas in game.js
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
        this.addToMap(this.characterBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.coin);
        this.addObjectsToMap(this.bottle);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);


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

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * play the background music + set the volume
     */
    playBackgroundMusic() {
        this.level.background_music[0].play();
        this.level.background_music[0].volume = 1;
    }


    /**
     * 
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectObjects(this.coin);
            this.collectObjects(this.bottle);
        }, 100);
    }


    /**
     * checking if two objects are colliding
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.characterBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * if you press keyboard "D" then it will create a new Bottel to throw.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            this.bottleBar.percentage -= 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 120, this.character.otherDirection);
            this.throwObject.push(bottle);
        }
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


    /**
     * delete the object
     * @param {array} array of coins or bottles 
     * @param {*} object of coins or bottles
     */
    deleteObject(arr, object) {
        delete arr[object];
    }

}