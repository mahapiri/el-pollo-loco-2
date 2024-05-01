class Level {
    enemies;
    cloud;
    backgroundObject;
    level_end_x = 720 * 3;
    background_music;

    constructor(enemies, cloud, backgroundObject, background_music) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObject = backgroundObject;
        this.background_music = background_music;
    }
}