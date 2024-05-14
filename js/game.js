let canvas;
let canvasWidth;
let canvasHeight;
let world;
let intro;
let keyboard = new Keyboard();
let button = new Button();
let gameStarted = false;
let fullscreenIsOn = false;
let faqIsOn = false;
let deadProofing;


window.addEventListener('load', () => {
    canvas = document.getElementById('canvas');
    getPosition();
    resizeControlpanel();
});

window.addEventListener('resize', getPosition);

function getPosition() {
    setInterval(() => {
        if (canvas) {
            canvasWidth = canvas.offsetWidth;
            canvasHeight = canvas.offsetHeight;
            resizeControlpanel();
        }
    }, 1);

}


/**
 * Initialize the 2D Game
 */
function init() {
        world = new World(canvas, keyboard, button, gameStarted);
        pauseAllIntervals();
        canvasWidth = canvas.offsetWidth;
        canvasHeight = canvas.offsetHeight;
}


/**
 * start the game when pressing the play button
 */
function startGame() {
    if (!gameStarted) {
        button.play = true;
        gameStarted = true;
        document.querySelector('.intro-img').style.display = 'none';
        document.querySelector('.start-btn').style.display = 'none';
    }
    togglePlayMode();
}

function restartGame () {
    location.reload();
}


/**
 * put true if key press
 */
window.addEventListener("keydown", (key) => {
    if (key.which == 38) {
        keyboard.UP = true;
    }

    if (key.which == 39) {
        keyboard.RIGHT = true;
    }

    if (key.which == 40) {
        keyboard.DOWN = true;
    }

    if (key.which == 37) {
        keyboard.LEFT = true;
    }

    if (key.which == 32) {
        keyboard.SPACE = true;
    }

    if (key.which == 68) {
        keyboard.D = true;
        keyboard.currentTime = new Date().getTime();
    }
})


/**
 * put key on false if the key is not pressed
 */
window.addEventListener("keyup", (key) => {
    if (key.which == 38) {
        keyboard.UP = false;
    }

    if (key.which == 39) {
        keyboard.RIGHT = false;
    }

    if (key.which == 40) {
        keyboard.DOWN = false;
    }

    if (key.which == 37) {
        keyboard.LEFT = false;
    }

    if (key.which == 32) {
        keyboard.SPACE = false;
    }

    if (key.which == 68) {
        keyboard.D = false;
    }
})


// documents.getElementById('btnLeft').addEventListener('touchstart', (btn) => {
//     e.preventDefault();
//     keyboard.LEFT = true;
// })

// documents.getElementById('btnLeft').addEventListener('touchend', (btn) => {
//     e.preventDefault();
//     keyboard.LEFT = false;
// })


/**
 * toggle fullscreen mode
 */
function toggleFullscreen() {
    let screen = document.getElementById('main-screen');
    let img = document.getElementById('fullscreen-img');
    if (!fullscreenIsOn) {
        screen.requestFullscreen();
        img.src = 'img/9_intro_outro_screens/exit_fullscreen.png';
    } else {
        img.src = 'img/9_intro_outro_screens/fullscreen.png';
        document.exitFullscreen();
    }
    getPosition();
}


/**
 * check if game is on fullscreen or not to change the border color
 */
window.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenIsOn = true;
        // canvas.style.border = '8px solid black';
        canvas.style.minWidth = '100%';
        canvas.style.maxHeight = '100vh';
    } else {
        fullscreenIsOn = false;
        // canvas.style.border = '8px solid white';
        canvas.style.minWidth = 'unset';
        canvas.style.maxHeight = 'unset';
    }
    getPosition();
})


/**
 * make the control panel responsive
 */
function resizeControlpanel() {
    let controlPanel = document.querySelector('.control-panel');
    let introImg = document.querySelector('.intro-img');
    let overScreen = document.getElementById('game-over-screen');
    let winScreen = document.getElementById('win-screen');
    let title = document.getElementById('title');
    let legal = document.getElementById('legal-div');
    // let mainScreen = document.getElementById('main-screen');

    controlPanel.style.width = (canvasWidth) + 'px';
    controlPanel.style.height = (canvasHeight) + 'px';
    introImg.style.width = (canvasWidth) + 'px';
    introImg.style.height = (canvasHeight) + 'px';
    overScreen.style.width = (canvasWidth) + 'px';
    overScreen.style.height = (canvasHeight) + 'px';
    winScreen.style.width = (canvasWidth) + 'px';
    winScreen.style.height = (canvasHeight) + 'px';
    // mainScreen.style.width = (canvasWidth) + 'px';
    // mainScreen.style.height = (canvasHeight) + 'px';
    // if (canvasWidth < 720 || canvasHeight < 480) {
    //     title.style.display = 'none';
    //     legal.style.display = 'none';
    // } else {
    //     title.style.display = 'block';
    //     legal.style.display = 'block';
    // }
}



/**
 * toggle PlayMode to set the right image
 */
function togglePlayMode() {
    let img = document.getElementById('play-img');

    if (!button.play) {
        if (!gameStarted) {
            startGame();
            setPauseImg(img);
        } else if (gameStarted) {
            world.endbossStart = false;
            pauseAllIntervals();
            setPlayImg(img);
        }
    } else if (button.play) {
        if (gameStarted) {
            playAllIntervals();
        }
        setPauseImg(img);
    }
}


/**
 * set the pause image
 * @param {element} img - element of the image 
 */
function setPauseImg(img) {
    button.play = false;
    img.src = 'img/9_intro_outro_screens/pause.png';
}


/**
 * set the play image
 * @param {element} img - element of the image 
 */
function setPlayImg(img) {
    button.play = true;
    img.src = 'img/9_intro_outro_screens/play.png';
}


/**
 * toggle the sound image
 */
function toggleSoundMode() {
    let img = document.getElementById('sound-img');
    if (button.sound) {
        button.sound = false;
        img.src = 'img/9_intro_outro_screens/sound_on.png';
    } else {
        button.sound = true;
        img.src = 'img/9_intro_outro_screens/sound_off.png';
    }
}


/**
 * proof if character or endboss is dead to display the gameover or win screen
 */
function proofDead() {
    if (gameStarted) {
        if (world.character.dead) {
            setTimeout(() => {
                document.getElementById('game-over-screen').style.display = 'flex';
                document.querySelector('.try-btn').style.display = 'flex';
                clearIntervals();
            }, 3000);
        }

        if (world.level.endboss[0].dead) {
            setTimeout(() => {
                document.getElementById('win-screen').style.display = 'flex';
                document.querySelector('.replay-btn').style.display = 'flex';
                clearIntervals();
            }, 3000);
        }
    }
}


/**
 * proofing if character or endboss is dead
 */
deadProofing = setInterval(() => {
    proofDead();
}, 1000 / 60);


/**
 * toggle the faq site
 */
function toggleFaq() {
    let faq = document.getElementById('faq');
    if (faqIsOn == false) {
        faqIsOn = true;
        faq.style.display = 'block';
    } else {
        faqIsOn = false;
        faq.style.display = 'none';
    }
    setClickable();
    gameMode();
}


/**
 * change the play/pause button if the game is started
 */
function gameMode() {
    if (gameStarted && !button.play) {
        togglePlayMode();
    }
}


/**
 * set the clickable buttons 
 */
function setClickable() {
    let controlPanel = document.querySelector('.control-panel');
    if (faqIsOn == true) {
        controlPanel.style.pointerEvents = 'none';
    } else {
        controlPanel.style.pointerEvents = 'fill';
    }
}


/**
 * stopping all setInterval of all character
 */
function pauseAllIntervals() {
    button.play = false;
    pauseInterval(world.level.enemies);
    pauseInterval(world.level.endboss);
    pauseInterval(world.character);
}


/**
 * stopping the setInterval functions of a character
 * @param {array} array of the character
 */
function pauseInterval(arr) {
    if (arr == world.character) {
        world.character.stoppableIntervals.forEach(id => {
            clearInterval(id);
            return id;
        });
    } else {
        arr.forEach(obj => {
            obj.stoppableIntervals.forEach((id) => {
                clearInterval(id);
                return id;
            });
        });
    }
}


/**
 * start all animate functions
 */
function playAllIntervals() {
    if (gameStarted) {
        world.character.animate();
        startAnimation(world.level.endboss);
        startAnimation(world.level.enemies);
    }
}


/**
 * start all animate functions of the enemy
 * @param {array} array of enemies
 */
function startAnimation(arr) {
    arr.forEach(obj => {
        obj.animate();
    });
}


/**
 * clear all intervals
 */
function clearIntervals() {
    for (let i = 0; i < 9999; i++) window.clearInterval(i);
}