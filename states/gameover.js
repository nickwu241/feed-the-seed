var gameOver = function (game) { }

gameOver.prototype = {
    create: function () {
        var gameOver = this.game.add.sprite(160, 160, "gameOver");
        gameOver.anchor.setTo(0.5, 0.5);
        var playButton = this.game.add.button(160, 320, "sunflower", this.playTheGame, this);
        playButton.anchor.setTo(0.5, 0.5);
    },
    playTheGame: function () {
        this.game.state.start("TheGame");
    }
}