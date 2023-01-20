import { Camera } from "./main.js";
let faceapi;

export let btns = [
  {
    name: "cameraTrigger",
    id: "camera--trigger",
    dispatch: "shoot",
  },
  {
    id: "photo--close",
    dispatch: "close",
  },
  {
    id: "submit--trigger",
    dispatch: "submit",
  },
];

export function appInit() {
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
  };
  // Initialize the magicFeature
  faceapi = ml5.faceApi(detectionOptions, modelLoaded);

  // When the model is loaded
  function modelLoaded() {
    console.log("Model Loaded!");
    cameraStart();
  }

  // Set constraints for the video stream
  let constraints = { video: { facingMode: "user" }, audio: false };
  let track = null;

  // Access the device camera and stream to cameraView
  function cameraStart() {
    const cameraView = document.querySelector("#camera--view");
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
      })
      .then(() => {
        addBtnFn();
      })
      .catch((error) => {
        console.error("Oops. Something is broken.", error);
      });
  }
}

function addBtnFn() {
  btns.forEach((element) => {
    const selector = document.querySelector(`#${element.id}`);
    selector.addEventListener("click", () => {
      Camera.dispatch(element.dispatch);
      console.log(element.id, element.dispatch);
    });
    element.show = () => selector.classList.remove("hidden");
    element.hide = () => selector.classList.add("hidden");
  });

  window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 83) {
      console.log(Camera.state);
    }
  });
  Camera.dispatch("startCamera");
}

export { faceapi };
