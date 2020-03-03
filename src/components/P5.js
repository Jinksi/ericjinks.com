import React, { useEffect, useRef } from 'react'
import p5 from 'p5'

const exampleSketch = p => {
  let time = 0
  p.setup = () => {
    p.background(21)
  }

  p.draw = () => {
    time += p.deltaTime
    p.background(0)
    p.fill(255)
    p.noStroke()

    const anim = p.sin(time / 1000 - p.PI / 2) * 0.5 + 0.5
    p.rect(0, 0, p.width * anim, p.height)
  }
}

const P5 = ({ sketch = exampleSketch }) => {
  const containerRef = useRef()
  useEffect(() => {
    const { width, height } = containerRef.current.getBoundingClientRect()
    function initialiseP5(p) {
      p.setup = () => {
        p.createCanvas(width, height)
        p.frameRate(60)
        p.pixelDensity(window.devicePixelRatio)
        p.background(21)
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
      sketch(p)
    }

    const p = new p5(initialiseP5, containerRef.current)

    return () => {
      if (p.canvas) {
        p.remove()
      }
    }
  }, [sketch])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  )
}

export default P5
