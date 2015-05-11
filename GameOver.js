GameOver = function(game) {
	menuButton = null;
	menuButtonText = null;
	
	playAgainButton = null;
	playAgainButtonText = null;
	
	gameOverText = null;
	scoreText = null;
	
	buttonStyle = null;
	textSytle = null
	
	menuButtonTextObject = null;
	playAgainButtonTextObject = null;
	gameOverTextObject = null;
	scoreTextObject = null;
	playerScore = 0;
};

//setting game configuration and loading the assets for the loading screen
GameOver.prototype = {
	init: function(playerScore) {
		this.playerScore = playerScore;
	},
	preload: function() {
		this.load.image('button', 'assets/button3.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#008000';
		menuButton = this.add.button(400, 450, 'button', this.menuButtonActionOnClick);
		menuButton.anchor.x = 0.5;
		menuButton.anchor.y = 0.5;
		
		playAgainButton = this.add.button(400, 500, 'button', this.playAgainButtonActionOnClick);
		playAgainButton.anchor.x = 0.5;
		playAgainButton.anchor.y = 0.5;
		
		menuButtonText = 'MENU';
		playAgainButtonText = 'PLAY AGAIN';
		buttonStyle = { font: "35px Oswald", fill: "#fff", align: "center" };
		menuButtonTextObject =  this.game.add.text(400, 450, menuButtonText, buttonStyle);
		menuButtonTextObject.anchor.x = 0.5;
		menuButtonTextObject.anchor.y = 0.5;
		
		playAgainButtonTextObject =  this.game.add.text(400, 500, playAgainButtonText, buttonStyle);
		playAgainButtonTextObject.anchor.x = 0.5;
		playAgainButtonTextObject.anchor.y = 0.5;
		
		gameOverText = 'GAME OVER';
		textStyle = { font: "60px Oswald", fill: "#fff", align: "center" };
		gameOverTextObject =  this.game.add.text(400, 50, gameOverText, textStyle);
		gameOverTextObject.anchor.x = 0.5;
		gameOverTextObject.anchor.y = 0.5;
		
		scoreText = 'SCORE: '+playerScore.toString();
		textStyle = { font: "60px Oswald", fill: "#fff", align: "center" };
		scoreTextObject =  this.game.add.text(400, 200, scoreText, textStyle);
		scoreTextObject.anchor.x = 0.5;
		scoreTextObject.anchor.y = 0.5;
	},
	menuButtonActionOnClick: function() {
		this.game.state.start("Menu");
	},
	playAgainButtonActionOnClick: function() {
		this.game.state.start("Game");
	}
}