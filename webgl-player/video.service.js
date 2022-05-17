import transitions from 'gl-transitions'
import createTransition from 'gl-transition'
import createTexture from 'gl-texture2d'

export const createWebGL = (width, height) => {
  // initialization canvas
  const app = document.getElementById('app')
  const canvas = document.createElement('canvas')
  canvas.width = width;
  canvas.height = height;
  app.appendChild(canvas)
  console.log('canvas created')
  return canvas
}

export const getContext = (canvas) => {
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
  gl.viewport(0, 0, canvas.width, canvas.height)
  return gl
}

export const getTransition = (gl, fromElem, toElem, transitionIdx) => {
  const from = createTexture(gl, fromElem);
  from.minFilter = gl.LINEAR;
  from.magFilter = gl.LINEAR;
  
  const to = createTexture(gl, toElem);
  to.minFilter = gl.LINEAR;
  to.magFilter = gl.LINEAR;
  
  const transition = createTransition(gl, transitions[transitionIdx]);
  return { transition, from, to }
}
