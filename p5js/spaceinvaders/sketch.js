var s;
var f=[];
var shots=[];
var count=1;
//var images=[];
//let img;
//let img2;
//let img3;
//function preload(){
  //img=loadImage("https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjm9MrjnsHmAhV6GTQIHTW0C2cQjRx6BAgBEAQ&url=https%3A%2F%2Fapprecs.com%2Fios%2F305608072%2Fspace-invaders&psig=AOvVaw3B3UB57IU4FHFbVtNB82Vh&ust=1576828694448498");
  //img2=loadImage("evildude.jpg");
  //img3=loadImage("g.jpg");
  //images.push(img);
  //images.push(img2);
  //images.push(img3);
//}
function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  s=new Ship();
  //generate alien objects 
  genAliens();
}
function draw(){
  if(f.length==0){
    alert('Phase '+count.toString()+' complete! ');
    count++;
    genAliens();
  }
  background(0);
  s.show();
  for(let i=0; i<f.length; i++){
    if(!f[i].isHit(shots)){
      f[i].show();
      f[i].move();
    }else{
      //if hit remove
      f.splice(i, 1);
    }
  }
  shotTaken();
}
function shotTaken(){
    var lastX=mouseX+20;
    if(keyIsDown(DOWN_ARROW)){
      var b=new Bullet(lastX, height);
      shots.push(b);
    }
    for(let i=0; i<shots.length; i++){
      shots[i].show();
      shots[i].move();
    }
}
function genAliens(){
  for(let i=0; i<200*count; i++){
    f[i]=new Alien((80*i)+80, 50);
  }
}
function Ship(){
    this.x=mouseX;
    this.show=function(){
      fill(255);
      rect(mouseX, window.innerHeight-90, 40, 80);
    };
    this.getX=function(){
      return this.x;
    };
}
function Alien(x, y){
  this.x=x;
  this.y=y;
  this.getX=function(){
    return this.x;
  }
  this.getY=function(){
    return this.y;
  }
  this.show=function(){
    fill(255, 0,  200);
    //var i=random(0,3)
    //image(img, this.x, this.y);
    ellipse(this.x, this.y, 30, 30);
  };
  this.move=function(){
      if(width>this.x+5){
        this.x+=5;
      }else{
        this.y+=30;
        this.x=0;
      }
      if(this.y+40>height){
        this.y=50;
        alert('Game over! Play again? ');
      }
  };
  this.isHit=function(b){
      for(let i=0; i<b.length; i++){
        if(abs(this.x-b[i].getX())<=15 && abs(this.y-b[i].getY())<=15){
          return true;
        }}
      return false;
  };
}
function Bullet(x, y){
  this.x=x;
  this.y=y;
  this.move=function(){
    this.y-=10;
  };
  this.show=function(){
    fill(50, 0, 200);
    ellipse(this.x, this.y, 10, 10);
  };
  this.getX=function(){
    return this.x;
  }
  this.getY=function(){
    return this.y;
  }
}