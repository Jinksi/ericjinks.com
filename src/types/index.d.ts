type SketchRenderProps = {
  context: CanvasRenderingContext2D
  width: number
  height: number
  time: number
  settings: object
  playhead: number
}
declare global {
  type Sketch = {
    render: () => (props: SketchRenderProps) => void
    settings?: {
      animate?: boolean
      fps?: number
      dimensions?: number[]
      scaleToFit?: boolean
      scaleToView?: boolean
      resizeCanvas?: boolean
      duration?: number
    }
  }
}

declare global {
  interface Window {
    sketch: Sketch | undefined
  }
}

export {}
