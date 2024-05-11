class Level {
    enemies;
    cloud;
    backgroundObject;
    endboss;
    bottleBar;
    characterBar;
    coinBar;
    endbossBar;
    coin;
    bottle;
    level_end_x = 720 * 3;
    background_music;
    world;

    constructor(enemies, endboss, cloud, backgroundObject, background_music, bottleBar, characterBar, coinBar, endbossBar, coin, bottle) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.cloud = cloud;
        this.backgroundObject = backgroundObject;
        this.background_music = background_music;
        this.bottleBar = bottleBar;
        this.characterBar = characterBar;
        this.coinBar = coinBar;
        this.endbossBar = endbossBar;
        this.coin = coin;
        this.bottle = bottle;
    }
}