//SEB
export async function urlToFile(url) {
  const blob = await fetch(url).then((res) => res.blob());
  return blobToFile(blob);
}

// function to convert canvas to file
export async function canvasToFile(canvas) {
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  return blobToFile(blob);
}

export function blobToFile(blob) {
  const file = new File([blob], "image.png", blob);
  return file;
}

//OG
export function cropCanvasToSquare(sourceCanvas, detections) {
  detections.forEach((detection) => {
    const x = detection.x;
    const y = detection.y;
    const dim = Math.min(detection.w, detection.h);
    let destCanvas = document.createElement("canvas");
    destCanvas.width = dim;
    destCanvas.height = dim;

    destCanvas.getContext("2d").drawImage(
      sourceCanvas,
      x,
      y,
      dim,
      dim, // source rect with content to crop
      0,
      0,
      dim,
      dim
    ); // newCanvas, same size as source rect
    console.log(destCanvas.toDataURL());
    return destCanvas;
  });
}

export function createCanvas(srcImg) {
  let width, height;
  let myCanvas = document.createElement("canvas");
  let ctx = myCanvas.getContext("2d");

  var i = new Image();

  i.onload = () => {
    console.log(i.width + ", " + i.height);
    width = i.width;
    height = i.height;
    myCanvas.width = width;
    myCanvas.height = height;

    ctx.drawImage(i, 0, 0);
    document.body.appendChild(myCanvas);
  };

  i.src = srcImg;
}

export function toBase64(source) {
  const dataURL = source.toDataURL();
  return dataURL;
  // Logs data:image/png;base64,wL2dvYWwgbW9yZ...
  // Convert to Base64 string
  // const base64 = getBase64StringFromDataURL(dataURL);
  // return base64;
}

export function toDataURL(url) {
  let xhRequest = new XMLHttpRequest();
  xhRequest.onload = function () {
    let reader = new FileReader();
    reader.onloadend = function () {
      // console.log(reader.result);
      //   callback(reader.result);
    };
    reader.readAsDataURL(xhRequest.response);
  };
  xhRequest.open("GET", url);
  xhRequest.responseType = "blob";
  xhRequest.send();
}

export function base64ToImg(img) {
  var canvas = document.getElementById("c");
  var ctx = canvas.getContext("2d");

  var image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
  };
  image.src = img;

  return canvas;
}
