var obs=[];
var b;
var count=0;
function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  makeObstacles();
  b=new Bird();
}
function draw() {
  background(0);
  b.show();
  b.move();
  for(var i=0; i<obs.length; i++){
    obs[i].show(i);
  }
  fill(255);
  textSize(40);
  text('Use up arrow key to flap!', width/4, 30);
}
function Rod(x){
  this.r=random(100, 200);
  this.g=random(100, 200); 
  this.b=random(100, 200); 
  this.a=random(100, 200); 
  this.x=x;
  this.y=0;
  this.width=random(10, 20);
  this.height=random(100, height/2);
  this.gap=random(200, 500);
  this.show=function(){
    fill(this.r, this.g, this.b, this.a);
    rect(this.x, this.y, this.width, this.height);
    rect(this.x, this.height+this.gap, this.width, height/2);
  };
  this.getSafeYs=function(){
    var l=[];
    l.push(this.height);
    l.push(this.height+this.gap);
    return l;
  };
  this.getX=function(){
    return this.x;
  }
  this.getWidth=function(){
    return this.width;
  }
}
function makeObstacles(){
  obs=[];
  for(var i=1; i<80; i++){
    obs.push(new Rod(80*i+80));
  }
}
function Bird(){
  this.x=0;
  this.y=0;
  this.canMove=true;
  this.move=function(){
    if(keyIsDown(UP_ARROW) && this.canMove){
      this.y-=15;
    }
    if(this.y+15>=height){
      gameOver();
      this.y=0;
    }else{
      this.y+=5;
    }
    if(this.x+10>=width){
      this.x=0;
      makeObstacles();
    }
    this.x+=2;
    if(this.x>11 && this.x%80==0){
      count++;
    }
    for(let i=0; i<obs.length; i++){
      if(abs(obs[i].getX()-this.x)<=obs[i].getWidth()){
        var l=obs[i].getSafeYs();
        if((this.y<l[0]) || (this.y>l[1])){
          gameOver();
        }
      }
    }
  };
  this.show=function(){
    fill(255);
    square(this.x, this.y, 30);
  };
  this.set=function(x, y){
    this.x=x;
    this.y=y;
  }
}
function gameOver(){
  alert('Your score was: '+(count-2).toString()+' \nGame over');
  b.set(0, 0);
  makeObstacles();
  count=0;
}