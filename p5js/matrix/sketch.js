function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  l=[];
  for(var i=0; i<random(200, 800); i++){
        for(var j=0; j<width; j+=80){
          l.push(new symbol(j));
        }
    }
}
function draw() {
  background(0);
  l.forEach(function(line){
    line.fall();
    line.show();
  });
}
function symbol(x){
  this.x=x;
  this.y=random(-height*3, -height);
  this.speed=abs(mouseY)*40
  this.a=-5;
  this.randomSymbol=function(){
    return String.fromCharCode(0x30A0+round(random(0, 96)));
  };
  this.show=function(){
    fill(0, 255, 70);
    textSize(50);
    text(this.randomSymbol(), this.x, this.y);
  };
  this.fall=function(){
    this.y+=this.speed;
    this.speed+=this.a;
    /*if(this.speed<=5){
      this.speed+=random(80, 300);
    }*/
    if(this.y>height){
      this.y=random(0, height/2);
    }
  };
}
