Scoreboard = function(game) {
	menuButton = null;
	menuButtonText = null;
	titleText = null;
	buttonStyle = null;
	titleStyle = null;
	menuButtonTextObject = null;
	titleTextObject = null;
	xmlhttp = null;
	scoreArray = null;
	scoreText = null;
	scoreTextObject = null;
	scoreNames = null;
	scoreScores = null;
};

//setting game configuration and loading the assets for the loading screen
Scoreboard.prototype = {
	preload: function() {
		this.load.image('button', 'assets/button.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#008000';
		
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET','getScores.php',true);
		xmlhttp.send(null);
		xmlhttp.onreadystatechange=function()	{
		if (xmlhttp.readyState==4)/* && xmlhttp.status==200) */
		{
			//document.getElementById("divResults").innerHTML=xmlhttp.responseText;
			//console.log(xmlhttp.responseText);
			scoreArray = JSON.parse(xmlhttp.responseText); // or whatever else JavaScript you need to do
			//console.log(scoreArray);	
			scoreNames = [];
			scoreScores = [];
			scoreText = '';
			for (i = 0; i < scoreArray.length; i++) {
			scoreNames.push(scoreArray[i].Name);
			scoreScores.push(scoreArray[i].Score);
			//console.log(scoreNames[i]+': '+scoreScores[i].toString())
			scoreText = scoreText + '\n' + scoreNames[i]+': '+scoreScores[i].toString();
			}
		} 
		}
		
		scoreText = 'SCOREBOARD LOADING....';
		buttonStyle = { font: "35px Oswald", fill: "#fff", align: "center" };
		scoreTextObject = this.game.add.text(400, 275, scoreText, buttonStyle);
		scoreTextObject.anchor.x = 0.5;
		scoreTextObject.anchor.y = 0.5;
		
		// scoreText = 'NO SCOREBOARD FOUND :(';
		// buttonStyle = { font: "35px Oswald", fill: "#fff", align: "center" };
		// scoreTextObject = this.game.add.text(400, 250, scoreText, buttonStyle);
		// scoreTextObject.anchor.x = 0.5;
		// scoreTextObject.anchor.y = 0.5;
		
		menuButton = this.add.button(400, 550, 'button', this.menuButtonActionOnClick);
		menuButton.anchor.x = 0.5;
		menuButton.anchor.y = 0.5
		menuButtonText = 'MENU';
		buttonStyle = { font: "35px Oswald", fill: "#fff", align: "center" };
		menuButtonTextObject =  this.game.add.text(400, 550, menuButtonText, buttonStyle);
		menuButtonTextObject.anchor.x = 0.5;
		menuButtonTextObject.anchor.y = 0.5;
		titleStyle = { font: "50px Oswald", fill: "#fff", align: "center" };
		titleText = 'SCOREBOARD';
		titleTextObject =  this.game.add.text(400, 50, titleText, titleStyle);
		titleTextObject.anchor.x = 0.5;
		titleTextObject.anchor.y = 0.5;
	},
	menuButtonActionOnClick: function() {
		this.game.state.start("Menu");
	},
	update: function() {
		scoreTextObject.setText(scoreText);
	}
}