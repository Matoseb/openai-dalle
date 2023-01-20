import { Configuration, OpenAIApi } from "openai";
import { cropCanvasToSquare } from "./utils.js";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const defaultPrompt = "realistic portrait of a normal person";

export function swapFace(detections) {
  console.log("features", selectFeatures(detections));
}

export async function replace(file, prompt = defaultPrompt) {
  console.log("generating...");
  const response = await openai.createImageEdit(
    file,
    file, // mask
    prompt,
    1,
    "1024x1024",
    "b64_json"
  );
  const { b64_json } = response.data.data[0];
  return `data:image/png;base64,${b64_json}`;
}

function selectFeatures(detections) {
  const obj = detections[0].parts;
  let { leftEye, rightEye, mouth, nose } = obj;
  const features = [
    { x: leftEye[3]._x, y: leftEye[3]._y }, // left eye
    { x: rightEye[3]._x, y: rightEye[3]._y }, // right eye
    { x: mouth[3]._x, y: mouth[3]._y }, // nose
    { x: nose[3]._x, y: nose[3]._y }, // mouth
  ];

  return features;
}
