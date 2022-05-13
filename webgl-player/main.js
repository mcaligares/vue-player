import './style.css'
import { videoSrc1, videoSrc2, imageSrc1, imageSrc2, drawFramesCount, loadVideo, loadImage } from '../src/services/canvas.service'
import transitions from 'gl-transitions'
import createTransition from 'gl-transition'
import createTexture from 'gl-texture2d'

const width = 1100;
const height = 900;
const transactionIdx = 7

const videoFrom = await loadVideo('./assets/sample_960x540.mp4');
const videoTo = await loadVideo('./assets/mov_bbb.mp4');

// const imageFrom = await loadImage(imageSrc1);
// const imageTo = await loadImage(imageSrc2);
// ^ NB: we just assumed you have these 2 imageFrom and imageTo Image objects that have the image loaded and ready

// initialization canvas
const app = document.getElementById('app')

const canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height;
app.appendChild(canvas)
console.log('canvas created')


// // get GL context
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

const buffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
  gl.STATIC_DRAW
);
gl.viewport(0, 0, width, height)

const from = createTexture(gl, videoFrom);
from.minFilter = gl.LINEAR;
from.magFilter = gl.LINEAR;

const to = createTexture(gl, videoTo);
to.minFilter = gl.LINEAR;
to.magFilter = gl.LINEAR;

const transition = createTransition(gl, transitions[transactionIdx]);

// animates forever!
let frame = 0
const frameRate = 50
setInterval(() => {
  frame = frame + 20
  transition.draw(
    (frame/1000) % 1,
    from,
    to,
    canvas.width,
    canvas.height,
    { persp: 1.5, unzoom: 0.6 }
  )
}, frameRate)

