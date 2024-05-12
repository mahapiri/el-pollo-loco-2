let canvas;
let world;
let keyboard = new Keyboard();
let button = new Button();
let intro;
let introStarted = true;
let gameStarted = false;
let fullscreenIsOn = false;
let faqIsOn = false;
let proofing;


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
async function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.querySelector('.start-btn').style.display = 'none';
        world = await new World(canvas, keyboard, button);
        togglePlayMode();
    }
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


/**
 * fullscreen mode
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

}


/**
 * check if game is on fullscreen or not to change the border color
 */
window.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenIsOn = true;
        canvas.style.border = '4px solid black';
        canvas.style.minWidth = '90%';
    } else {
        fullscreenIsOn = false;
        canvas.style.border = '4px solid white';
        canvas.style.minWidth = 'unset';
    }
})


/**
 * toggle PlayMode to set the right image
 */
function togglePlayMode() {
    let img = document.getElementById('play-img');
    if (!button.play) {
        if (!gameStarted) {
            startGame();
            setPauseImg(img);
        } else {
            setPauseImg(img);
        }
    } else {
        setPlayImg(img);
    }
}


/**
 * set the pause image
 * @param {element} img - element of the image 
 */
function setPauseImg(img) {
    button.play = true;
    img.src = 'img/9_intro_outro_screens/pause.png';
}


/**
 * set the play image
 * @param {element} img - element of the image 
 */
function setPlayImg(img) {
    button.play = false;
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
            document.getElementById('game-over-screen').style.display = 'block';
            clearIntervals();
        }

        if (world.level.endboss[0].dead) {
            clearInterval(proofing);
            setTimeout(() => {
                document.getElementById('win-screen').style.display = 'block';
            }, 2500);
            clearIntervals();
        }
    }
}


/**
 * proofing if character or endboss is dead
 */
proofing = setInterval(() => {
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
    setPause();
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
 * set pause of the game
 */
function setPause() {
    if (gameStarted == true && faqIsOn == true) {
        console.log('Spiel Pause');
        stopAllIntervals();
    } else if (gameStarted == true && faqIsOn == false) {
        console.log('spiel start');
    }
}


/**
 * stopping all setInterval of all character
 */
function stopAllIntervals() {
    stopInterval(world.level.enemies);
    stopInterval(world.level.endboss);
    stopInterval(world.character);
}


/**
 * stopping the setInterval functions of a character
 * @param {array} array of the character
 */
function stopInterval(arr) {
    if (arr == world.character) {
        world.character.stoppableIntervals.forEach(clearInterval);
    } else {
        arr.forEach(obj => {
            obj.stoppableIntervals.forEach((index) => {
                clearInterval(index);
            });
        });
    }
}


function startInterval() {
    
}


/**
 * clear all intervals
 */
function clearIntervals() {
    setTimeout(() => {
        for (let i = 0; i < 9999; i++) window.clearInterval(i);
    }, 4000);
}