class Level {
    enemies;
    cloud;
    backgroundObject;
    endboss;
    level_end_x = 720 * 3;
    background_music;

    constructor(enemies, endboss, cloud, backgroundObject, background_music) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.cloud = cloud;
        this.backgroundObject = backgroundObject;
        this.background_music = background_music;
    }
}