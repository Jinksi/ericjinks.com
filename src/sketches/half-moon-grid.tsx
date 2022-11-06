import React from 'react'
import random from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'

import { CanvasSketch } from '../components/react/CanvasSketch'

const settings: Sketch['settings'] = {
  dimensions: [2048, 2048],
  animate: true,
}

const sketch: Sketch['render'] = () => {
  random.setSeed('h')
  const palette = random.pick(palettes)
  const bgColor = palette[4]
  const pointColors = palette.slice(0, 4)
  let xoff = 0

  function createGrid(count = 5, xoff = 0) {
    let points = []

    class Point {
      xoff: number
      position: number[]
      color: string
      character: string
      rotation: number
      radius: number

      constructor({ xoff, u, v }: { xoff: number; u: number; v: number }) {
        this.xoff = xoff
        this.rotation = 0
        this.radius = 0.01
        this.position = [u, v]
        this.color = random.pick(pointColors)
        this.character = random.pick(['ˆ'])
      }

      update({ xoff }: { xoff: number }) {
        const [u, v] = this.position
        this.xoff = xoff
        this.radius =
          0.004 +
          Math.abs(random.noise2D(u + this.xoff, v + this.xoff, 0.7, 1.5)) *
            0.01
        this.rotation =
          random.noise2D(u + this.xoff, v + this.xoff, 0.7, 1) * Math.PI * 2
      }
    }

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // U / V space is 0-1 rather than pixels / units
        let u, v
        if (count <= 1) {
          u = 0.5
          v = 0.5
        } else {
          u = x / (count - 1)
          v = y / (count - 1)
        }

        points.push(new Point({ u, v, xoff }))
      }
    }
    return points
  }
  const points = createGrid(50).filter(() => random.value() >= 0.2)

  return ({ context, width, height }) => {
    xoff += 0.005
    const margin = width * 0.1

    context.fillStyle = bgColor
    context.fillRect(0, 0, width, height)

    points.forEach((point) => {
      point.update({ xoff })
      const { position, radius, color, rotation, character } = point
      const [u, v] = position
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      // context.font = `100 ${radius * width}px sans-serif`
      // context.textAlign = 'center'
      // context.textBaseline = 'middle'
      context.fillStyle = color

      context.save()
      context.translate(x, y)
      context.rotate(rotation)
      context.globalCompositeOperation = 'screen'
      context.globalAlpha = 1
      // context.fillText(character, 0, 0)
      context.beginPath()
      context.arc(0, 0, width * radius, 0, Math.PI)
      context.fill()
      context.restore()
    })
  }
}

export function HalfMoonGrid() {
  return (
    <CanvasSketch
      sketch={{
        render: sketch,
        settings,
      }}
    />
  )
}
