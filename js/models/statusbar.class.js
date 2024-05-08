class Statusbar extends DrawableObject {
    x = 30;
    y;
    width = 200;
    height = 50;
    percentage = 0;
    path;

    IMAGE = [];

    constructor() {
        super();
    }


    /**
     * set the percentage to get the path for the image array. 
     * @param {number} percentage - percentage of the character
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGE[this.resolvePercentage()];
        this.img = this.imageCache[path];

    }


    /**
     * returns the number for the percentage img
     * @returns 
     */
    resolvePercentage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}