class ThrowableObject extends MoveableObject {
    height = 80;
    width = 40;

    
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',

    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY =  12;
        this.applyGravity();
        setInterval(() => {
            this.x += 12;
        }, 25);
    }
}