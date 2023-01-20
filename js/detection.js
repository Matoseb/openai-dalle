import { Camera } from "./main.js";
import { toBase64, toDataURL } from "./utils.js";
import { faceapi } from "./init.js";
import { swapFace } from "./swapFace.js";
let canvas, ctx, detections, myImage, width, height, img;
let detectionBoxes = [];

//called when photo is taken
export const modelDetect = (img) => {
  myImage = img;
  const srcCanvas = document.querySelector("#camera--result");
  canvas = document.querySelector("#detections--canvas");
  ctx = canvas.getContext("2d");
  canvas.width = width = srcCanvas.width;
  canvas.height = height = srcCanvas.height;

  faceapi.detect(img, gotResults);
};

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  detections = result;

  if (!detections) {
    console.log("no faces detected");
    return;
  }

  drawBoxes(detections);
  // Camera.dispatch("selected");
}

function drawBox(detections) {
  const alignedRect = detections[0].alignedRect;
  const { _x, _y, _width, _height } = alignedRect._box;
  // canvas.fillStyle = 'none';
  ctx.rect(_x, _y, _width, _height);
  ctx.strokeStyle = "#a15ffb";
  ctx.stroke();
}

function drawBoxes(detections) {
  if (detections.length > 0) {
    detections.forEach((face) => {
      const aR = face.alignedRect._box;
      const faceBox = {
        x: aR._x,
        y: aR._y,
        w: aR._width,
        h: aR._height,
        wasClicked: false,
      };
      detectionBoxes.push(faceBox);
      console.log("detectionBoxes: ", detectionBoxes);

      let { _x, _y, _width, _height } = face.alignedRect._box;
      ctx.rect(_x, _y, _width, _height);
      ctx.strokeStyle = "#ff0000";
      ctx.stroke();
    });
  }
}

export const updateDetections = (e) => {
  console.log(e.offsetX, e.offsetY);
  console.log("clicked on canvas");
  // Camera.dispatch("selected");
  Camera.dispatch("updateUI");

  ctx.clearRect(0, 0, width, height);
  // ctx.drawImage(img, 0, 0, width, height);
  detectionBoxes.forEach((box) => {
    ctx.beginPath();
    ctx.strokeStyle = "#00ff00";
    if (
      (e.offsetX > box.x &&
        e.offsetX < box.x + box.w &&
        e.offsetY > box.y &&
        e.offsetY < box.y + box.h) ||
      box.wasClicked
    ) {
      box.wasClicked = true;
      ctx.strokeStyle = "#00ff00";
      console.log("TOUCH BOX");
    } else {
      ctx.strokeStyle = "#ff0000";
    }
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.stroke();
    ctx.closePath();
  });
};

export const clearDetections = () => {
  ctx.clearRect(0, 0, width, height);
  detectionBoxes = [];
};
