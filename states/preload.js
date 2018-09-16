var preload = function (game) { }

preload.prototype = {
    preload: function () {
        this.game.load.image('alien', 'icons/fire.png');
        // this.game.stage.backgroundColor = '#85b5e1';
        this.game.load.image('background', 'garden2.png');
        // this.game.load.baseURL = 'http://examples.phaser.io/assets/';
        this.game.load.crossOrigin = 'anonymous';
        //this.game.load.image('melon', 'http://examples.phaser.io/assets/sprites/melon.png');
        this.game.load.audio('music', 'cloud-nine.mp3');
        // this.game.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.mp3', 'audio/bodenstaendig_2000_in_rock_4bit.ogg']);
        this.game.load.audio('sfx', 'http://examples.phaser.io/assets/audio/SoundEffects/fx_mixdown.ogg');
        this.game.load.audio('drip', 'coin_01.wav');
        this.game.load.spritesheet('button', 'http://examples.phaser.io/assets/buttons/button_sprite_sheet.png', 193, 71);
        this.game.load.image('player', 'icons/seed-bag.png');
        this.game.load.image('seed', 'icons/hazelnut.png');
        this.game.load.image('sprout', 'icons/sprout.png');
        this.game.load.image('sunflower', 'icons/sunflower.png');
        this.game.load.image('flower', 'icons/flower.png');
        this.game.load.image('plant', 'icons/plant.png');
        this.game.load.image('bonsai', 'icons/bonsai.png');
        this.game.load.image('melon', 'icons/raindrop.png');
        this.game.load.image('start', 'icons/start-button.png');
        this.game.load.image('start', 'icons/start-button.png');
        this.game.load.image('title', 'title.png');

        // var loadingBar = this.add.sprite(160,240,"loading");
        // loadingBar.anchor.setTo(0.5,0.5);
        // this.load.setPreloadSprite(loadingBar);
        // var loadingPage = this.add.sprite(160, 240, 'background');
        // this.load.setPreloadSprite('background');
    },
    create: function () {
        this.game.state.start("SplashScreen");
    }
}