class Chicken extends MoveableObject {
    y = 345;
    width = 60; 
    height = 80;

    /**
     * it will load the chicken and place it to the x position of 200px + random number of 500px
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
    }

}