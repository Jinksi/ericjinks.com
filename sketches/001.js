export default (p) => {
  var tracer1
  var tracer2
  var tracer3
  var target

  p.setup = function(){
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.pixelDensity(2)
    tracer1 = new Tracer()
    tracer2 = new Tracer()
    tracer3 = new Tracer()
    target = new Target()
    p.background('rgba(48,48,48,1)')
  }


  p.draw = function(){
    p.background('rgba(48,48,48,0.4)')

    // Update, display tracer & target objects
    tracer1.update()
    tracer1.display()
    tracer2.update()
    tracer2.display()
    tracer3.update()
    tracer3.display()
    target.update()
    target.display()

  }

  function Tracer(){
    // Initialise with p.random position
    this.pos = p.createVector(p.random(p.width), p.random(p.height))
    // Initialise with 0 velocity
    this.vel = p.createVector(0,0)
    this.size = 10

    this.update = function(){
      // set acceleration Vector,
      this.acc = p5.Vector.sub(target.pos, this.pos)
      // set acceleration magnitude to 0.5
      this.acc.setMag(0.5)
      // add acceleration to velocity
      this.vel.add(this.acc)
      // limit vel to max of 10
      this.vel.limit(10)
      // add vel to object position
      this.pos.add(this.vel)
      // keep inside canvas
      if(this.pos.x < 0 || this.pos.x > p.width){ this.vel.x = this.vel.x * -0.5 }
      if(this.pos.y < 0 || this.pos.y > p.height){ this.vel.y = this.vel.y * -0.5 }
    }

    this.display = function(){
      p.fill('#FFF')
      p.noStroke()
      p.ellipse(this.pos.x, this.pos.y, this.size, this.size)
    }
  }

  function Target(){
    // Initialise with p.random position
    this.pos = p.createVector(p.random(p.width), p.random(p.height))
    // Initialise with 0 velocity
    this.vel = p.createVector(0, 0)

    this.update = function(){
      // create a p.random direction for acceleration
      this.acc = p.createVector(p.random(-1, 1), p.random(-1, 1))
      // scale acc by half
      this.acc.mult(0.5)
      // add acc to vel
      this.vel.add(this.acc)
      // limit vel to 5
      this.vel.limit(5)
      // add vel to pos
      this.pos.add(this.vel)

      // bounce awkwardly off walls
      if(
        this.pos.x < 0 ||
        this.pos.x > p.width ||
        this.pos.y < 0 ||
        this.pos.y > p.height
      ){
        // reverse vector
        this.vel.mult( -1)
      }
    }

    this.display = function(){
      p.fill('#FF3690')
      p.noStroke()
      p.rect(this.pos.x, this.pos.y, 15, 15)
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }
}
