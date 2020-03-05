import React, { useEffect, useRef } from 'react'
import canvasSketch from 'canvas-sketch'

const settings = {
  animate: true,
  pixelRatio: window.devicePixelRatio,
  fps: 30,
}

// Start the sketch
const exampleSketch = () => {
  return ({ context, width, height, time }) => {
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
  }
}

const Sketch = ({ sketch = exampleSketch }) => {
  const ref = useRef()

  useEffect(() => {
    let sketchManager
    const initCanvasSketch = async () => {
      sketchManager = await canvasSketch(sketch, {
        ...settings,
        canvas: ref.current,
      })
    }
    initCanvasSketch()

    return () => {
      // unload sketch on exit
      sketchManager.unload()
    }
  }, [ref, sketch])

  return (
    <canvas
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  )
}

export default Sketch
