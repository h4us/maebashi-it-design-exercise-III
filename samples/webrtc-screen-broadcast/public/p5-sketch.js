/* eslint-disable no-undef, no-unused-vars */

let v;
let playing = false;

const delayLines = [];
const numDelayLines = 5;
const delayTime = 30;

function setup() {
  createCanvas(640, 480);

  pixelDensity(1);
  v = createCapture(VIDEO);
  v.hide();

  for (let i = 0; i < numDelayLines; i++) {
    delayLines.push([]);
  }
}

function draw() {
  image(v, 0, 0);

  for (let i = 0; i < numDelayLines; i++) {
    delayLines[i].push(v.get());

    if (delayLines[i].length > delayTime * (i + 1)) {
      const ld = delayLines[i].shift();
      image(
        ld,
        0,
        v.height * Math.pow(0.5, i),
        v.width * Math.pow(0.5, i),
        v.height * Math.pow(0.5, i)
      );
    }
  }
}
