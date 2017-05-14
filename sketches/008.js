export default (p) => {

  let vehicles = []
  let vehicleCount = 200

  var Vehicle = function(x, y){
    this.prevPos = p.createVector(x,y)
    this.pos = p.createVector(x,y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.colour = 'RGB(104, 171, 250)'
    this.xoff = p.random(0, 100)
    this.sr = 10
    this.desiredSeparation = 30
    // maximum magnitude
    this.maxSpeed = p.random(this.sr / 5, this.sr)
    // turning circle
    this.maxForce = p.random(0.2, 0.01)

    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.applyBehaviours = function(vehicles){
      var separateForce = this.separate(vehicles)
      var seekVector = p.createVector(p.mouseX, p.mouseY)
      if(p.mouseX === 0 && p.mouseY === 0){
        seekVector = p.createVector(p.width/2, p.height/2)
      }
      var seekForce = this.seek(seekVector)

      separateForce.mult(1.5)
      seekForce.mult(1)

      this.applyForce(separateForce)
      this.applyForce(seekForce)

    }

    this.seek = function(target){
      var desired = p5.Vector.sub(target, this.pos)

      desired.setMag(this.maxSpeed)

      // Steering = desired - velocity
      var steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxForce)
      return steer
    }

    this.separate = function(vehicles){
      var desiredSeparation = this.desiredSeparation
      var sum = p.createVector(0,0)
      var count = 0
      for (var i = 0; i < vehicles.length; i++){
        var d = p5.Vector.dist(this.pos, vehicles[i].pos)
        if(d > 0 && d < desiredSeparation){
          // calc opposing vector
          var diff = p5.Vector.sub(this.pos, vehicles[i].pos)
          diff.normalize()
          diff.div(d) // weight by distance
          sum.add(diff)
          count++
        }
      }
      // Average the forces
      if(count > 0){
        sum.div(count)
        sum.normalize()
        sum.mult(this.maxSpeed)

        // Steering = desired - velocity
        var steer = p5.Vector.sub(sum, this.vel)
        steer.limit(this.maxForce)
        return steer
      } else {
        return p.createVector(0,0)
      }

    }

    this.update = function(){
      this.prevPos = this.pos.copy()
      this.vel.add(this.acc)
      this.vel.limit(this.maxSpeed) // limit vel to maxSpeed
      this.pos.add(this.vel)
      this.acc.set(0,0)

      if(this.pos.y < 0){ this.pos.y = this.prevPos.y = 0 }
      if(this.pos.x < 0){ this.pos.x = this.prevPos.x = 0 }
      if(this.pos.y > p.height){ this.pos.y = this.prevPos.y = p.height }
      if(this.pos.x > p.width){ this.pos.x = this.prevPos.x = p.width }
    }

    this.display = function(){
      p.blendMode(p.ADD)
      p.stroke(this.colour)
      p.strokeWeight(p.map(p.noise(this.xoff), 0, 1, 1, 5))
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.xoff += 0.3
    }

  }

  p.setup = () => {
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

  p.draw = () => {
    p.blendMode(p.NORMAL)
    p.background(21, 175)
    if(vehicles.length >= vehicleCount){
      vehicles.splice(0, vehicles.length - vehicleCount)
    } else {
      vehicles.push(new Vehicle(p.width/2 + p.random(-5, 5), p.height/2 + p.random(-5, 5)))
    }
    for(var i = 0; i < vehicles.length; i++){
      vehicles[i].applyBehaviours(vehicles)
      vehicles[i].update()
      vehicles[i].display()
    }
  }

  p.mouseMoved = function(){
    vehicles.push(new Vehicle(p.mouseX, p.mouseY))
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

}
