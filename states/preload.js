var preload = function (game) {}

preload.prototype = {
    preload: function () {
        this.game.load.audio('music', 'cloud-nine.mp3');
        this.game.load.audio('sfx', 'http://examples.phaser.io/assets/audio/SoundEffects/fx_mixdown.ogg');
        this.game.load.audio('drip', 'coin_01.wav');
        this.game.load.audio('powerup', 'magic-wand.wav')
        this.game.load.spritesheet('button', 'http://examples.phaser.io/assets/buttons/button_sprite_sheet.png', 193, 71);
        this.game.load.image('alien', 'icons/fire.png');
        this.game.load.image('player', 'icons/seed-bag.png');
        this.game.load.image('seed', 'icons/hazelnut.png');
        this.game.load.image('sprout', 'icons/sprout.png');
        this.game.load.image('sunflower', 'icons/sunflower.png');
        this.game.load.image('flower', 'icons/flower.png');
        this.game.load.image('plant', 'icons/plant.png');
        this.game.load.image('bonsai', 'icons/bonsai.png');
        this.game.load.image('drop', 'icons/raindrop.png');
        this.game.load.image('watering-can', 'icons/watering-can.png');
        this.game.load.image('axe', 'icons/axe.png');
        this.game.load.image('star', 'icons/star.png');
        this.game.load.image('start', 'icons/start-button.png');
        this.game.load.image('title', 'title.png');
        this.game.load.image('background', 'garden2.png');
    },
    create: function () {
        this.game.state.start("SplashScreen");
    }
}