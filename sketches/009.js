export default (p) => {

  let boids = []
  let boidCount = 200
  let trail = 3
  let opacity = true

  function Boid(x, y, maxSpeed, maxForce, trailLength){
    this.acc = p.createVector(0, 0)
    this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1))
    this.pos = p.createVector(x, y)

    this.maxSpeed = maxSpeed || 5
    this.maxForce = maxForce || 0.1
    this.desiredSeparation = 50
    // this.col = Math.round(Math.random(0, 1)) ? '#F84D4D' : '#68ABFA'
    this.col = '255'

    this.trailLength = trailLength || 2
    this.trailPoints = []

    this.arg1 = 1
    this.arg2 = 1
    this.arg3 = 2


    this.run = function(boids){
      this.flock(boids)
      this.update()
      this.edges()
      this.render()
    }

    this.render = function(){
      p.blendMode(p.ADD)
      p.stroke(this.col)
      p.strokeWeight(1)
      if(this.trailPoints.length > 1){
        for(var i = 1; i < this.trailPoints.length; i++){
          var curr = this.trailPoints[i]
          var prev = this.trailPoints[i - 1]
          if(
            Math.abs(curr.x - prev.x) < p.width - (p.width/3) &&
            Math.abs(curr.y - prev.y) < p.height - (p.height/3)
          ){
            p.line(curr.x, curr.y, prev.x, prev.y)
          }
        }
      }
    }

    this.edges = function(){
      if(this.pos.x < 0) this.pos.x = p.width
      if(this.pos.y < 0) this.pos.y = p.height
      if(this.pos.x > p.width) this.pos.x = 0
      if(this.pos.y > p.height) this.pos.y = 0
    }

    this.update = function(){
      this.trailPoints.push(this.pos.copy())
      if(this.trailPoints.length > this.trailLength){
        this.trailPoints.splice(0, this.trailPoints.length - this.trailLength)
      }
      // Update velocity
      this.vel.add(this.acc)
      // limit velocity
      this.vel.limit(this.maxSpeed)
      // update position
      this.pos.add(this.vel)
      // reset acceleration to 0
      this.acc.mult(0)
    }

    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.seek = function(target){
      var desired = p5.Vector.sub(target, this.pos)
      desired.normalize()
      desired.mult(this.maxSpeed)

      // Steering = desired - velocity
      var steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxForce)
      return steer
    }

    this.flock = function(boids){
      var separate = this.separate(boids)
      var align = this.align(boids)
      var cohesion = this.cohesion(boids)

      // weighting
      separate.mult(this.arg1)
      align.mult(this.arg2)
      cohesion.mult(this.arg3)

      this.applyForce(separate)
      this.applyForce(align)
      this.applyForce(cohesion)
    }

    this.separate = function(boids){
      var steer = p.createVector(0, 0)
      var count = 0

      // check each boid to determine separation steering force
      for(var i = 0; i < boids.length; i++){
        // calc distance
        var dist = p5.Vector.dist(this.pos, boids[i].pos)
        if(dist > 0 && dist < this.desiredSeparation){
          // calc vector to avoid
          var diff = p5.Vector.sub(this.pos, boids[i].pos)
          diff.normalize()
          diff.div(dist) // weight by dist
          steer.add(diff)
          count++
        }
      }

      // average steer force
      if(count > 0) steer.div(count)

      // if steer is > 0
      if(steer.mag() > 0){
        // steering = desired - velocity
        steer.normalize()
        steer.mult(this.maxSpeed)
        steer.sub(this.vel)
        steer.limit(this.maxForce)
      }
      return steer
    }

    this.align = function(boids){
      var neighbourDist = 50
      var sum = p.createVector(0, 0)
      var count = 0
      for (var i = 0; i < boids.length; i++){
        var dist = p5.Vector.dist(this.pos, boids[i].pos)
        if(dist > 0 && dist < neighbourDist){
          sum.add(boids[i].vel)
          count++
        }
      }

      if(count > 0){
        sum.div(count)
        sum.normalize()
        sum.mult(this.maxSpeed)
        var steer = p5.Vector.sub(sum, this.vel)
        steer.limit(this.maxForce)
        return steer
      } else {
        return p.createVector(0, 0)
      }
    }

    this.cohesion = function(boids){
      var neighbourDist = 50
      var sum = p.createVector(0, 0)
      var count = 0
      for (var i = 0; i < boids.length; i++){
        var d = p5.Vector.dist(this.pos, boids[i].pos)
        if(d > 0 && d < neighbourDist){
          sum.add(boids[i].pos) // Add location of neighbour
          count++
        }
      }

      if(count > 0){
        // Average the neighbour locations
        sum.div(count)
        return this.seek(sum)
      } else {
        return p.createVector(0, 0)
      }
    }

  }


  p.setup = () => {
    p.pixelDensity(2);
    p.createCanvas(p.windowWidth, p.windowHeight)
    for(var i = 0; i < boidCount; i++){
      boids[i] = new Boid(p.random(p.width), p.random(p.height))
    }
    p.background(21)
  }

  p.draw = () => {
    let bg = opacity ? 255 : 50
    p.blendMode(p.NORMAL)
    p.background(21, bg)
    for(var i = 0; i < boids.length; i++){
      boids[i].run(boids)
      boids[i].trailLength = trail
      if(p.mouseX > 0 || p.mouseY > 0){
        boids[i].arg1 = p.map(p.mouseX, p.width, 0, 0, 3)
        boids[i].arg2 = p.map(p.mouseY, p.height, 0, 3, 0)
        boids[i].maxForce = p.map(p.mouseY, p.height, 0, 0.05, 1)
        boids[i].maxSpeed = p.map(p.mouseY, p.height, 0, 1, 10)
      }
    }
  }

  p.keyPressed = () => {
    if(p.keyCode === 32){
      opacity = !opacity
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

}
