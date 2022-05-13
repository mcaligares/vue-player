export const drawFramesCount = (context: CanvasRenderingContext2D | undefined, frame1: number, frame2: number) => {
  if (context) {
    context.font = '40px Arial'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = 'black'
    context.fillText(`[ ${frame1}, ${frame2} ]`, 5, 10);
  }
}
