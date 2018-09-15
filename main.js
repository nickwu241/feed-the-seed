var game = new Phaser.Game(800, 600, Phaser.AUTO, 'save-the-day', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;
var jumpButton;
var aliens;


function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

    game.load.image('alien', 'sprites/space-baddie.png');
}

function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(200 + x * 48, y * 50, 'alien');
            alien.name = 'alien' + x.toString() + y.toString();
            alien.checkWorldBounds = true;
            alien.events.onOutOfBounds.add(alienOut, this);
            alien.body.velocity.y = 50 + Math.random() * 200;
        }
    }
}

function update () {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function render () {

}

function alienOut(alien) {

    //  Move the alien to the top of the screen again
    alien.reset(alien.x, 0);

    //  And give it a new random velocity
    alien.body.velocity.y = 50 + Math.random() * 200;

}