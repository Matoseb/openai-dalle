import './style.css'
import { replace } from './ai.js'
import { urlToFile } from './utils.js'
import "./formdata-polyfill.js"

const btn = document.querySelector('#generate')
btn.onclick = async () => {
  btn.disabled = true
  // canvas to file
  const file = await urlToFile('./elon.png')
  const imgSrc = await replace(file)
  const img = document.querySelector('#result')
  img.src = imgSrc
  btn.disabled = false
}