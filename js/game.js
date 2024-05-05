let canvas;
let world;
let keyboard = new Keyboard();
let intro;
let introStarted = true;
let gameStarted = false;


/**
 * Initialize the 2D Game
 */
function init() {
    canvas = document.getElementById('canvas');
    showIntro();
}


/**
 * show the Intro to start the game
 */
function showIntro() {
    if (introStarted && !gameStarted) {
        intro = new Intro(canvas, keyboard);
    }
}


/**
 * start the game when pressing the play button
 */
function startGame() {
    if (!gameStarted) {
        world = new World(canvas, keyboard);
        gameStarted = true;
    }
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


/**
 * fullscreen mode
 */
function fullscreen() {
    canvas.requestFullscreen();
}


/**
 * check if game is on fullscreen or not to change the border color
 */
window.addEventListener('fullscreenchange', () => {
    if(document.fullscreenElement) {
        canvas.style.border = '4px solid black';
    } else {
        canvas.style.border = '4px solid white';
    }
})

