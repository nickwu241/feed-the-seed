var theGame = function (game) {
    SCREEN_EDGE_OFFSET = 35;
    MAX_SCORE = 1500;

    player = null;
    waterDrops = null;
    gameOverText = null;
    score = 0;
    scoreText = null;
    music = null;
}

theGame.prototype = {
    create: function () {
        background = this.game.add.image(this.game.world.centerX - this.game.world.centerX, this.game.world.centerY - this.game.world.centerY, 'background');
        background.scale.setTo(2, 2);

        player = this.game.add.sprite(this.game.world.centerX, 500, 'player');
        player.scale.setTo(2, 2);
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.immovable = true;

        waterDrops = this.game.add.group();
        waterDrops.enableBody = true;
        waterDrops.physicsBodyType = Phaser.Physics.ARCADE;

        scoreText = this.game.add.text(this.game.width - 150, 20, `score = ${score}`, { font: "20px Arial", fill: "#151414", align: "left" });

        music = this.game.add.audio('music');
        music.play();
        music.loop = true;
        drip = this.game.add.audio('drip');

        this.game.time.events.repeat(Phaser.Timer.SECOND, 1000, this.spawnWaterDrop, this);
    },

    update: function () {
        this.game.physics.arcade.collide(player, waterDrops, this.waterDropCollide);

        if (score >= MAX_SCORE) {
            this.gameOver();
        }
        else if (score >= 15 * 50) {
            this.changePlayerImage('bonsai');
            player.scale.setTo(1.1, 1.1);
        }
        else if (score >= 12 * 50) {
            this.changePlayerImage('flower');
            player.scale.setTo(1.1, 1.1);
        }
        else if (score >= 8 * 50) {
            this.changePlayerImage('plant');
            player.scale.setTo(2, 2);
        }
        else if (score >= 4 * 50) {
            this.changePlayerImage('seed');
            player.scale.setTo(0.7, 0.7);
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

    waterDropCollide: function(obj, drop) {
        drip.play();
        drop.kill();
        score += 50;
        scoreText.text = `score = ${score}`;
    },

    spawnWaterDrop: function () {
        var drop = waterDrops.create(this.randomIntFromInterval(35, this.game.width - 35), 50, 'melon');
        drop.name = Math.random();
        drop.body.velocity.y = 300;
    },

    gameOver: function () {
        this.game.state.start("GameOver", true, false, score);
    },

    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}