export const videoSrc1 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample_960x540.mp4'
export const videoSrc2 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/mov_bbb.mp4'

export const imageSrc1 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/pic1.jpg'
export const imageSrc2 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/pic2.jpg'

export const drawFramesCount = (context: CanvasRenderingContext2D | undefined, frame1: number, frame2: number) => {
  if (context) {
    context.font = '40px Arial'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = 'black'
    context.fillText(`[ ${frame1}, ${frame2} ]`, 5, 10);
  }
}

export const loadVideo = (filename: string): Promise<HTMLVideoElement> => {
  console.log('video loading', filename)
  const video = document.createElement('video')
  video.src = filename
  video.crossOrigin = 'anonymous'
  video.load()
  return new Promise((resolve, reject) => {
    video.addEventListener('loadeddata', () => {
      resolve(video)
    })
    video.addEventListener('error', () => {
      reject(video)
    })
  })
}

export const loadImage = (filename: string) => {
  console.log('image loading', filename)
  const image = document.createElement('img')
  image.src = filename
  image.crossOrigin = 'anonymous'
  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.addEventListener('error', () => {
      reject(image)
    })
  })
}
