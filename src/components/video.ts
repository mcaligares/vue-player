import { reactive, Ref, ref } from "vue"

export const FRAME_RATE = 30
export const videoSrc1 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample_960x540.mp4'
export const videoSrc2 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/mov_bbb.mp4'

interface Video {
  frame: number
  element: HTMLVideoElement
}

export const useVideo = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const video1 = reactive<Video>({} as Video)
  const video2 = reactive<Video>({} as Video)
  let playing = false
  let intervalProcess: number

  const initialize = () => {
    video1.element = loadVideo(videoSrc1)
    video1.frame = 0
    video2.element = loadVideo(videoSrc2)
    video2.frame = 0
    video1.element.addEventListener('loadeddata', setupCanvas)
  }
  
  const setupCanvas = () => {
    const context = canvas?.value?.getContext('2d')
    if (context) {
      context.canvas.width = video1.element.videoWidth
      context.canvas.height = video1.element.videoHeight
    }
  }

  const start = () => {
    if (playing) return

    const context = canvas?.value?.getContext('2d')
    if (context) {
      video1.frame = 0
      video2.frame = 0
      intervalProcess = setInterval(() => {
        processVideos(context)
      }, FRAME_RATE)
    }
    playing = true
  }

  const pause = () => {
    if (playing && intervalProcess) {
      clearInterval(intervalProcess)
      playing = false
    }
  }
  
  const loadVideo = (filename: string) => {
    const video = document.createElement('video')
    video.src = filename
    video.load()
    console.log('video load', filename)
    return video
  }
  
  const processVideos = (context: CanvasRenderingContext2D) => {
    console.log('process video', video1.frame, video2.frame)
    if (video1.frame < 100) {
      drawVideoFrame(context, video1)
      video1.frame++
    } else {
      drawVideoFrame(context, video2)
      video2.frame++
    }
  }

  const drawVideoFrame = (context: CanvasRenderingContext2D, video: Video) => {
    const time = video.frame / FRAME_RATE
    video.element.currentTime = time
    context.drawImage(video.element, 0, 0)
  }

  return {
    initialize,
    start,
    pause
  }
}