var x=200;
var y=200;
var speed=6;
var speedY=7;
var compPoints=0;
var count=0;
function setup(){
    createCanvas(1410, 850);
}
function draw(){
    background(0);
    fill(255, 255, 255);
    rect(0, mouseY, 15, 350);
    fill(255, 255, 255);
    rect(1395, y-175, 15, 350);
    fill(238, 22, 22);
    ellipse(x, y, 40, 40);
    x += speed;
    y += speedY;
    if ((x>(width-40)) || (x<40)) {
      speed *= -1;
      if(x<100){
        if(speedY<0){
          if(abs(mouseY-y)>200){
            compPoints+=1;
            alert("The computer has scored: "+compPoints.toString()+" points ");
          }
      }else{
          if(abs(mouseY-y)>350){
            compPoints+=1;
            alert("The computer has scored: "+compPoints.toString()+" points ");
          }
        }
    }}
    // if the ball hits the top or the bottom, change the direction of the ball 	
    if (y > (height-3) || y < 3) {
      speedY *= -1;
    }
    count+=1;
    if(count%2100==0){
      alert("Let's make this harder!");
      speed*=1.25;
      speedY*=1.25;
    }
}
