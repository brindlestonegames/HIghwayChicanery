Controls = function(game) {
	menuButton = null;
	menuButtonText = null;
	titleText = null;
	buttonStyle = null;
	titleStyle = null;
	menuButtonTextObject = null;
	titleTextObject = null;
	control1TextObject = null;
	control2TextObject = null;
	control3TextObject = null;
	control4TextObject = null;
	control1Text = null;
	control2Text = null;
	control3Text = null;
	control4Text = null;
};

//setting game configuration and loading the assets for the loading screen
Controls.prototype = {
	preload: function() {
		this.load.image('button', 'assets/button.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#008000';
		
		menuButton = this.add.button(400, 550, 'button', this.menuButtonActionOnClick);
		menuButton.anchor.x = 0.5;
		menuButton.anchor.y = 0.5
		menuButtonText = 'MENU';
		
		buttonStyle = { font: "35px Oswald", fill: "#fff", align: "center" };
		menuButtonTextObject =  this.game.add.text(400, 550, menuButtonText, buttonStyle);
		menuButtonTextObject.anchor.x = 0.5;
		menuButtonTextObject.anchor.y = 0.5;
		
		titleStyle = { font: "50px Oswald", fill: "#fff", align: "center" };
		titleText = 'CONTROLS';
		titleTextObject =  this.game.add.text(400, 50, titleText, titleStyle);
		titleTextObject.anchor.x = 0.5;
		titleTextObject.anchor.y = 0.5;
		
		control1Text = 'INCREASE SPEED - UP ARROW OR SWIPE UP';
		control1TextObject =  this.game.add.text(400, 150, control1Text, buttonStyle);
		control1TextObject.anchor.x = 0.5;
		control1TextObject.anchor.y = 0.5;
		
		control2Text = 'DECREASE SPEED - DOWN ARROW OR SWIPE DOWN';
		control2TextObject =  this.game.add.text(400, 250, control2Text, buttonStyle);
		control2TextObject.anchor.x = 0.5;
		control2TextObject.anchor.y = 0.5;
		
		control3Text = 'LEFT LANE CHANGE - LEFT ARROW OR SWIPE LEFT';
		control3TextObject =  this.game.add.text(400, 350, control3Text, buttonStyle);
		control3TextObject.anchor.x = 0.5;
		control3TextObject.anchor.y = 0.5;
		
		control4Text = 'RIGHT LANE CHANGE - RIGHT ARROW OR SWIPE RIGHT';
		control4TextObject =  this.game.add.text(400, 450, control4Text, buttonStyle);
		control4TextObject.anchor.x = 0.5;
		control4TextObject.anchor.y = 0.5;
	},
	menuButtonActionOnClick: function() {
		this.game.state.start("Menu");
	}
}