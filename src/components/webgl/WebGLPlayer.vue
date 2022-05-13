<script lang="js">
import { ref } from 'vue'
import transitions from 'gl-transitions'
import createTransition from 'gl-transition'
import createTexture from 'gl-texture2d'
import { videoSrc1, videoSrc2, imageSrc1, imageSrc2, loadVideo, loadImage } from '../../services/canvas.service'

export default {
  async setup() {
    const canvasRef = ref()

    const videoFrom = await loadVideo(videoSrc1)
    const videoTo = await loadVideo(videoSrc2)

    const imageFrom = await loadImage(imageSrc1);
    const imageTo = await loadImage(imageSrc2);
    // ^ NB: we just assumed you have these 2 imageFrom and imageTo Image objects that have the image loaded and ready

    // initialization canvas
    const canvas = canvasRef.value
    canvas.width = videoFrom.videoWidth
    canvas.height = videoFrom.videoHeight

    // get GL context
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

    const buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
      gl.STATIC_DRAW
    );
    gl.viewport(0, 0, width, height);
    
    const from = createTexture(gl, imageFrom);
    from.minFilter = gl.LINEAR;
    from.magFilter = gl.LINEAR;
    
    const to = createTexture(gl, imageTo);
    to.minFilter = gl.LINEAR;
    to.magFilter = gl.LINEAR;
    
    const transition = createTransition(gl, transitions.find(t => t.name === "cube")); // https://github.com/gl-transitions/gl-transitions/blob/master/transitions/cube.glsl
    
    // animates forever!
    // const loop = (t) => {
    //   requestAnimationFrame(loop);
    //   transition.draw((t/1000)%1, from, to, canvas.width, canvas.height, { persp: 1.5, unzoom: 0.6 });
    // }
    // requestAnimationFrame(loop);
  }
}
</script>

<template>
<div class="video-player">
  <canvas ref="canvasRef" />
</div>
</template>