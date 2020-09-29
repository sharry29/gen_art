const scaleFactor = Math.SQRT2;
const letters = "ABCDE";

var cellW, cellH, baseRadius;

function oneTriangle() {
  const top = createVector(Math.cos(-HALF_PI), Math.sin(-HALF_PI)).mult(
    baseRadius
  );
  const right = createVector(
    Math.cos(-PI - PI / 6),
    Math.sin(-PI - PI / 6)
  ).mult(baseRadius);
  const left = createVector(Math.cos(PI / 6), Math.sin(PI / 6)).mult(
    baseRadius
  );

  triangle(top.x, top.y, right.x, right.y, left.x, left.y);
}

function upsideDownTriangle() {
  const rad = baseRadius * scaleFactor ** 1;
  const bottom = createVector(Math.cos(HALF_PI), Math.sin(HALF_PI)).mult(rad);

  const left = createVector(
    Math.cos(-PI + PI / 6),
    Math.sin(-PI + PI / 6)
  ).mult(rad);

  const right = createVector(Math.cos(-PI / 6), Math.sin(-PI / 6)).mult(rad);
  triangle(bottom.x, bottom.y, left.x, left.y, right.x, right.y);
}

function topBotTriangle() {
  push();
  const rad = baseRadius * scaleFactor ** 1;
  const bottom = createVector(Math.cos(HALF_PI), Math.sin(HALF_PI)).mult(rad);

  const left = createVector(
    Math.cos(-PI + PI / 6),
    Math.sin(-PI + PI / 6)
  ).mult(rad);

  const right = createVector(Math.cos(-PI / 6), Math.sin(-PI / 6)).mult(rad);
  translate(0, -rad / 4);
  triangle(bottom.x, bottom.y, left.x, left.y, right.x, right.y);
  rotate(PI);
  translate(0, -rad);
  triangle(bottom.x, bottom.y, left.x, left.y, right.x, right.y);
  pop();
}

function bigTriangle() {
  const rad = baseRadius * scaleFactor ** 2;
  const top = createVector(Math.cos(-HALF_PI), Math.sin(-HALF_PI)).mult(rad);
  const right = createVector(
    Math.cos(-PI - PI / 6),
    Math.sin(-PI - PI / 6)
  ).mult(rad);
  const left = createVector(Math.cos(PI / 6), Math.sin(PI / 6)).mult(rad);

  triangle(top.x, top.y, right.x, right.y, left.x, left.y);
}

var matrix = {
  A: [oneTriangle, upsideDownTriangle, topBotTriangle, bigTriangle],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellW = windowWidth / 5;
  cellH = windowHeight / 5;

  baseRadius = Math.min(cellH, cellW) / 10;
}

function draw() {
  background(255);
  for (let i = 0; i < 5; i++) {
    line(
      0,
      (windowHeight * (i + 1)) / 5,
      windowWidth,
      (windowHeight * (i + 1)) / 5
    );
    line(
      (windowWidth * (i + 1)) / 5,
      0,
      (windowWidth * (i + 1)) / 5,
      windowHeight
    );
  }
  strokeWeight(1);
  noFill();
  translate(cellW / 2, cellH / 2);

  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      matrix[letters.charAt(i)][j]();
      translate(0, cellH);
    }
    translate(0, -windowHeight);
    translate(cellW, 0);
  }
}
