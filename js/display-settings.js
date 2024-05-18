let canvasWidth;
let canvasHeight;


/**
 * proof if it is a touch device
 * @returns true or false 
 */
function isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches;
}


/**
 * if the site is complete loaded, then clear the white screen and make the compatiablity to the device
 */
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
    canvas = document.getElementById('canvas');
    isTouchDevice();
    resizeControlpanel();
});


/**
 * get the right position by resizing
 */
window.addEventListener('resize', getPosition);


/**
 * get the right position for the device
 */
function getPosition() {
    setInterval(() => {
        if (canvas) {
            canvasWidth = canvas.offsetWidth;
            canvasHeight = canvas.offsetHeight;
            isTouchDevice();
            resizeControlpanel();
        }
    }, 1000 / 60);
}


/**
 * make the control panel responsive
 */
function resizeControlpanel() {
    let controlPanel = document.querySelector('.control-panel');
    let introImg = document.querySelector('.intro-img');
    let overScreen = document.getElementById('game-over-screen');
    let winScreen = document.getElementById('win-screen');
    controlPanel.style.width = (canvasWidth) + 'px';
    controlPanel.style.height = (canvasHeight) + 'px';
    introImg.style.width = (canvasWidth) + 'px';
    introImg.style.height = (canvasHeight) + 'px';
    overScreen.style.width = (canvasWidth) + 'px';
    overScreen.style.height = (canvasHeight) + 'px';
    winScreen.style.width = (canvasWidth) + 'px';
    winScreen.style.height = (canvasHeight) + 'px';
    toggleTouchDashboard();
}


/**
 * toggle touch dashboard
 */
function toggleTouchDashboard() {
    let touchDashboard = document.querySelector('.touch-dashboard');
    let fullscreen = document.getElementById('fullscreen-img');
    if (isTouchDevice()) {
        touchDashboard.style.display = 'flex';
        fullscreen.style.display = 'none';
    } else {
        touchDashboard.style.display = 'none';
        fullscreen.style.display = 'block';
    }
}


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
        canvas.style.minWidth = '100%';
        canvas.style.maxHeight = '100vh';
    } else {
        fullscreenIsOn = false;
        canvas.style.minWidth = 'unset';
        canvas.style.maxHeight = 'unset';
    }
    getPosition();
})
