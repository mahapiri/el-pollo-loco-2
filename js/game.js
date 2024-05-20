let canvas;
let world;
let keyboard = new Keyboard();
let button = new Button();
let gameStarted = false;
let win = null;
let fullscreenIsOn = false;
let faqIsOn = false;
let currentTime;
const WIN_SOUND = new Audio('audio/win.mp3');
const LOST_SOUND = new Audio('audio/lost.mp3');


/**
 * Initialize the 2D Game
 */
function init() {
    initLevel();
    preloadAudio();
    world = new World(canvas, keyboard, button, gameStarted, currentTime);
    pauseAllIntervals();
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
}


/**
 * load all audios
 */
function preloadAudio() {
    WIN_SOUND.load();
    LOST_SOUND.load();
}


/**
 * start the game when pressing the play button
 */
function startGame() {
    if (!gameStarted) {
        currentTime = new Date().getTime();
        button.play = true;
        gameStarted = true;
        document.querySelector('.intro-img').style.display = 'none';
        document.querySelector('.start-btn').style.display = 'none';
    }
    togglePlayMode();
    deadProofing();
}


/**
 * reloaded the page to restart the game
 */
function restartGame() {
    hideEndScreen();
    resetValues();
    setTimeout(() => {
        win = null;
        init();
        startGame();
    }, 1000);
}


/**
 * hide the endscreen of winscreen or lostscreen
 */
function hideEndScreen() {
    if (win == true) {
        document.getElementById('win-screen').style.display = 'none';
        document.querySelector('.replay-btn').style.display = 'none';
    } else if (win == false) {
        document.getElementById('game-over-screen').style.display = 'none';
        document.querySelector('.try-btn').style.display = 'none';
    }
}


/**
 * reset values to play again
 */
function resetValues() {
    gameStarted = false;
    world = null;
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
        characterDead();
        endbossDead();
        endSound();
    }
}


/**
 * proof if character is dead
 */
function characterDead() {
    if (world.character.dead) {
        win = false;
        setTimeout(() => {
            document.getElementById('game-over-screen').style.display = 'flex';
            document.querySelector('.try-btn').style.display = 'flex';
            clearIntervals();
        }, 2000);
    }
}


/**
 * proof if endboss is dead
 */
function endbossDead() {
    if (world.level.endboss.dead) {
        win = true;
        setTimeout(() => {
            document.getElementById('win-screen').style.display = 'flex';
            document.querySelector('.replay-btn').style.display = 'flex';
            clearIntervals();
        }, 2000);
    }
}


/**
 * proof if sound is on to play the end sound
 */
function endSound() {
    if (button.sound) {
        if (win == true) {
            WIN_SOUND.volume = 0.5;
            WIN_SOUND.play();
        } else if (win == false) {
            LOST_SOUND.volume = 0.5;
            LOST_SOUND.play();
        }
    }
}


/**
 * proofing if character or endboss is dead
 */
function deadProofing() {
    setInterval(() => {
        proofDead();
    }, 1000 / 40);
}


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
    pauseInterval(world.level.bottle);
    pauseInterval(world.level.coin);
    pauseInterval(world.level.cloud);
}


/**
 * stopping the setInterval functions of a character
 * @param {array} array of the character
 */
function pauseInterval(arr) {
    if (arr == world.character || arr == world.level.endboss) {
        arr.stoppableIntervals.forEach(id => {
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
        world.level.endboss.animate();
        if (world.firstContact) {
            world.level.endboss.endbossFight();
        }
        startAnimation(world.level.enemies);
        startAnimation(world.level.bottle);
        startAnimation(world.level.coin);
        startAnimation(world.level.cloud);
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