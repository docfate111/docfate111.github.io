var shapes=[];
var fallen=[];
var s;
var count=1;
function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  genShape();
}
function draw() {
  background(0);
  fill(255);
  textSize(40);
  text('Use arrow keys to move blocks!', width/4, 30);
  for(let i=0; i<count; i++){
    shapes[i].move(i);
    shapes[i].show();
  }
}
function Shape(x, y){
    this.x=x;
    this.y=y;
    this.canMove=true;
    this.firstTime=true;
    this.height=random(30, 90);
    this.width=random(30, 90);
    this.r = random(100, 200);
    this.g = random(100, 200); 
    this.b = random(100, 200); 
    this.a = random(100, 200); 
    this.getWidth=function(){
      return this.width;
    };
    this.getHeight=function(){
      return this.height;
    };
    this.getX=function(){
      return this.x;
    };
    this.getY=function(){
      return this.y;
    };
    this.move=function(){
      if(this.y<10 && !this.canMove){
        restart();
      }
      if(this.y+50>=height){
        this.canMove=false;
        if(this.firstTime==true){
          if(count%69!=0){
            count++;
          }else{
            genShape();
            count++;
          }
          fallen.push(this);
          this.firstTime=false;
        }
        return;
      }
        //if a shape touches anther it cannot move
        for(let i=0; i<fallen.length; i++){
          //if not itself
            if((abs(fallen[i].getY()-this.y)<(fallen[i].height+this.y)/10) && abs(fallen[i].getX()-this.x)<(fallen[i].width+this.x)/15){
              this.canMove=false;
            }
        }
      if(keyIsDown(LEFT_ARROW) && this.canMove){
        this.y+=5;
        this.x-=10;
        return;
      }else if(keyIsDown(RIGHT_ARROW) && this.canMove){
        this.x+=10;
        this.y+=5;
        return;
      }else if(this.canMove){
        this.y+=5;
        return;
      }else{
        if(this.firstTime==true){
          if(count%69!=0){
            count++;
          }else{
            genShape();
            count++;
          }
          fallen.push(this);
          this.firstTime=false;
        }
      }
    }
    this.show=function(){
      noStroke();
      fill(this.r, this.g, this.b, this.a);
      rect(this.x, this.y, this.width, this.height);
    };
}
function genShape(){
  for(var i=0; i<200; i++){
    shapes.push(new Shape(random(50, width-50), 0));
  }
}
function restart(){
  alert('Game over! Restart? ');
  shapes=[];
  fallen=[];  
  count=1;
  genShape();
}