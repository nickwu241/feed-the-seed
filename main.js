
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'save-the-day', { preload: preload, create: create, update: update });
var player;
var aliens;
var powerUps;
var livesText;
var gameOverText;
const SCREEN_EDGE_OFFSET = 35;
var lives = 3;
var score = 0;
var music;
var fx;

function preload() {
    game.load.image('alien', 'icons/fire.png');
    game.stage.backgroundColor = '#85b5e1';
    game.load.image('background', 'garden2.png');
    // game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    //game.load.image('melon', 'http://examples.phaser.io/assets/sprites/melon.png');
    game.load.audio('music', 'cloud-nine.mp3');
    // game.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.mp3', 'audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    game.load.audio('sfx', 'http://examples.phaser.io/assets/audio/SoundEffects/fx_mixdown.ogg');
    game.load.audio('drip', 'coin_01.wav');
    game.load.spritesheet('button', 'http://examples.phaser.io/assets/buttons/button_sprite_sheet.png', 193, 71);
    game.load.image('player', 'icons/seed-bag.png');
    game.load.image('seed', 'icons/hazelnut.png');
    game.load.image('sprout', 'icons/sprout.png');
    game.load.image('sunflower', 'icons/sunflower.png');
    game.load.image('flower', 'icons/flower.png');
    game.load.image('plant', 'icons/plant.png');
    game.load.image('bonsai', 'icons/bonsai.png');
    game.load.image('melon', 'icons/raindrop.png');
    // game.load.image('alien', 'sprites/space-baddie.png');

}

function create() {
    background = game.add.image(game.world.centerX - game.world.centerX, game.world.centerY - game.world.centerY, 'background');
    background.scale.setTo(2, 2);
    player = game.add.sprite(game.world.centerX, 500, 'player');
    player.scale.setTo(2, 2);
    player.anchor.setTo(0.5, 0.5);
    //player.anchor.setTo(0.5, 0.5);
    player.exists = false;


    game.physics.arcade.enable(player);
    console.log(game.width);
    console.log(game.height);

    player.body.collideWorldBounds = true;
    //player.body.gravity.y = 500;
    player.position.y = 580;
    player.body.immovable = true;
    //console.log(player.position.y);

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;


    powerUps = game.add.group();
    powerUps.enableBody = true;
    powerUps.physicsBodyType = Phaser.Physics.ARCADE;

    //livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

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

    music = game.add.audio('music');
    music.play();
    music.loop = true;
    drip = game.add.audio('drip');

    // game.time.events.repeat(Phaser.Timer.SECOND / 20, 1000, spawnEnemy, this);
    game.time.events.repeat(Phaser.Timer.SECOND, 1000, spawnPowerUp, this);
    //this.backgroundSprite = this.game.add.sprite(0, 0, 'background');
    //game.add.tileSprite(0, 0, 1000, 600, 'background');
}

function update() {

    game.physics.arcade.collide(player, aliens, (p, a) => {
        fx.play('shot')
        a.kill();
        lives--;
        livesText.text = `lives: ${lives}`;
    });

    game.physics.arcade.collide(player, powerUps, (p, powerUp) => {
        drip.play();
        powerUp.kill();
        score++;
        lives++;
        livesText.text = `lives: ${lives}`;
    });
    if (lives === 4) {
        changePlayerImage('seed');
        player.scale.setTo(0.7, 0.7);
    }
    if (lives === 8) {
        changePlayerImage('plant');
        player.scale.setTo(2, 2);
    }
    if (lives === 12) {
        changePlayerImage('flower');
        player.scale.setTo(1.1, 1.1);
    }

    if (lives === 15) {
        changePlayerImage('bonsai');
        player.scale.setTo(1.1, 1.1);
    }


    if (lives === 0) {
        gameOver();
        return;
    }

    player.x = game.input.x;
    if (player.x < SCREEN_EDGE_OFFSET) {
        player.x = SCREEN_EDGE_OFFSET;
    }
    else if (player.x > game.width - SCREEN_EDGE_OFFSET) {
        player.x = game.width - SCREEN_EDGE_OFFSET;
    }
}

function changePlayerImage(image) {
    player.loadTexture(image);
}

function gameOver() {
    aliens.exists = false;
    powerUps.exists = false;
    game.time.events.stop();
    gameOverText = game.add.text(game.world.centerX, 200, 'Game Over!', { font: "40px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
    gameOverText.anchor.setTo(0.5);
    music.stop();
    button = game.add.button(game.world.centerX - 95, 250, 'button', restart, this, 2, 1, 0);
}

function restart() {
    location.reload();
    // game.state.restart();
    // game.state.start(game.state.current);
    // spawnEnemy();
    // lives = 3;
    // livesText.text = `lives: ${lives}`;
}

function render() {

}
function spawnEnemy() {
    var alien = aliens.create(randomIntFromInterval(0, game.width), 50, 'alien');
    alien.name = Math.random();
    alien.body.velocity.y = randomIntFromInterval(300, 500);
}

function spawnPowerUp() {
    var powerUp = powerUps.create(randomIntFromInterval(35, game.width - 35), 50, 'melon');
    powerUp.name = Math.random();
    powerUp.body.velocity.y = 300;
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}