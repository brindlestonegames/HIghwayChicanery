//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
Game = function(game) {
	// Player variable
	player = null;
	playerSpeed = 0;
	playerScore = 0;
	playerLane = 0;
	playerHeight = 0;
	
	// road variables
	road1 = null;
	road2 = null;
	
	atlasName = 'atlas1';
	// variables for enemies
	enemy = null;
	enemyList = [];
	maxNumberEnemies = 100;
	currentNumberEnemies = 20;
	enemyImages = ['blue1','blue2','blue3','blue4','blue5','blue6','blue7','blue8','blue9','blue10','blue11','blue12','green1','green2','green3','green4','green5','green6','green7','green8','green9','green10','green11','green12','orange1','orange2','orange3','orange4','orange5','orange6','orange7','orange8','orange9','orange10','orange11','orange12','pink1','pink2','pink3','pink4','pink5','pink6','pink7','pink8','pink9','pink10','pink11','pink12','red1','red2','red3','red4','red5','red6','red7','red8','red9','red10','red11','red12','yellow1','yellow2','yellow3','yellow4','yellow5','yellow6','yellow7','yellow8','yellow9','yellow10','yellow11','yellow12'];
	enemyHeight = [407,520,569,517,521,522,601,573,620,619,565,550,407,520,569,517,521,522,601,573,620,619,565,550,407,520,569,517,521,522,601,573,620,619,565,550,407,520,569,517,521,522,601,573,620,619,565,550,407,520,569,517,521,522,601,573,620,619,565,550,407,520,569,517,521,522,601,573,620,619,565,550];
	laneLocations = [180,329,469,616];

	// variables for keyboard control
	upKey = null;
	downKey = null;
	leftKey = null;
	rightKey = null;

	// variables for score
	text = 'SCORE:';
	style = { font: "35px Oswald", fill: "#000000", align: "center" };;
	scoreLabelTextObject = null;
	scoreTextObject = null;
	fpsTextObject = null;
	multiplierTextObject = null;
	lastScore = 0;

	// variables for collision
	collision = false;
};
Game.prototype = {
	preload: function() {
		this.game.load.atlasJSONHash(atlasName, 'assets/spritesheet.png', 'assets/sprites.json');
		this.game.load.image('road', 'assets/road.png');
		this.game.time.advancedTiming = true;
	},
	
	create: function() {
		this.game.stage.backgroundColor = '#008000';
		currentNumberEnemies = 20;
		enemyList = [];
		// setup input keys
		upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	
		// setup roads
		road1 = this.game.add.sprite(0,0,'road');
		road2 = this.game.add.sprite(0,-599,'road');
	
		//setup enemies
		laneLocations = [180,329,469,616];
		enemyImages = ['blue1','blue2','blue3','blue4','blue5','blue6','blue7','blue8','blue9','blue10','blue11','blue12','green1','green2','green3','green4','green5','green6','green7','green8','green9','green10','green11','green12','orange1','orange2','orange3','orange4','orange5','orange6','orange7','orange8','orange9','orange10','orange11','orange12','pink1','pink2','pink3','pink4','pink5','pink6','pink7','pink8','pink9','pink10','pink11','pink12','red1','red2','red3','red4','red5','red6','red7','red8','red9','red10','red11','red12','yellow1','yellow2','yellow3','yellow4','yellow5','yellow6','yellow7','yellow8','yellow9','yellow10','yellow11','yellow12'];
		enemyList = [];
		for (i = 0; i < currentNumberEnemies; i++) {
			var lane = Math.floor(Math.random() * 4);
			if (lane == 2 || lane == 3)
			{
				var speed = -((Math.random() * 3) + 3)
			}
			if (lane == 0 || lane == 1)
			{
				var speed = ((Math.random() * 3) + 3)
			}
			var enemyType = Math.floor(Math.random() * 72);
			enemyList.push(new this.enemy(this.game,atlasName,enemyImages[enemyType],lane,speed,enemyHeight[enemyType]));
			enemyList[i].createEnemy();
		}
	
		// setup player
		playerLane = 3;
		var playerType = Math.floor(Math.random() * 72);
		player = this.game.add.sprite(laneLocations[playerLane],450,atlasName,enemyImages[playerType]);
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		player.scale.x = 0.36*2;
		player.scale.y = 0.36*2;
		player.rotation = Math.PI;
		playerSpeed = 5;
		playerScore = 0;
		playerHeight = enemyHeight[playerType];
		collision = false;
	
		// setup text
		text = 'Score:';
		style = { font: "35px Oswald", fill: "#000000", align: "center" };
		scoreLabelTextObject =  this.game.add.text(0, 0, text, style);
		scoreTextObject =  this.game.add.text(0, 50, playerScore.toString(), style);
		multiplierTextObject =  this.game.add.text(0, 100, '', style);
		//fpsTextObject =  this.game.add.text(0, 100, '0', style);
	},

	update: function() {
		this.handleInput();
		this.updateRoad();
		this.checkEnemyCollisions();
		this.updateEnemies();
		this.checkCollision();
		this.updateScore();
		if (collision == true)
		{
			this.game.state.start("GameOver",playerScore);
		}
	},


	handleInput: function() {
		var swipeCoordX,
			swipeCoordY,
			swipeCoordX2,
			swipeCoordY2,
			swipeMinDistance = 100,
			newInput = false;
			

		this.input.onDown.add(function(pointer) {
			console.log('on down')
			swipeCoordX = pointer.clientX;
			swipeCoordY = pointer.clientY;   
			this.newInput = true;
		}, this);
		
		this.input.onUp.add(function(pointer) {
			if (this.newInput == true) 
			{
				this.newInput = false;
				swipeCoordX2 = pointer.clientX;
				swipeCoordY2 = pointer.clientY;
				if(swipeCoordX2 < swipeCoordX - swipeMinDistance){
					if (playerLane > 0)
					{
						playerLane += -1;
						player.x = laneLocations[playerLane];
					}
				}else if(swipeCoordX2 > swipeCoordX + swipeMinDistance){
					if (playerLane < 3)
					{
						playerLane += 1;
						player.x = laneLocations[playerLane];
					}
				}else if(swipeCoordY2 < swipeCoordY - swipeMinDistance){
					if (playerSpeed < 10)
					{
						playerSpeed += 1;
					}
				}else if(swipeCoordY2 > swipeCoordY + swipeMinDistance){
					if (playerSpeed > 2)
					{
						playerSpeed += -1;
					}
				}
			}
		},this);
		
		if (upKey.isDown)
		{
			if (playerSpeed < 10)
			{
				playerSpeed += 1;
			}
		}
		if (downKey.isDown)
		{
			if (playerSpeed > 2)
			{
				playerSpeed += -1;
			}
		}
		
		this.input.keyboard.onUpCallback = function( e ){
			if(e.keyCode == Phaser.Keyboard.LEFT){
				if (playerLane > 0)
				{
					playerLane += -1;
					player.x = laneLocations[playerLane];
				}
			}
			if(e.keyCode == Phaser.Keyboard.RIGHT){
				if (playerLane < 3)
				{
					playerLane += 1;
					player.x = laneLocations[playerLane];
				}
			} 
		};
	},

	updateEnemies: function() {
		for (i = 0; i < enemyList.length; i++) {
			enemyList[i].updateEnemy();
		}
	},

	updateRoad: function() {
		if (road1.y >= 599)
		{
			var diff1 = road1.y - 600;
			road1.y = -599 + diff1
		}
		if (road2.y >= 599)
		{
			var diff2 = road2.y - 600;
			road2.y = -599 + diff2
		}
		road1.y += playerSpeed;
		road2.y += playerSpeed;
	},

	updateScore: function() {
		if (playerScore - lastScore > 500 && currentNumberEnemies < maxNumberEnemies)
		{
			lastScore = playerScore;
			var lane = Math.floor(Math.random() * 4);
			if (lane == 2 || lane == 3)
			{
				var speed = -((Math.random() * 3) + 3)
			}
			if (lane == 0 || lane == 1)
			{
				var speed = ((Math.random() * 3) + 3)
			}
			var enemyType = Math.floor(Math.random() * 72);
			enemyList.push(new this.enemy(this.game,atlasName,enemyImages[enemyType],lane,speed,enemyHeight[enemyType]));
			enemyList[currentNumberEnemies].createEnemy();
			currentNumberEnemies += 1;
		}
		if (collision == false)
		{
			if (playerLane == 0 || playerLane == 1)
			{
				playerScore += 2*Math.round(playerSpeed/10);
				multiplierTextObject.setText('X2');
			} else {
				playerScore += Math.round(playerSpeed/10);
				multiplierTextObject.setText('');
			}
		}
		scoreTextObject.setText(playerScore.toString());
		//fpsTextObject.setText(this.game.time.fps.toString()); 
	},

	checkCollision: function() {
		for (i = 0; i < enemyList.length; i++) {
			// check vertical collision
			if (Math.abs(enemyList[i].enemySprite.y - player.y) < ((enemyList[i].enemyHeight*0.5+playerHeight*0.5)/2)*0.36*2)
			{
				// check horizontal collision
				if (playerLane == enemyList[i].enemyLane)
				{
					collision = true;
				}
			}
		}
	},

	checkEnemyCollisions: function() {
		var positionsLane0 = [];
		var positionsLane1 = [];
		var positionsLane2 = [];
		var positionsLane3 = [];
		for (i = 0; i < enemyList.length; i++) {
			if (enemyList[i].enemyLane == 0)
			{
				positionsLane0.push(enemyList[i].enemySprite.y);
			}
			if (enemyList[i].enemyLane == 1)
			{
				positionsLane1.push(enemyList[i].enemySprite.y);
			}
			if (enemyList[i].enemyLane == 2)
			{
				positionsLane2.push(enemyList[i].enemySprite.y);
			}
			if (enemyList[i].enemyLane == 3)
			{
				positionsLane3.push(enemyList[i].enemySprite.y);
			}
		}
		var maxPositionLane0 = Math.min.apply(Math, positionsLane0);
		var maxPositionLane1 = Math.min.apply(Math, positionsLane1);
		var maxPositionLane2 = Math.min.apply(Math, positionsLane2);
		var maxPositionLane3 = Math.min.apply(Math, positionsLane3);
		for (i = 0; i < enemyList.length; i++) {
			for (j = 0; j < enemyList.length; j++) {
				if (i != j) {
					if (enemyList[i].enemyLane == enemyList[j].enemyLane) {
						if (Math.abs(enemyList[i].enemySprite.y - enemyList[j].enemySprite.y) < (((enemyList[i].enemyHeight*0.5+enemyList[j].enemyHeight*0.5)/2)*(0.36*2)+50)){
							if (enemyList[i].enemySprite.y < -480*0.2) {
								if (enemyList[i].enemyLane == 0)
								{
									enemyList[i].enemySprite.y += maxPositionLane0 - (enemyList[i].enemyHeight*0.36*2+70);
									maxPositionLane0 = enemyList[i].enemySprite.y;
								}
								if (enemyList[i].enemyLane == 1)
								{
									enemyList[i].enemySprite.y += maxPositionLane1 - (enemyList[i].enemyHeight*0.36*2+70);
									maxPositionLane1 = enemyList[i].enemySprite.y;
								}
								if (enemyList[i].enemyLane == 2)
								{
									enemyList[i].enemySprite.y += maxPositionLane2 - (enemyList[i].enemyHeight*0.36*2+70);
									maxPositionLane2 = enemyList[i].enemySprite.y;
								}
								if (enemyList[i].enemyLane == 3)
								{
									enemyList[i].enemySprite.y += maxPositionLane3 - (enemyList[i].enemyHeight*0.36*2+70);
									maxPositionLane3 = enemyList[i].enemySprite.y;
								}
							}
							enemyList[i].enemySpeed = enemyList[j].enemySpeed;
						}
					}
				}
			}
		}
	},
	
	enemy: function(game,atlas,image,lane,speed,height) {
		this.game = game;
		this.atlas = atlas;
		this.enemyList = enemyList;
		this.enemyImage = image;
		this.enemyLane = lane;
		this.enemySpeed = speed;
		this.enemyHeight = height;
		this.createEnemy = function () {
			this.enemySprite = this.game.add.sprite(laneLocations[this.enemyLane],-(Math.random() * 300)-481,this.atlas,this.enemyImage);
			this.enemySprite.anchor.x = 0.5;
			this.enemySprite.anchor.y = 0.5;
			this.enemySprite.scale.x = 0.36*2;
			this.enemySprite.scale.y = 0.36*2;
		}
		this.resetEnemy = function () {
			this.enemySprite.y = -(Math.random() * 300)-481;
			this.enemyLane = Math.floor(Math.random() * 4);
			if (this.enemyLane == 2 || this.enemyLane == 3)
			{
				this.enemySpeed = -((Math.random() * 5) + 5)
			}
			if (this.enemyLane == 0 || this.enemyLane == 1)
			{
				this.enemySpeed = ((Math.random() * 5) + 5)
			}
			this.enemySprite.x = laneLocations[this.enemyLane];
		}
		this.updateEnemy = function () {
			this.enemySprite.y += playerSpeed + this.enemySpeed;
			this.enemySprite.x = laneLocations[this.enemyLane];
			if (this.enemyLane == 2 || this.enemyLane == 3)
			{
				this.enemySprite.rotation = Math.PI;
			}
			if (this.enemyLane == 0 || this.enemyLane == 1)
			{
				this.enemySprite.rotation = 0.0;
			}
			if (this.enemySprite.y >= 800+((enemyList[i].enemyHeight/2)*0.36*2)) 
			{
				this.resetEnemy();
			}
			if (this.enemySprite.y < -1500) 
			{
				this.enemySprite.y= -(Math.random() * 300)-481;
			}
		}
	}
}
