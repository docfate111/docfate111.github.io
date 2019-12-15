let theta;
function setup(){
    createCanvas(1400, 800);
}
function draw() {
  background(0);
  frameRate(30);
  stroke(255);
  let a = (mouseX / width) * 90;
  theta = radians(a);
  translate(width/2,height/2);
  circle(width/2,height/2,40,-120);
  translate(0,-120);
  branch(120);
}

function branch(h) {
  h *= 0.66;
  if (h > 2) {
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(theta);   // Rotate by theta
    fill(random(255), random(255), random(255));
    ellipse((width-1600)/4, (height+900)/4, 40, -h);  // Draw the branch
    translate(mouseY/10, -h); // Move to the end of the branch
    branch(h);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
    console.log((width-1600)/4, (height-1200)/4);
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    fill(random(255), random(255), random(255));
    ellipse((width-1600)/4, (height+900)/4, 40, -h);
    translate(mouseY/10, -h);
    branch(h);
    pop();
  }
}