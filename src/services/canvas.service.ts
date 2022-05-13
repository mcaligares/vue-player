export const videoSrc1 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample_960x540.mp4'
export const videoSrc2 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/mov_bbb.mp4'

export const imageSrc1 = 'https://4.bp.blogspot.com/_HOCuXB2IC34/SkQ0gDKlEPI/AAAAAAAACrU/FnlbRROramc/s400/10%2B(www.cute-pictures.blogspot.com).jpg'
export const imageSrc2 = 'https://d.ibtimes.co.uk/en/full/1644203/landscape-photographer-year-2017.jpg?w=400&e=7cc27c2b72a7c97e7742bdd252c634c4'

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
  return new Promise((resolve, reject) => {
    image.addEventListener('loadeddata', () => {
      resolve(image)
    })
    image.addEventListener('error', () => {
      reject(image)
    })
  })
}
