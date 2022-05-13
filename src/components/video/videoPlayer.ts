import { onMounted, ref } from 'vue';
import { drawFramesCount } from '../../services/canvas.service';

export const FRAME_RATE = 29
export const videoSrc = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/mov_bbb.mp4'

export const useVideo = () => {
  const videoRef = ref<HTMLVideoElement>()
  const canvasRef = ref<HTMLCanvasElement>()
  const context = ref<CanvasRenderingContext2D>()

  let playing = false
  let currentTime = 0

  const initialize = () => {
    console.log('loaded')
    context.value = canvasRef.value?.getContext('2d') || undefined
    if (context.value && videoRef.value) {
      context.value.canvas.width = videoRef.value.videoWidth
      context.value.canvas.height = videoRef.value.videoHeight
    }
  }

  const processsing = () => {
    if (!playing) return
    if (videoRef.value) {
      const time = (currentTime / FRAME_RATE) + 0.001
      console.log('processing', time)
      videoRef.value.currentTime = time
    }
    context.value = canvasRef.value?.getContext('2d') || undefined
    context.value?.drawImage(videoRef.value as HTMLVideoElement, 0, 0)
    drawFramesCount(context.value, currentTime, 0)
    currentTime++
    setTimeout(() => {
      processsing()
    }, FRAME_RATE)
  }

  const play = () => {
    if (playing) return
    console.log('play')
    playing = true
    processsing()
  }

  const pause = () => {
    if (!playing) return
    console.log('pause')
    playing = false
  }

  const stop = () => {
    if (!playing) return
    console.log('stop')
    playing = false
    currentTime = 0
  }

  return {
    videoRef,
    canvasRef,
    initialize,
    processsing,
    play,
    pause,
    stop
  }
}


