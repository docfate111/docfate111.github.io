var lastMove='';
var food;
var difficulty=20;
let song;
function setup(){
  createCanvas(70*difficulty, 40*difficulty);
  song=loadSound("immortal.mp3");
  s=new Snake();
  setLoc();
  frameRate(10);
  song.play();
}
function draw(){ 
  background(0);
  s.update(getDirection());
  if(s.eat()){
    setLoc();
  }
  s.gameover();
  s.show();
  fill('red');
  rect(food.x, food.y, difficulty, difficulty);
} 
function setLoc(){
  let cols = floor(width / difficulty);
  let rows = floor(height / difficulty);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(difficulty);
}
function getDirection(){
  if(keyIsDown(DOWN_ARROW)){
    lastMove='down';
  }
  if(keyIsDown(UP_ARROW)){
    lastMove='up';
  }
  if(keyIsDown(LEFT_ARROW)){
    lastMove='left';
  }
  if(keyIsDown(RIGHT_ARROW)){
    lastMove='right';
  }
  return lastMove;
}