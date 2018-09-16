var theGame = function (game) {
    player = null;
    aliens = null;
    powerUps = null;
    livesText = "lives = 0";
    gameOverText = null;
    SCREEN_EDGE_OFFSET = 35;
    LIVECAP = 8;
    lives = 3;
    score = 0;
    music = null;
    fx = null;
}

theGame.prototype = {
    create: function () {
        background = this.game.add.image(this.game.world.centerX - this.game.world.centerX, this.game.world.centerY - this.game.world.centerY, 'background');
        background.scale.setTo(2, 2);
        player = this.game.add.sprite(this.game.world.centerX, 500, 'player');
        player.scale.setTo(2, 2);
        player.anchor.setTo(0.5, 0.5);

        this.game.physics.arcade.enable(player);
        console.log(this.game.width);
        console.log(this.game.height);

        player.body.collideWorldBounds = true;
        //player.body.gravity.y = 500;
        player.position.y = 580;
        player.body.immovable = true;
        //console.log(player.position.y);

        aliens = this.game.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;


        powerUps = this.game.add.group();
        powerUps.enableBody = true;
        powerUps.physicsBodyType = Phaser.Physics.ARCADE;

        livesText = this.game.add.text(this.game.width - 2.5 * SCREEN_EDGE_OFFSET, 10, 'lives: 3', { font: "20px Arial", fill: "#151414", align: "left" });

        fx = this.game.add.audio('sfx');
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

        music = this.game.add.audio('music');
        music.play();
        music.loop = true;
        drip = this.game.add.audio('drip');

        // this.game.time.events.repeat(Phaser.Timer.SECOND / 20, 1000, spawnEnemy, this);
        this.game.time.events.repeat(Phaser.Timer.SECOND, 1000, this.spawnPowerUp, this);
        //this.backgroundSprite = this.game.add.sprite(0, 0, 'background');
        //this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    },

    update: function () {

        this.game.physics.arcade.collide(player, aliens, (p, a) => {
            fx.play('shot')
            a.kill();
            lives--;
            livesText.text = `lives: ${lives}`;
        });

        this.game.physics.arcade.collide(player, powerUps, (p, powerUp) => {
            drip.play();
            powerUp.kill();
            score++;
            lives++;
            livesText.text = `lives: ${lives}`;
        });
        if (lives === 4) {
            this.changePlayerImage('seed');
            player.scale.setTo(0.7, 0.7);
        }
        if (lives === 8) {
            this.changePlayerImage('plant');
            player.scale.setTo(2, 2);
        }
        if (lives === 12) {
            this.changePlayerImage('flower');
            player.scale.setTo(1.1, 1.1);
        }

        if (lives === 15) {
            this.changePlayerImage('bonsai');
            player.scale.setTo(1.1, 1.1);
        }


        if (lives === 0) {
            //gameOver();
            this.lose();
            return;
        }

        player.x = this.game.input.x;
        if (player.x < SCREEN_EDGE_OFFSET) {
            player.x = SCREEN_EDGE_OFFSET;
        }
        else if (player.x > this.game.width - SCREEN_EDGE_OFFSET) {
            player.x = this.game.width - SCREEN_EDGE_OFFSET;
        }

    },

    changePlayerImage: function (image) {
        player.loadTexture(image);
    },

    gameOver: function () {
        aliens.exists = false;
        powerUps.exists = false;
        this.game.time.events.stop();
        gameOverText = this.game.add.text(this.game.world.centerX, 200, 'Game Over!', { font: "40px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
        gameOverText.anchor.setTo(0.5);
        music.stop();
        button = this.game.add.button(this.game.world.centerX - 95, 250, 'button', restart, this, 2, 1, 0);
    },

    restart: function () {
        location.reload();
        // this.game.state.restart();
        // this.game.state.start(this.game.state.current);
        // spawnEnemy();
        // lives = 3;
        // livesText.text = `lives: ${lives}`;
    },

    render: function () {

    },

    spawnEnemy: function () {
        var alien = aliens.create(this.randomIntFromInterval(0, this.game.width), 50, 'alien');
        alien.name = Math.random();
        alien.body.velocity.y = this.randomIntFromInterval(300, 500);
    },

    spawnPowerUp: function () {
        var powerUp = powerUps.create(this.randomIntFromInterval(35, this.game.width - 35), 50, 'melon');
        powerUp.name = Math.random();
        powerUp.body.velocity.y = 300;
    },


    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    lose: function () {
        if (lives == LIVECAP) {
            this.game.state.start("GameOver", true, false, lives);
        }
    }
}