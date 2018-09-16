var game = new Phaser.Game(800, 600, Phaser.AUTO, 'save-the-day', { preload: preload, create: create, update: update });
var player;
var aliens;
var powerUps;
var livesText;
var gameOverText;
var lives = 3;
var music;
var fx;

function preload() {
    game.stage.backgroundColor = '#85b5e1';
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('alien', 'sprites/space-baddie.png');
    game.load.image('melon', 'sprites/melon.png');
    game.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.mp3', 'audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    game.load.audio('sfx', 'audio/SoundEffects/fx_mixdown.ogg');
}

function create() {
    player = game.add.sprite(game.world.centerX, 500, 'player');
    player.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    player.body.immovable = true;

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;


    powerUps = game.add.group();
    powerUps.enableBody = true;
    powerUps.physicsBodyType = Phaser.Physics.ARCADE;

    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

    fx = game.add.audio('sfx');
    fx.allowMultiple = true;
    fx.addMarker('alien death', 1, 1.0);
	fx.addMarker('boss hit', 3, 0.5);
	fx.addMarker('escape', 4, 3.2);
	fx.addMarker('meow', 8, 0.5);
	fx.addMarker('numkey', 9, 0.1);
	fx.addMarker('ping', 10, 1.0);
	fx.addMarker('death', 12, 4.2);
	fx.addMarker('shot', 17, 1.0);
	fx.addMarker('squit', 19, 0.3);

    music = game.add.audio('boden');
    music.play();

    game.time.events.repeat(Phaser.Timer.SECOND / 20, 1000, spawnEnemy, this);
    game.time.events.repeat(Phaser.Timer.SECOND, 1000, spawnPowerUp, this);
}

function update() {
    game.physics.arcade.collide(player, aliens, (p, a) => {
        fx.play('shot')
        a.kill();
        lives--;
        livesText.text = `lives: ${lives}`;
    });

    game.physics.arcade.collide(player, powerUps, (p, powerUp) => {
        fx.play('ping')
        powerUp.kill();
        lives++;
        livesText.text = `lives: ${lives}`;
    });

    if (lives === 0) {
        gameOver();
        return;
    }

    player.x = game.input.x;
    if (player.x < 24) {
        player.x = 24;
    }
    else if (player.x > game.width - 24) {
        player.x = game.width - 24;
    }
}

function gameOver() {
    aliens.exists = false;
    powerUps.exists = false;
    game.time.events.stop();
    gameOverText = game.add.text(game.world.centerX, 200, 'Game Over!', { font: "40px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
    gameOverText.anchor.setTo(0.5);
    music.stop();
}

function render() {

}

function spawnEnemy() {
    var alien = aliens.create(randomIntFromInterval(0, game.width), 50, 'alien');
    alien.name = Math.random();
    alien.body.velocity.y = randomIntFromInterval(300, 500);
}

function spawnPowerUp() {
    var powerUp = powerUps.create(randomIntFromInterval(0, game.width), 50, 'melon');
    powerUp.name = Math.random();
    powerUp.body.velocity.y = 300;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}