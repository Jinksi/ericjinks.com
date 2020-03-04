export default p => {
  let blur = 0.1 // 0-1
  let gems = []
  let wind
  let windStrength = 0.2
  let windDynamics = 0.05
  let maxGems = 800
  let gemHop = 10
  let gemTime = 30
  let gemSlow = 0.05
  let gridSize = 100

  class Wind {
    constructor(strength) {
      // initialise Perlin offset
      this.xoff = 0
      this.strength = strength
      this.direction = p.createVector(0, 0)
    }

    calculateForce(part) {
      // force relative to particle mass
      const force = this.direction.mult(part.mass * part.mass)
      force.setMag(p.random(this.strength))
      return force
    }

    update() {
      // create new vector from Perlin Noise
      this.strength = windStrength
      this.direction = p.createVector(
        p.map(p.noise(this.xoff), 0, 1, -1, 1),
        p.map(p.noise(this.xoff + 7), 0, 1, -1, 1)
      )
      // scale by coefficient
      this.direction.mult(this.strength)
      // increment Perlin offset
      this.xoff += windDynamics
    }
  }

  class Gem {
    constructor(x, y, radius) {
      this.col = p.random(1) > 0.5 ? 'orange' : 'teal'
      this.pos = p.createVector(x, y)
      this.vel = p.createVector(0, 0)
      this.acc = p.createVector(0, 0)
      this.radius = radius || p.random(2, 4)
      this.mass = this.radius
      this.spawned = false
    }

    applyForce(force) {
      // do not affect original force value
      const f = force.copy()
      // F = m * a
      f.div(this.mass)
      this.acc.add(f)
    }

    display() {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      // reset acc for next force calculation
      this.acc.set(0, 0)
      if (this.pos.x < 0) this.pos.x = p.width
      if (this.pos.x > p.width) this.pos.x = 0
      if (this.pos.y < 0) this.pos.y = p.height
      if (this.pos.y > p.height) this.pos.y = 0

      p.noStroke()
      p.fill(this.col)
      p.ellipse(this.pos.x, this.pos.y, this.radius)
    }

    spawn() {
      if (p.millis() % gemTime <= 10) {
        const newb = {
          x: p.random(this.pos.x - 10, this.pos.x + 10),
          y: p.random(this.pos.y + gemHop, this.pos.y + gemHop * 2),
          radius: this.radius,
        }
        if (newb.x > p.width || newb.y > p.height || this.spawned) {
          return false
        }
        gems.push(new Gem(newb.x, newb.y, newb.radius))
        this.spawned = true
      }
    }
  }

  p.draw = () => {
    if (!wind) wind = new Wind(windStrength)
    if (!gems.length) {
      for (let i = 0; i < p.width; i += gridSize) {
        for (let j = 0; j < p.height; j += gridSize) {
          const x = p.random(i - gridSize, i + gridSize)
          const y = p.random(j - gridSize, j + gridSize)
          gems.push(new Gem(x, y))
        }
      }
    }

    p.background(21, (1 - blur) * 100)

    if (gems.length > maxGems) {
      gems.splice(0, gems.length - maxGems)
    }

    gems.forEach(gem => {
      gem.applyForce(wind.calculateForce(gem))

      // slow down
      const force = gem.vel.copy()
      force.mult(-1)
      force.setMag(gemSlow)
      gem.applyForce(force)
      gem.display()
    })

    wind.update()

    if (p.mouseX > 0 && p.mouseY > 0) {
      // windStrength = p.map(p.mouseX, 0, p.windowWidth, 0.3, 1)
      // gemHop = p.map(p.mouseY, 0, p.windowHeight, 0.5, 10)
      // gemTime = p.map(p.mouseX, 0, p.windowWidth, 1, 100)
      // gemSlow = p.map(p.mouseY, 0, p.windowHeight, 0, 0.3)
    }
  }

  p.mouseClicked = () => {}
  p.mouseMoved = () => {}
}
