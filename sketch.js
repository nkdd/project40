var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var form, player, game;
var allPlayers;

var p1,p2,players;
var track,p1Image,p2Image;
function preload() {
  track = loadImage("images/olympic.jpg");
  p1Image = loadImage("images/by.png");
  p2Image = loadImage("images/p.png","b.png","y.png");
}
function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  console.log("**********  "+gameState);
  if(playerCount === 2 && gameState === 0) {
    game.update(1);
  }
  if(gameState === 1) {
    clear();
    //console.log("inside gamestate 1 but : "+gameState );
    game.play();
  } 
   if(gameState === 2) {
    
    game.end();
  }
}
