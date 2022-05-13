const concat = require('ffmpeg-concat')

console.log('init')
concat({
  output: 'test.mp4',
  videos: [
    './assets/video1.mp4',
    './assets/video1.mp4'
  ],
  transition: {
    name: 'directionalWipe',
    duration: 500
  }
}).then(() => {
  console.log('then')
}).catch((e) => {
  console.error(e)
}).finally(() => {
  console.log('end')
})