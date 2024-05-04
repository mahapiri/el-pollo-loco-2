class ThrowableObject extends MoveableObject {
    height = 80;
    width = 40;
    otherDirection = false;

    
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',

    ];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.throw();
        this.setX();
    }


    /**
     * set the x position of the bottle
     */
    setX() {
        if(this.otherDirection) {
            this.x = this.x - 60;
        }
    }


    /**
     * validate which direction and then throw the object
     */
    throw() {
        this.speedY =  12;
        this.applyGravity();
        setInterval(() => {
            if(this.otherDirection) {
                this.x -= 20;
            } else {
                this.x += 20; 
            }
        }, 25);
    }
}