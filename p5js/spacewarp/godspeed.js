l=[];
function setup() {
  createCanvas(1500, 1000);
  background(0);
  for(var i=0; i<800; i++){
    l.push(new star());
  }
}

function draw(){
  speed=1.1*map(mouseX, 0, width, 0, 50);
  translate(width/2, height/2);
  for(var i=0; i<l.length; i++){
    l[i].show();
    l[i].update();
  }
}
function star(){
  this.x=random(-width, width);
  this.y=random(-height, height);
  this.z=random(0, width);
  this.pz=this.z;
  this.show=function(){
    fill(255);
    noStroke();
    var sx=map(this.x/this.z, 0, 1, 0, width);
    var sy=map(this.y/this.z, 0, 1, 0, height);
    var r=map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);
    var px=map(this.x/this.pz, 0, 1, 0, width);
    var py=map(this.y/this.pz, 0, 1, 0, height);
    this.pz=this.z;
    stroke(255);
    line(px, py, sx, sy);
  };
  this.update=function(){
    this.z-=speed;
    if(this.z<1){
      this.z=width;
      this.x=random(-width, width);
      this.y=random(-height, height);
    }
  };
}