function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  l=[];
  for(var i=0; i<random(200, 900); i++){
        for(var j=0; j<width; j+=80){
          l.push(new symbol(j));
        }
    }
}
function draw() {
  background(0);
  l.forEach(function(line){
    line.fall(abs(mouseX));
    line.show();
  });
}
function symbol(x){
  this.x=x;
  this.y=random(-height*3, -height);
  this.randomSymbol=function(){
    return String.fromCharCode(0x30A0+round(random(0, 96)));
  };
  this.show=function(){
    fill(0, 255, 70);
    textSize(50);
    text(this.randomSymbol(), this.x, this.y);
  };
  this.fall=function(x){
    this.y+=x;
    if(this.y>height){
      this.y=random(0, height);
    }
  };
}