var gameOver = function (game) {
    result = 0;
 }

gameOver.prototype = {
    init: function(score) {
        result = score;
    },
    create: function () {
        var background = this.game.add.image(this.game.world.centerX - this.game.world.centerX, this.game.world.centerY - this.game.world.centerY, 'background');
        background.scale.setTo(2, 2);
        var gameOver = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, "gameover");
        gameOver.scale.setTo(0.5, 0.5);
        gameOver.anchor.setTo(0.5, 0.5);
        var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, "playagain", this.playTheGame, this);
        playButton.scale.setTo(0.5, 0.5);
        playButton.anchor.setTo(0.5, 0);
        this.game.add.text(this.game.world.centerX - 40, this.game.world.centerY + 100, `score: ${score}`, { font: "20px Arial", fill: "#151414"});
    },
    playTheGame: function () {
        this.game.state.start("TheGame");
    }
}