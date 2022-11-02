import { useEffect, useRef } from 'react'
import canvasSketch from 'canvas-sketch'

// Start the sketch
type SketchRenderProps = {
  context: CanvasRenderingContext2D
  width: number
  height: number
  time: number
  settings: object
  playhead: number
}

export type Sketch = {
  render: () => (props: SketchRenderProps) => void
  settings?: {
    animate?: boolean
    fps?: number
    dimensions?: [number, number]
    scaleToFit?: boolean
    scaleToView?: boolean
    resizeCanvas?: boolean
    duration?: number
  }
}

const defaultSettings: Sketch['settings'] = {
  animate: true,
  fps: 30,
  scaleToFit: true,
  scaleToView: true,
  resizeCanvas: true,
  dimensions: [1000, 1000],
}

const exampleSketch: Sketch = {
  settings: {
    animate: true,
  },
  render:
    () =>
    ({ context, width, height, time }) => {
      // Margin in px
      const margin = 10

      // Off-white background
      context.fillStyle = 'hsl(0, 0%, 98%)'
      context.fillRect(0, 0, width, height)

      // Gradient foreground
      const hue1 = (time * 10) % 360
      const hue2 = (time * 20 + 45) % 360
      const fill = context.createLinearGradient(0, 0, width, height)
      fill.addColorStop(0, `hsl(${hue1}, 80%, 70%)`)
      fill.addColorStop(1, `hsl(${hue2}, 80%, 70%)`)

      // Fill rectangle
      context.fillStyle = fill
      context.fillRect(margin, margin, width - margin * 2, height - margin * 2)
    },
}

export const CanvasSketch = ({ sketch = exampleSketch }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let sketchManager: any
    console.log(sketch)
    const initCanvasSketch = async () => {
      if (ref.current !== null) {
        sketchManager = await canvasSketch(sketch.render, {
          ...defaultSettings,
          ...sketch.settings,
          canvas: ref.current,
        })
        sketchManager.play()
      }
    }

    initCanvasSketch()

    return () => {
      // unload sketch on exit
      sketchManager.unload()
    }
  }, [sketch, ref.current])

  return (
    <canvas
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'block',
      }}
    />
  )
}
