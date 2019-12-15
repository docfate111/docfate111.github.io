function Snake(){
  this.x=0;
  this.y=0;
  this.coords=[];
  this.speedx=difficulty;
  this.speedy=difficulty;
  this.length=0;
  this.update=function(dir){
    for(var i=0; i<this.coords.length-1; i++){
      this.coords[i]=this.coords[i+1];
    }
    if(this.length>=1){
      this.coords[this.length-1]=createVector(this.x, this.y);
    }
    this.move(dir);
  }
  this.gameover=function(){
    for(var i=0; i<this.coords.length; i++){
        var curr=this.coords[i];
        if((abs(curr.x-this.x)<1 && abs(curr.y-this.y)<1)){
          noLoop();
          alert('Game over');
          loop();
          this.length=0;
          this.coords=[];
        }
    }
  }
  this.eat=function(){
    if(abs(food.x-this.x)<=5 && abs(food.y-this.y)<=3){
      //make snake longer
      this.length++;
      return true;
    }
  };
  this.move=function(dir){
    if(this.x<=width && this.x>=0){
      if(dir==='left'){
        this.x-=this.speedx;
      }
      if(dir==='right'){
        this.x+=this.speedx;
      }
    }else{
      this.x=300;
      this.y=300;
      noLoop();
      alert('Game over');
          this.length=0;
          this.coords=[];
          loop();
    }
    if(this.y<=height && this.y>=0){
      if(dir==='up'){
        this.y-=this.speedy;
      }
      if(dir==='down'){
        this.y+=this.speedy;
      }
    }else{
      this.x=300;
      this.y=300;
      noLoop();
      alert('Game over');
          this.length=0;
          this.coords=[];
          loop();
    }
  };
  this.show=function(){
    fill(255);
    for(var i=0; i<this.coords.length; i++){
      rect(this.coords[i].x, this.coords[i].y, difficulty, difficulty);
    }
    rect(this.x, this.y, difficulty, difficulty);
  };
}