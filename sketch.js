var sword, swordImage;
var fruitsGroup;
var gameState = 1;
var PLAY = 1;
var END = 0;
var gameState = 1;
var fruit;
var fruit1,fruit2,fruit3,fruit4;
var monsterImage;
var enemyGroup;
var score = 0;
var gameOverImage;
var knifeswoosh,gameOverSound;


function preload()
{
 swordImage = loadImage("knife.png");
 fruit1 = loadImage("fruit1.png");
  fruit2= loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  knifeswoosh = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
 
}

function setup() 
{
  createCanvas(550,550);
  sword = createSprite(10,5,10,10);
 sword.addImage(swordImage)
  sword.scale = 0.5
  sword.velocityY = 2;
  
  gameOver = createSprite(100,200,10,10);
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5;
  
 fruitsGroup = createGroup();
 enemyGroup = createGroup();
  
  
}

function draw()
{
  background("lightblue")

  
  if(gameState===PLAY) {
  
    gameOver.visible = false;
    fruit();
    enemy();
    if(fruitsGroup.isTouching(sword)) {
      knifeswoosh.play();
     fruitsGroup.destroyEach();
     score = score+1;
    }   
    sword.y = World.mouseY;
   sword.x = World.mouseX;
       
  }

  if(enemyGroup.isTouching(sword)) 
  {
    gameOverSound.play();
    //console.log("hi");
    gameState=END;
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
  }

  drawSprites();
  text("Score: "+ score,500,50);
}

function fruit() 
{
  if(World.frameCount%80 === 0) 
  {
   var fruit = createSprite(400,200,20,20);
     fruit.scale = 0.2;
     
   r = Math.round(random(1,4));
    if(r == 1) {
     fruit.addImage(fruit1);
    } else if(r == 2) {
      fruit.addImage(fruit2);
    } else if(r == 3) {
      fruit.addImage(fruit3);
    } else if(r == 4) {
       fruit.addImage(fruit4);
    } 
    fruit.y=Math.round(random(50,340));
     
    fruit.velocityX = -(7+(10/5));
    fruit.setLifetime = 100
     
    fruitsGroup.add(fruit);
  }
  
}

function enemy() {
  if(World.frameCount%200===0) {
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(10/4));
    monster.setLifetime=50;
    enemyGroup.add(monster);
    
  }
 }
