export default (p) => {

  let vehicles = []
  const vehicleCount = 250
  let sr = 0

  const Vehicle = function(x, y, z, sr){
    this.prevPos = p.createVector(x,y,z)
    this.pos = p.createVector(x,y,z)
    this.vel = p.createVector(0,0,0)
    this.acc = p.createVector(0,0,0)
    this.colour = p.random(1) > .5 ? 'RGB(150,211,250)' : '255'
    this.sr = sr
    this.desiredSeparation = 50

    this.maxSpeed = p.random(this.sr / 5, this.sr)
    this.maxForce = p.random(0.2, 0.01)

    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.applyBehaviours = function(vehicles){
      let separateForce = this.separate(vehicles)
      let seekVector = p.createVector(p.mouseX, p.mouseY, 200)
      if(seekVector.x === 0 && seekVector.y === 0){
        seekVector = p.createVector(p.width/2, p.height/2, 0)
      }
      let seekForce = this.seek(seekVector)
      separateForce.mult(0.5)
      seekForce.mult(0.2)

      this.applyForce(separateForce)
      this.applyForce(seekForce)
    }

    this.seek = function(target){
      let desired = p5.Vector.sub(target, this.pos)
      desired.setMag(this.maxSpeed)
      let steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxForce)
      return steer
    }

    this.separate = function(vehicles){
      let desiredSeparation = this.desiredSeparation
      let sum = p.createVector(0,0,0)
      let count = 0
      for (let i = 0; i < vehicles.length; i++){
        let d = p5.Vector.dist(this.pos, vehicles[i].pos)
        if(d > 0 && d < desiredSeparation){
          let diff = p5.Vector.sub(this.pos, vehicles[i].pos)
          diff.normalize()
          diff.div(d)
          sum.add(diff)
          count++
        }
      }
      if(count > 0){
        sum.div(count)
        sum.normalize()
        sum.mult(this.maxSpeed)
        let steer = p5.Vector.sub(sum, this.vel)
        steer.limit(this.maxForce)
        return steer
      } else {
        return p.createVector(0,0,0)
      }
    }

    this.update = function(){
      this.prevPos = this.pos.copy()
      this.vel.add(this.acc)
      this.vel.limit(this.maxSpeed)
      this.pos.add(this.vel)
      this.acc.set(0,0)
    }

    this.display = function(){
      p.push()
      p.stroke(255)
      p.translate(- p.width/2, - p.height/2, 0)
      // p.point(this.pos.x, this.pos.y, this.pos.z)
      p.line(
        this.pos.x,
        this.pos.y,
        this.pos.z,
        this.prevPos.x,
        this.prevPos.y,
        this.prevPos.z
      )
      p.pop()

      this.xoff += 0.03
    }

  }

  p.setup = () => {
    // p.frameRate(60
    // p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    p.background(21)

    for(let i = 0; i < vehicleCount; i++){
      sr = p.random(5, 20)
      vehicles[i] = new Vehicle(p.width/2 + p.random(-5, 5), p.height/2 + p.random(-5, 5), p.random(1000), sr)
    }
  }

  p.draw = () => {
    p.background(21)
    if(vehicles.length > vehicleCount){
      vehicles.splice(0, vehicles.length - vehicleCount)
    }
    for(let i = 0; i < vehicles.length; i++){
      vehicles[i].applyBehaviours(vehicles)
      vehicles[i].update()
      vehicles[i].display()
    }

  }

  p.mouseClicked = () => {
    for(let i = 0; i < vehicleCount; i++){
      vehicles[i] = new Vehicle(p.width/2 + p.random(-5, 5), p.height/2 + p.random(-5, 5), p.random(1000), sr)
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }
}
