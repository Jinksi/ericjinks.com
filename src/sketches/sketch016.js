import random from 'canvas-sketch-util/random'
import Vector from './vector'

export default () => {
  let gems = []
  let wind
  let windStrength = 0.11
  let windDynamics = 0.003
  let gemSlow = 0.05
  let gridSize = 100
  let blur = 0.3

  class Gem {
    constructor(x, y, radius) {
      this.col = random.pick(['orange', 'teal', 'tomato'])
      this.pos = new Vector(x, y)
      this.vel = new Vector(random.range(0, 1), random.range(0, 1))
      this.acc = new Vector(0, 0)
      this.radius = radius || random.range(1, 3)
      this.mass = 2 + this.radius
    }

    applyForce(force) {
      // do not affect original force value
      let f = force.copy()
      // F = m * a
      f = f.div(this.mass)
      this.acc = this.acc.add(f)
    }

    display({ context, width, height }) {
      this.vel = this.vel.add(this.acc)
      this.pos = this.pos.add(this.vel)
      // reset acc for next force calculation
      this.acc.set(0, 0)
      if (this.pos.x < 0) this.pos.x = width
      if (this.pos.x > width) this.pos.x = 0
      if (this.pos.y < 0) this.pos.y = height
      if (this.pos.y > height) this.pos.y = 0

      // context.globalCompositeOperation = 'screen'
      context.fillStyle = this.col
      context.beginPath()
      context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
      context.fill()
      context.strokeStyle = 'transparent'
    }
  }

  class Wind {
    constructor(strength) {
      // initialise Perlin offset
      this.xoff = 0
      this.strength = strength
      this.direction = new Vector(0, 0)
      this.frequency = 0.5
    }

    calculateForce(part) {
      // force relative to particle mass
      const force = this.direction.mult(part.mass * part.mass)
      const mag = random.range(0, this.strength)
      force.setLength(mag)
      return force
    }

    update() {
      // create new vector from noise
      this.strength = windStrength
      const noiseX = random.noise1D(this.xoff, this.frequency)
      const noiseY = random.noise1D(this.xoff + 7, this.frequency)
      this.direction = new Vector(noiseX, noiseY)
      // scale by coefficient
      this.direction = this.direction.mult(this.strength)
      // increment noise offset
      this.xoff += windDynamics
    }
  }

  wind = new Wind(windStrength)

  // render loop
  return ({ context, width, height, time }) => {
    context.globalCompositeOperation = 'normal'
    context.fillStyle = `hsla(0, 0%, 9%, ${1 - blur})`
    context.fillRect(0, 0, width, height)

    if (!gems.length) {
      for (let i = 0; i < width; i += gridSize) {
        for (let j = 0; j < height; j += gridSize) {
          const x = random.range(i - gridSize, i + gridSize)
          const y = random.range(j - gridSize, j + gridSize)
          gems.push(new Gem(x, y))
        }
      }
    }

    gems.forEach(gem => {
      gem.applyForce(wind.calculateForce(gem))
      // slow down
      let force = gem.vel.copy()
      force = force.mult(-1)
      force.setLength(gemSlow)
      gem.applyForce(force)
      gem.display({ context, width, height })
    })

    wind.update()
  }
}
