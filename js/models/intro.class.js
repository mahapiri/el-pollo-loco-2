class Intro extends DrawableObject{
    canvas;
    ctx;
    keyboard;
    background = new Background();


    constructor(canvas, keyboard) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
    }


    /**
     * draw the objects to the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.background);


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
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
    }

}