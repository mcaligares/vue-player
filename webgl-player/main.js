import './style.css'
import { videoSrc1, videoSrc2, imageSrc1, imageSrc2, loadVideo, loadImage } from '../src/services/canvas.service'
import { createWebGL, getContext, getTransition } from './video.service'

const WIDTH = 1100;
const HEIGHT = 900;
const FRAME_RATE = 33
const FPS = 1000 / FRAME_RATE
const transitionIdx = 8

// const videoFrom = await loadVideo('./assets/sample_960x540.mp4');
// const videoTo = await loadVideo('./assets/mov_bbb.mp4');

const imageFrom = await loadImage(imageSrc1);
const imageTo = await loadImage(imageSrc2);

const canvas = createWebGL(WIDTH, HEIGHT)

const gl = getContext(canvas)

const { transition, from, to } = getTransition(gl, imageFrom, imageTo, transitionIdx)

let frame = 0
const ctx = document.getElementById('canvas').getContext('2d')

const loop = (value) => {
  frame = frame + 10
  const progress = (frame/1000) % 1
  document.getElementById('frames').textContent = `[ ${progress} ,${frame}]`
  transition.draw(value || progress, from, to, canvas.width, canvas.height)
  // const image = document.createElement('img')
  // image.src = canvas.toDataURL()
  // ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
}

setInterval(loop, FPS)
// loop(0.2)