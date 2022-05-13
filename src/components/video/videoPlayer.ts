import { onMounted, ref } from 'vue';

export const FRAME_RATE = 33
export const videoSrc = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/mov_bbb.mp4'

export const useVideo = () => {
  const videoRef = ref<HTMLVideoElement>()
  const canvasRef = ref<HTMLCanvasElement>()
  const context = ref<CanvasRenderingContext2D>()
  
  const initialize = () => {
    console.log('loaded')
    context.value = canvasRef.value?.getContext('2d') || undefined
    if (context.value && videoRef.value) {
      context.value.canvas.width = videoRef.value.videoWidth
      context.value.canvas.height = videoRef.value.videoHeight
    }
  }

  const processsing = () => {
    console.log('processing...')
    if (videoRef.value?.paused) return
    context.value?.drawImage(videoRef.value as HTMLVideoElement, 0, 0)
    setTimeout(() => {
      processsing()
    }, 1000/FRAME_RATE)
  }

  return {
    videoRef,
    canvasRef,
    initialize,
    processsing
  }
}


