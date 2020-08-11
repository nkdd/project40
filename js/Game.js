class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once('value');

      if(playerCountRef.exists()) {
       // console.log("111  "+playerCount);
      //  playerCount = playerCountRef.val();
       // console.log("222  "+playerCount);
        player.getCount();
      //  console.log("333  "+playerCount);
      }
      form = new Form()
      form.display();
    }

    p1 = createSprite(100,200);
    p1.addImage("p1",p1Image);
    p2 = createSprite(100,500);
    p2.addAnimation("p2",p2Image);
    p2.scale = 2;
    players = [p1,p2];
  }

  // start() {
  //   if(gameState === 0) {
  //     player = new Player();
  //     player.getCount();
  //     form = new Form()
  //     form.display();

  //   }
  // }

  play() {
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();

    player.getPlayersAtEnd();

   // console.log(allPlayers);
   
    if(allPlayers!=undefined) {
      background(198,135,103);
      image(track,-displayWidth,0,displayWidth*6,displayHeight*4);
      var index = 0;
      var x ;
      var y = 100;

      for(var plr in allPlayers) {
        index = index+1;
        y = y +300;
        x = displayWidth - allPlayers[plr].distance;

        players[index-1].x = x;
        players[index-1].y = y;

        if(index === player.index) {
          //console.log("index==  "+index);
          players[index-1].shapeColor = "red";
          camera.position.x = players[index-1].x;
          camera.position.y = displayHeight/2;
        }
      }
      
      if(keyIsDown(RIGHT_ARROW) && player.index!=null) {
        player.distance -=50;
        //console.log(player.distance);
        player.update();
      }
      if(player.distance<=-5100) {
       // console.log(player.distance);
        gameState = 2;
        player.rank+=1;
        Player.updatePlayersAtEnd(player.rank);
        alert("Hurrya "+player.name+" Finished Race at "+player.rank+" position");
      }

       drawSprites(); 
    
    }

    
  }

  end() {
    console.log("Game ENDEd");
    game.update(2);
  }
}
