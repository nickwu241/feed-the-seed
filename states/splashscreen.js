var splashScreen = function (game) { }

splashScreen.prototype = {
    create: function () {
        background = this.game.add.sprite(this.game.world.centerX - this.game.world.centerX, this.game.world.centerY - this.game.world.centerY, "background");
        background.scale.setTo(2, 2);

        // background = game.add.image(game.world.centerX - game.world.centerX, game.world.centerY - game.world.centerY, 'background');
        // background.scale.setTo(2, 2);
        title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "title");
        title.scale.setTo(0.5);
        title.anchor.setTo(0.5);
        title.position.y -= 90;
        var startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, "start", this.playTheGame, this);
        startButton.scale.setTo(0.5, 0.5);
        startButton.anchor.setTo(0.5, 0);
    },
    playTheGame: function () {
        this.game.state.start("TheGame");
    }
}