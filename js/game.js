let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initialize the 2D Game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}


/**
 * put true if key press
 */
window.addEventListener('keydown', (key) => {
    if(key.keycode == 38) {
        keyboard.UP = true;
    }

    if(key.keycode == 39) {
        keyboard.RIGHT = true;
    }

    if(key.keycode == 40) {
        keyboard.DOWN = true;
    }

    if(key.keycode == 37) {
        keyboard.LEFT = true;
    }

    if(key.keycode == 32) {
        keyboard.SPACE = true;
    }

    if(key.keycode == 68) {
        keyboard.D = true;
    }
})


/**
 * put key on false if the key is not pressed
 */
window.addEventListener('keyup', (key) => {
    if(key.keycode == 38) {
        keyboard.UP = false;
    }

    if(key.keycode == 39) {
        keyboard.RIGHT = false;
    }

    if(key.keycode == 40) {
        keyboard.DOWN = false;
    }

    if(key.keycode == 37) {
        keyboard.LEFT = false;
    }

    if(key.keycode == 32) {
        keyboard.SPACE = false;
    }

    if(key.keycode == 68) {
        keyboard.D = false;
    }
})