Menu = function(game) {
	startButton = null;
	scoreBoardButton = null;
	controlsButton = null;
	
	startButtonText = null;
	scoreBoardButtonText = null;
	controlsButtonText = null;
	nameText = null;
	
	buttonStyle = null;
	nameStyle = null;
	
	nameTextObject = null;
	startButtonTextObject = null;
	scoreBoardButtonTextObject = null;
	controlsButtonTextObject = null;
	
	red7 = null;
	blue4 = null;
};

//setting game configuration and loading the assets for the loading screen
Menu.prototype = {
	preload: function() {
		this.load.image('button', 'assets/button.png');
		this.load.image('button2', 'assets/button2.png');
		this.load.image('button3', 'assets/button3.png');
		this.load.image('blue4', 'assets/blue4.png');
		this.load.image('red7', 'assets/red7.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#008000';
		red7 = this.game.add.sprite(150,350,'red7');
		red7.anchor.x = 0.5;
		red7.anchor.y = 0.5;
		red7.scale.x = 0.55;
		red7.scale.y = 0.55;
		blue4 = this.game.add.sprite(650,350,'blue4');
		blue4.anchor.x = 0.5;
		blue4.anchor.y = 0.5;
		blue4.scale.x = 0.55;
		blue4.scale.y = 0.55;
		blue4.rotation = Math.PI;
		
		startButton = this.add.button(400, 250, 'button', this.startButtonActionOnClick);
		startButton.anchor.x = 0.5;
		startButton.anchor.y = 0.5
		
		// scoreBoardButton = this.add.button(400, 350, 'button2', this.scoreBoardButtonActionOnClick);
		// scoreBoardButton.anchor.x = 0.5;
		// scoreBoardButton.anchor.y = 0.5;
		
		controlsButton = this.add.button(400, 350, 'button3', this.controlsButtonActionOnClick);
		controlsButton.anchor.x = 0.5;
		controlsButton.anchor.y = 0.5;
		
		
		nameStyle = { font: "70px Oswald", fill: "#fff", align: "center" };
		nameText = 'HIGHWAY CHICANERY';
		nameTextObject =  this.game.add.text(400, 100, nameText, nameStyle);
		nameTextObject.anchor.x = 0.5;
		nameTextObject.anchor.y = 0.5;
		
		buttonStyle = { font: "33px Oswald", fill: "#fff", align: "center" };
		
		startButtonText = 'PLAY';
		startButtonTextObject =  this.game.add.text(400, 250, startButtonText, buttonStyle);
		startButtonTextObject.anchor.x = 0.5;
		startButtonTextObject.anchor.y = 0.5;
		
		// scoreBoardButtonText = 'SCOREBOARD';
		// scoreBoardButtonTextObject =  this.game.add.text(400, 350, scoreBoardButtonText, buttonStyle);
		// scoreBoardButtonTextObject.anchor.x = 0.5;
		// scoreBoardButtonTextObject.anchor.y = 0.5;
		
		controlsButtonText = 'CONTROLS';
		controlsButtonTextObject =  this.game.add.text(400, 350, controlsButtonText, buttonStyle);
		controlsButtonTextObject.anchor.x = 0.5;
		controlsButtonTextObject.anchor.y = 0.5;
	
	},

	startButtonActionOnClick: function() {
		this.game.state.start("Game");
	},
	// scoreBoardButtonActionOnClick: function() {
		// this.game.state.start("Scoreboard");
	// },
	controlsButtonActionOnClick: function() {
		this.game.state.start("Controls");
	}
}