var player;
var hinder = [];
var score = 0;
var dispScore = 0;
var scoreMult = 0.15;

function setup() {

  createCanvas(900, 450);
  
  background(255);
  
  line(0, height*0.90, width, height*0.90);
  stroke(100);
  player = new Player();
}

function preload() {
  img = loadImage('player.png');
  img2 = loadImage('trexV3-Edited.png');
}

function draw() {
  background(255);
  
  line(0, height*0.90, width, height*0.90);
  stroke(100);
  
  player.drawP();
  player.jump();
  player.grav();
  
  Newhinder();
  
  for (var i = 0; i < hinder.length; i++){
    hinder[i].drawH();
    hinder[i].move();
    
    if (135 > hinder[i].x && 100 < hinder[i].x && (player.y + player.h) >= hinder[i].y || 135 > (hinder[i].x + 35) && 100 < (hinder[i].x + 35) && (player.y + player.h) >= hinder[i].y){
      alert('Score:' + ' ' + dispScore);
      noLoop();
    }
    
    
  }
  Score();
}

function Score(){
  dispScore = Math.round(score);
  textSize(32);
  text('Score' + ' ' + dispScore, 700, 50);
  scoreMult += 0.0001;
  score += scoreMult;
}

var o = 0;
var randomNum = 0;
var speed = 8;
var anthinder = 0.01;
function Newhinder(){
  
  randomNum = Math.random();
  
  if (randomNum < anthinder){
    hinder[o] = new Hinder(speed);
    o++;
  }
  
  if (speed < 20){
    speed += 0.003;
  }
  
  else if (anthinder < 0.4) {
    anthinder += 0.001;
  }
  
}

class Player{
  
  constructor(){
    this.x = 100;
    this.y = height*0.9 - 60;
    this.w = 35;
    this.h = 60;
    
    this.v = 0;
    this.acc = 0.7;
    this.g = 0.3;
  }
  
  drawP(){
    image(img, this.x, this.y, this.w, this.h);
  // rect(this.x, this.y, this.w, this.h);
  }
  
  grav(){
    if (this.y >= (height*0.9 - 60)){
      this.v = 0;
      this.y = height*0.9 - 60;
    }
    
    else {
      this.v += this.g;
      this.y += this.v;
    }
    
  }
  
  jump(){
    var jumping;
    if(this.y == height * 0.9 - 60){
      jumping = true;
    }
    
    if (keyIsDown(32)){
      if( jumping === true){
        for (var i = 0; i < 10; i++){
          this.v -= this.acc;
          this.y += this.v;
        }
      }
      else if(jumping === true){
        jumping === false;
      }
    }
  }
}

class Hinder{
  
  constructor(V){
    this.x = width;
    this.y = height*0.9 - 60;
    this.w = 35;
    this.h = 60;
    
    this.v = V;
  }
  
  drawH(){
    image(img2, this.x, this.y, this.w, this.h);
  //  rect(this.x, this.y, this.w, this.h);
  }
  
  move(){
    this.x -= this.v;
  }
  
}

