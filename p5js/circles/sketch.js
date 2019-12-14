function setup() {
  // put setup code here
  createCanvas(1500, 1000)
}

function draw() {
  if(mouseIsPressed){
    fill(random(0, 255));
  }else{
    fill(random(0, 255));
  }
  ellipse(mouseX, mouseY, 80, 80)
  // put drawing code here
}