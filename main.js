var game = new Phaser.Game(800, 600, Phaser.AUTO, 'save-the-day', { preload: preload, create: create, update: update });
var player;
var aliens;
var livesText;
var gameOverText;
var lives = 3;

function preload() {
    game.stage.backgroundColor = '#85b5e1';
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('alien', 'sprites/space-baddie.png');
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

    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

    game.time.events.repeat(Phaser.Timer.SECOND / 6, 1000, spawnEnemy, this);
}

function update() {
    game.physics.arcade.collide(player, aliens, (p, a) => {
        a.kill();
        lives--;
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
    game.time.events.stop();
    gameOverText = game.add.text(game.world.centerX, 200, 'Game Over!', { font: "40px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
    gameOverText.anchor.setTo(0.5);
}

function render() {

}

function spawnEnemy() {
    var alien = aliens.create(randomIntFromInterval(0, game.width), 50, 'alien');
    alien.name = Math.random();
    alien.body.velocity.y = 200;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}