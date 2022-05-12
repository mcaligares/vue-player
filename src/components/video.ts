import { reactive, Ref, ref } from "vue"

export const FRAME_RATE = 33
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
      intervalProcess = setInterval(() => processVideos(context), FRAME_RATE)
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
    if (video1.frame < 100) {
      drawVideoFrame(context, video1)
      video1.frame++
    } else if (video2.frame < 200) {
      drawVideoFrame(context, video2)
      video2.frame++
    } else {
      pause()
    }
    drawFramesCount(context, video1.frame, video2.frame)
  }

  const drawFramesCount = (context: CanvasRenderingContext2D, frame1: number, frame2: number) => {
    context.font = '40px Arial'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = 'black'
    context.fillText(`[ ${frame1}, ${frame2} ]`, 5, 10);
  }

  const drawVideoFrame = (context: CanvasRenderingContext2D, video: Video) => {
    const time = video.frame / FRAME_RATE
    video.element.currentTime = time
    context.drawImage(video.element, 0, 0, canvas?.value?.width || 0, canvas?.value?.height || 0)
  }

  const gotoFrame = (frame: number) => {
    const context = canvas?.value?.getContext('2d')
    if (context) {
      video1.frame = frame
      setTimeout(() => {
        drawVideoFrame(context, video1)
      }, 0);
      drawFramesCount(context, video1.frame, video2.frame)
    }
  }

  return {
    initialize,
    start,
    pause,
    gotoFrame
  }
}