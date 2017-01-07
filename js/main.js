console.log(Phaser);
//This sets the variable for the spacebar.
var spaceKey;
var platforms;
var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image('player', 'assets/rocky.jpg');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#3498db';


	platforms = game.add.group();
	platforms.enableBody = true;

	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;

	player = game.add.sprite(game.width/8, GAME_HEIGHT*(0/4), 'player');
	game.physics.arcade.enable(player);

	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;

	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,0.2);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
  	obstacle.body.immovable = true;
  	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});

};



function update(){

	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);

	if (spaceKey.isDown && player.body.touching.down) {
		player.body.velocity.y = -300
	}

	if (obstacle.x > 600) {
	obstacle.x -= 0.5
	}

	if (obstacle.x < 5 && player.x > 5) {

		score += 10000000000000000;

		scoreText.text = 'score: ' + score;

	}

	if (obstacle.x < 0) { 
	obstacle.kill();
	obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
	obstacle.scale.setTo(1,0.2);
	obstacle.anchor.setTo(0,1)
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;
	}

	
	if (player.x < 0) {
		scoreText = game.add.text(350,200, 'YOU LOSE! YOU SUCK!', {fill: '#ff0000'});
		obstacle.kill();
		player.kill()
	}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });



game.state.start();