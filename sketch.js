let myFont;
let textFontSize = 100;
let targetText = "Happy Mother's Day!";
let bgColor = "#DBA894";
let targetTextColor = "#E9FAE3";

let points;
let name_input;
let flowers;
let pointFlowerProbability = 0.02;
let textBoundary;

function preload() {
  myFont = loadFont("public/Pacifico-Regular.ttf");
}

function resetCanvas() {
  background(bgColor);
}

function initFlowers() {
  resetCanvas();
  flowers = [];
  name = name_input.value();
  if (name != "") {
    targetText = name;
  }

  textAlign(LEFT);
  points = myFont.textToPoints(targetText, 0, 0, textFontSize, {
    sampleFactor: 1,
    simplifyThreshold: 0,
  });

  let bounds = myFont.textBounds(targetText, 0, 0, textFontSize);

  for (let pt of points) {
    pt.x = pt.x - bounds.x - bounds.w / 2;
    pt.y = pt.y - bounds.y - bounds.h / 2;
  }
  textBoundary = bounds;

  let lastPointCount = 0;
  for (let pt of points) {
    if (random(0, 1) < pointFlowerProbability && lastPointCount >= 10) {
      flower = new Flower(pt.x, pt.y, 5, 0.1);
      flowers.push(flower);
      lastPointCount = 0;
    } else {
      lastPointCount++;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgColor);

  name_input = createInput();
  name_input.position(510, 65);
  name_input.class('name-input');

  button = createButton("Submit");
  button.position(750, 65 );
  button.class('submit-button');

  button.mousePressed(initFlowers);
  caption = createElement("h3", "𓇢𓆸 Enter text here! 𓇢𓆸");
  caption.position(500, 5);
  caption.class('caption-text');

  initFlowers();
}

function drawTargetText() {
  fill(targetTextColor);
  textSize(textFontSize);
  textFont(myFont);
  text(
    targetText,
    width / 2 - textBoundary.x - textBoundary.w / 2,
    height / 2 - textBoundary.y - textBoundary.h / 2
  );
}

function draw() {
  background(bgColor);
  drawTargetText();
  translate(width / 2, height / 2);
  for (let flower of flowers) {
    flower.draw();
    flower.update();
  }
}
