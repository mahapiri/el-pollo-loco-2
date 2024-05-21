class Keyboard {
    RIGHT = false;
    DOWN = false;
    LEFT = false;
    SPACE = false;
    D = false;
    currentTime = 0;

    constructor() {
        this.keyEvents();
        this.touchEvents();
    }


    /**
    * put key on true if pressed or
    * put key on false if the key is not pressed
    */
    keyEvents() {
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
    }


    /**
    * check event on touch
    */
    touchEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = [
                { id: 'btnLeft', key: 'LEFT' },
                { id: 'btnRight', key: 'RIGHT' },
                { id: 'btnUp', key: 'SPACE' },
                { id: 'btnThrow', key: 'D' }
            ];

            buttons.forEach(button => {
                let element = document.getElementById(button.id);
                if (element) {
                    element.addEventListener('touchstart', (e) => {
                        if (e.cancelable) {
                            e.preventDefault();
                        }
                        keyboard[button.key] = true;
                    }, { passive: false });

                    element.addEventListener('touchend', (e) => {
                        if (e.cancelable) {
                            e.preventDefault();
                        }
                        keyboard[button.key] = false;
                    }, { passive: false });
                }
            });
        });
    }
}
