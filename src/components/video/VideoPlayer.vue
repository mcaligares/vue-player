<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { videoSrc, useVideo } from './videoPlayer'

const { videoRef, canvasRef, initialize, processsing } = useVideo()

onMounted(() => {
  videoRef.value?.addEventListener('loadeddata', initialize)
  videoRef.value?.addEventListener('play', processsing)
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
</div>
</template>

<style lang="scss">
.video-player {

}
</style>