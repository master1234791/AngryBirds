const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var gameState = "onSling";
var score = 0;
var engine, world;
var ground;
var box1;
var box2, box3, box4, box5;
var log1, log2, log3, log4;
var bird;
var pig1, pig2;
var backgroundImg;
var constraintLog;
var chain;
var platform;
var slingshot;
var bg;
var bg2;
var bg3;
function preload(){
  backgroundImg = loadImage("bg.png");
  bg2 = loadImage("bg2.jpg");
  bg3 = loadImage("bg3.png");
  //getBackgroundImg();
}

function setup() {
  var canvas = createCanvas(1200,400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600,height,1200,20);
  box1 = new Box (700,320,70,70);
  box2 = new Box (920,320,70,70);
  box3 = new Box (700,240,70,70);
  box4 = new Box (920,240,70,70);
  box5 = new Box (810, 160,70,70);
  log1 = new Log (810,260,300,PI/2);
  log2 = new Log (810, 180, 300, PI/2);
  log3 = new Log (760, 120, 150, PI/7);
  log4 = new Log (868, 120, 150, -PI/7.5);
  bird = new Bird (200, 50);
  pig1 = new Pig (800,370);
  pig2 = new Pig (800,230);
  platform = new Ground (150,305,300,170);
  constraintLog = new Log (230,180,80, PI/2);

  
slingshot = new Slingshot(bird.body,{x:200,y:50});


 
}
function draw() {
  if(backgroundImg);
  background(backgroundImg);
  textSize(50);
  fill("brown");
  text(score,1000,50);
  Engine.update(engine);
  ground.display();
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  log1.display();
  log2.display();
  log3.display();
  log4.display();
  bird.display();
  pig1.display();
  pig2.display();
  platform.display();
  constraintLog.display();
  slingshot.display();
}
function mouseDragged() {
  if(gameState!=="launched"){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
  }
  
}

function mouseReleased(){
  slingshot.fly();
  gameState = "launched"
}
function mousePressed()
  //if(keyCode == 32) {
    bird.trajectory =[];
    score ++;
    Matter.Body.setPosition(bird.body,{x:200, y:50});
    slingshot.attach(bird.body);
    gameState = "onSling"
 // }
}
async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Mexico");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  console.log(hour);
  if (hour>6 && hour<17) {
    bg = "bg.png"
  } else if(hour>=17 && hour<21){
    bg = "bg3.png";
  }else {
    bg = "bg2.jpg";
  }

 backgroundImg = loadImage(bg);
}
