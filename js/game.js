let canvas;
let world;


/**
 * Initialize the 2D Game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}