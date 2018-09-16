var theGame = function (game) {
    SCREEN_EDGE_OFFSET = 35;
    MAX_SCORE = 1500;

    player = null;
    sizeMultipler = 1;
    waterDrops = null;
    sprinkers = null;
    stars = null;
    gameOverText = null;
    score = 0;
    scoreText = null;
    music = null;
    drip = null;
    powerup = null;
}

theGame.prototype = {
    create: function () {
        background = this.game.add.image(this.game.world.centerX - this.game.world.centerX, this.game.world.centerY - this.game.world.centerY, 'background');
        background.scale.setTo(2, 2);

        player = this.game.add.sprite(this.game.world.centerX, 500, 'player');
        player.scale.setTo(2, 2);
        player.anchor.setTo(0.5, 1);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.immovable = true;

        waterDrops = this.game.add.group();
        waterDrops.enableBody = true;
        waterDrops.physicsBodyType = Phaser.Physics.ARCADE;

        wateringCans = this.game.add.group();
        wateringCans.enableBody = true;
        wateringCans.physicsBodyType = Phaser.Physics.ARCADE;

        stars = this.game.add.group();
        stars.enableBody = true;
        stars.physicsBodyType = Phaser.Physics.ARCADE;

        score = 0;
        sizeMultipler = 1;

        if (music) {
            music.resume();
        } else {
            music = this.game.add.audio('music');
            music.play();
            music.loop = true;
        }

        drip = this.game.add.audio('drip');
        powerup = this.game.add.audio('powerup');
        starPowerup = this.game.add.audio('star-powerup');

        scoreText = this.game.add.text(this.game.width - 150, 20, `score: ${score}`, { font: "20px Arial", fill: "#151414", align: "left" });
        this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 1000, this.spawnWaterDrop, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.spawnWateringCan, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnStar, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.gameOver, this);
    },

    update: function () {
        this.game.physics.arcade.collide(player, waterDrops, this.waterDropCollide);
        this.game.physics.arcade.collide(player, wateringCans, (p, w) => {
            powerup.play();
            w.kill();
            for (var i = 0; i < 15; i++) {
                this.spawnWaterDrop();
            }
        });
        this.game.physics.arcade.collide(player, stars, (p, s) => {
            starPowerup.play();
            s.kill();
            sizeMultipler = 2;
            player.scale.setTo(player.scale.x * sizeMultipler, player.scale.y * sizeMultipler);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, () => sizeMultipler = 1);
        });

        if (score >= 50 * 50) {
            this.changePlayerImage('bonsai');
            player.scale.setTo(1.1 * sizeMultipler, 1.1 * sizeMultipler);
        }
        else if (score >= 30 * 50) {
            this.changePlayerImage('flower');
            player.scale.setTo(1.1 * sizeMultipler, 1.1 * sizeMultipler);
        }
        else if (score >= 15 * 50) {
            this.changePlayerImage('plant');
            player.scale.setTo(2 * sizeMultipler, 2 * sizeMultipler);
        }
        else if (score >= 5 * 50) {
            this.changePlayerImage('seed');
            player.scale.setTo(0.7 * sizeMultipler, 0.7 * sizeMultipler);
        }

        player.x = this.game.input.x;
        if (player.x < SCREEN_EDGE_OFFSET * sizeMultipler) {
            player.x = SCREEN_EDGE_OFFSET * sizeMultipler;
        }
        else if (player.x > this.game.width - SCREEN_EDGE_OFFSET * sizeMultipler) {
            player.x = this.game.width - SCREEN_EDGE_OFFSET * sizeMultipler;
        }
    },

    changePlayerImage: function (image) {
        player.loadTexture(image);
    },

    waterDropCollide: function(obj, drop) {
        drip.play();
        drop.kill();
        score += 50;
        scoreText.text = `score: ${score}`;
    },

    spawnWaterDrop: function () {
        var drop = waterDrops.create(
            this.randomIntFromInterval(SCREEN_EDGE_OFFSET, this.game.width - SCREEN_EDGE_OFFSET),
            this.randomIntFromInterval(0, 200), 'drop');
        drop.name = Math.random();
        drop.body.velocity.y = 300;
    },

    spawnStar: function () {
        var star = stars.create(this.randomIntFromInterval(SCREEN_EDGE_OFFSET, this.game.width - SCREEN_EDGE_OFFSET), 50, 'star');
        star.name = Math.random();
        star.body.velocity.y = 400;
        star.scale.setTo(0.25, 0.25);
        this.game.time.events.add(Phaser.Timer.SECOND * this.randomIntFromInterval(4, 7), this.spawnStar, this);
    },

    spawnWateringCan: function () {
        var wateringCan = wateringCans.create(this.randomIntFromInterval(SCREEN_EDGE_OFFSET, this.game.width - SCREEN_EDGE_OFFSET), 50, 'watering-can');
        wateringCan.name = Math.random();
        wateringCan.body.velocity.y = 200;
        this.game.time.events.add(Phaser.Timer.SECOND * this.randomIntFromInterval(3, 5), this.spawnWateringCan, this);
    },

    gameOver: function () {
        this.game.state.start("GameOver", true, false, score);
    },

    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}