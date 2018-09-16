var game = new Phaser.Game(800, 600, Phaser.AUTO, 'save-the-day', { preload: preload, create: create, update: update });
var player;
var platforms;
var aliens;
var lives = 3;

function preload() {
    game.stage.backgroundColor = '#85b5e1';
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('alien', 'sprites/space-baddie.png');

    var introText;
}

function create() {
    player = game.add.sprite(game.world.centerX, 500, 'player');
    player.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    player.body.immovable = true;

    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    dropThings(true);
    introText = game.add.text(game.world.centerX, 200, '', { font: "40px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
    introText.anchor.setTo(0.5);
}

function dropThings(val) {
    if (val === true) {
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = aliens.create(200 + x * 48, y * 50, 'alien');
                alien.name = 'alien' + x.toString() + y.toString();
                alien.checkWorldBounds = true;
                alien.events.onOutOfBounds.add(alienOut, this);
                alien.body.velocity.y = 50 + Math.random() * 200;
            }
        }
    } else {
        aliens.exists = false;
    }
}

function update() {
    game.physics.arcade.collide(player, aliens, (p, a) => {
        a.kill();
        lives--;
        livesText.text = 'lives: ' + lives;
    });

    if (lives === 0) {
        aliens.exists = false;
        gameOver();
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

    introText.text = 'Game Over!';
    introText.visible = true;
}

function render() {

}

function alienOut(alien) {
    //  Move the alien to the top of the screen again
    alien.reset(alien.x, 0);

    //  And give it a new random velocity
    alien.body.velocity.y = 50 + Math.random() * 200;
}
