export default (p) => {

  function Particle(x, y, mass){
    this.pos = p.createVector(x, y)
    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)
    this.col = (function(){
      var choice = Math.round(p.random(1))
      if(choice === 0){
        return 'rgba(104, 171, 250, 1)'
      } else {
        return 'rgba(248, 77, 77, 1)'
      }
    })()
    this.mass = mass

    // method to be influenced by external force
    this.applyForce = function(force){
      // do not affect original force value
      var f = force.copy()
      // F = m * a
      f.div(this.mass)
      this.acc.add(f)
    }

    this.update = function(){
      this.vel.add(this.acc)
      this.pos.add(this.vel)

      // reset acc for next force calculation
      this.acc.set(0, 0)
    }

    this.display = function(){
      p.fill(this.col)
      // scale size by mass
      p.ellipse(this.pos.x, this.pos.y, mass/15, mass/15)
    }

    this.edges = function() {
      // keep in canvas
      if(this.pos.y > p.height){
        this.pos.y = 0
      }
      if(this.pos.x > p.width){
        this.pos.x = 0
      }
      if(this.pos.y < 0){
        this.pos.y = p.height
      }
      if(this.pos.x < 0){
        this.pos.x = p.width
      }
    }
  }

  var Gravity = function(c){

    this.c = c

    this.direction = p.createVector(0, this.c)
    this.center = p.createVector(p.width/2, p.height/2)

    this.calculateForce = function(part){
      // gravity relative to particle mass
      var force = this.direction.mult(part.mass * part.mass)
      force.setMag(this.c)
      return force
    }

    this.rotate = function(){
      // rotate based on mouse pos relative to center of canvas
      var mousePos = p.createVector(p.mouseX, p.mouseY)
      this.direction = mousePos.sub(this.center)
    }

  }

  var Air = function(c){

    this.c = c

    this.calculateForce = function(part){
      // Magnitude is coefficient * speed squared
      var speed = part.vel.mag()
      var dragMagnitude = this.c * speed * speed

      // Direction is the inverse of velocity
      var dragForce = part.vel.copy()
      dragForce.mult(-1)

      dragForce.setMag(dragMagnitude)
      // Scale the drag relative to particle mass
      dragForce.mult(part.mass * part.mass)
      return dragForce
    }

  }

  var Wind = function(c){

    // initialise Perlin offset
    this.xoff = 0
    this.c = c
    this.direction = p.createVector(0,0)

    this.calculateForce = function(part){
      // force relative to particle mass
      var force = this.direction.mult(part.mass * part.mass)
      force.setMag(this.c)
      return force
    }

    this.update = function(){
      // create new vector from Perlin Noise
      this.direction = p.createVector(
        p.map(p.noise(this.xoff), 0, 1, -1, 1),
        p.map(p.noise(this.xoff + 7), 0, 1, -1, 1)
      )
      // scale by coefficient
      this.direction.mult(this.c)
      // increment Perlin offset
      this.xoff += 0.005
    }

  }

  var particles = []
  var particleCount = 100
  var air
  var gravity
  var wind

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.pixelDensity(2)
    p.background(21)

    // Add particles to array
    for (var i = 0; i < particleCount; i++) {
      particles[i] = new Particle(p.width / particleCount * i, p.random(p.height), p.random(20, 50))
    }

    // Initialise forces
    gravity = new Gravity(1)
    air = new Air(0.0005)
    wind = new Wind(0.5)
  }

  p.draw = () => {
    p.blendMode(p.MULTIPLY)
    p.background('rgba(31, 31, 31, .03)')
    p.blendMode(p.NORMAL)
    p.noStroke()
    // each particle
    particles.map(function(part){
      // apply forces
      part.applyForce(gravity.calculateForce(part))
      part.applyForce(air.calculateForce(part))
      part.applyForce(wind.calculateForce(part))
      // update particle
      part.update()
      part.edges()
      part.display()
    })
    // update forces
    wind.update()
    gravity.rotate()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }




}
