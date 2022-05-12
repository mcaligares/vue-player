<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVideo } from './video'

const frame = ref(0)
const canvas = ref<HTMLCanvasElement>()
const { initialize, start, pause, gotoFrame } = useVideo(canvas)

onMounted(() => {
  console.log('mounted')
  initialize()
})
</script>
<template>
  <div class="canvas-player">
    <canvas
      ref="canvas"
      class="canvas"
    />
    <div>
      <button @click="start">
        play
      </button>
      <button @click="pause">
        pause
      </button>
      <input v-model="frame" />
      <button @click="gotoFrame(frame)">
        goto
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.canvas-player {
  width: 80vw;
  text-align: center;
  .canvas {
    width: 70vw;
    border: 1px solid black;
  }
}
</style>