const level1 = new Level (
    [
        new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick()
    ],
    [
        new Endboss()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png', -960),
        new Cloud('img/5_background/layers/4_clouds/2.png', -480),

        new Cloud('img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 480),

        new Cloud('img/5_background/layers/4_clouds/1.png', 480 * 2),
        new Cloud('img/5_background/layers/4_clouds/2.png', 480 * 3),

        
        new Cloud('img/5_background/layers/4_clouds/1.png', 480 * 4),
        new Cloud('img/5_background/layers/4_clouds/2.png', 480 * 5),

        new Cloud('img/5_background/layers/4_clouds/1.png', 480 * 6),
        new Cloud('img/5_background/layers/4_clouds/2.png', 480 * 7)

    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
    ],
    [
        new Audio('audio/background-music.mp3')
    ],
    new BottleBar(),
    new CharacterBar(),
    new CoinBar(),
    new EndbossBar(),
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
)