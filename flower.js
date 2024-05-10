let flowerColor = '#FFCE00';
let flowerCenterColor = '#A55E55';``
let flowerWidth = 1;
let flowerHeight = 3;

function Flower(x, y, maxSize, growthRate) {
  this.x = x;
  this.y = y;
  this.maxSize = maxSize;
  this.currSize=0.05;
  this.growthRate = growthRate;
  this.rotationVal = 0;
  
  this.draw = function() {
    push();
    translate(this.x, this.y);
    ellipseMode(CENTER);
    noStroke();
    fill(flowerColor);
    
    rotate(radians(this.rotationVal));
    push();
    ellipse(0, 0, flowerWidth*this.currSize, flowerHeight*this.currSize);
    rotate(radians(360/3));
    ellipse(0, 0, flowerWidth*this.currSize, flowerHeight*this.currSize);
    rotate(radians(360/3));
    ellipse(0, 0, flowerWidth*this.currSize, flowerHeight*this.currSize);
  
    fill(flowerCenterColor);
    ellipse(0, 0, flowerWidth*this.currSize, flowerWidth*this.currSize);
    pop();
    
    pop();
  }
  
  this.update = function() {
    if(this.currSize >= this.maxSize) {
      this.currSize = this.maxSize;
      this.rotationVal += 0.4 + random(0, 1);
    } else {
      this.currSize += this.growthRate;
      this.rotationVal = this.currSize;
    }
  }
}