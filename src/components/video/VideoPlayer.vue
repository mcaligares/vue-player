<script setup lang="ts">
import { onMounted } from 'vue'
import { videoSrc, useVideo } from './videoPlayer'

const { videoRef, canvasRef, initialize, processsing, play, pause, stop } = useVideo()

onMounted(() => {
  videoRef.value?.addEventListener('loadeddata', initialize)
  videoRef.value?.addEventListener('play', processsing)
  videoRef.value?.addEventListener('loadedmetadata', (ev) => {
    console.log('metadata', ev)
  })
})
</script>

<template>
<div class="video-player">
  <div class="video-player__video">
    <video ref="videoRef" :src="videoSrc" controls></video>
  </div>
  <div class="video-player__canvas">
    <canvas ref="canvasRef" />
  </div>
  <div class="video-player__controls">
    <button @click="play">
      play
    </button>
    <button @click="pause">
      pause
    </button>
    <button @click="stop">
      stop
    </button>
  </div>
</div>
</template>

<style lang="scss">
.video-player {

}
</style>