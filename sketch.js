// Declaring the sperites
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload(){
  
  // Loading images for the animation of the monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  // loading images for banana and obstacle
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 450);

  // Creating Monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  // Creating ground Sprite
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //Createing groups for food and obstacle 
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  // Giving the no. to the score and survival time
  score = 0;
  survivalTime = 0;
  
}


function draw() {
background("green");
  
  // Personalization for the score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, 500, 50);
  
  // Personalization for the Survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime, 100, 50);
  
  // code for giving the ground a continuation
  if (ground.x>0){
    ground.x = ground.width/2;
  }
  
  // Giving comand to make monkey jump
  if (keyDown("space")){
    monkey.velocityY = -12;
  }
  
  // Code for increasing score
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1;    
  }
  
  // Giving gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  // Code so the monkey didn't fall down from the ground
  monkey.collide(ground);
  
  fruits();
  obstacles();
  drawSprites();
 } 

// Making a user function fruits
function fruits(){
  if (frameCount % 80 === 0) {
    var fruit = createSprite(600,120,20,20);
    fruit.y = Math.round(random(120,200));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    
    //code to prevent memory leak
    fruit.lifetime = 300;
    
    //Adding fruits to the group
    FoodGroup.add(fruit);
  }
}

// Making a user function obstacles
function obstacles(){
  if (frameCount % 180 === 0){
    var obstacle = createSprite(600,315,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
    //code for preventing memory leak
    obstacle.lifetime = 300;
    
    // Adding obstacles to the group 
    obstacleGroup.add(obstacle);
  }
}