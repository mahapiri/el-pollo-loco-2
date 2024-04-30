let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initialize the 2D Game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * put true if key press
 */
window.addEventListener("keydown", (key) => {
    if(key.which == 38) {
        keyboard.UP = true;
    }

    if(key.which == 39) {
        keyboard.RIGHT = true;
    }

    if(key.which == 40) {
        keyboard.DOWN = true;
    }

    if(key.which == 37) {
        keyboard.LEFT = true;
    }

    if(key.which == 32) {
        keyboard.SPACE = true;
    }

    if(key.which == 68) {
        keyboard.D = true;
    }
})


/**
 * put key on false if the key is not pressed
 */
window.addEventListener("keyup", (key) => {
    if(key.which == 38) {
        keyboard.UP = false;
    }

    if(key.which == 39) {
        keyboard.RIGHT = false;
    }

    if(key.which == 40) {
        keyboard.DOWN = false;
    }

    if(key.which == 37) {
        keyboard.LEFT = false;
    }

    if(key.which == 32) {
        keyboard.SPACE = false;
    }

    if(key.which == 68) {
        keyboard.D = false;
    }
})