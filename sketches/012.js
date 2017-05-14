export default (p) => {

  var Arm = function(start, acc, time, opacity){
    this.xoff = 0
    this.start = start.copy()
    this.pos = start.copy()
    this.vel = p.createVector(0, 0)
    this.timerstart = time
    this.timer = time
    this.opacity = opacity * 255
    this.acc = acc.copy()
    this.growing = true
    this.angle = 0

    this.dir = p.random(1) < 0.5 ? 'x' : 'y'

    this.update = function(){
      this.angle += 0.1
      this.vel.add(this.acc)
      this.acc.set(0, 0)
      var move
      if(this.growing){
        this.pos.add(this.vel)
        move = 0.4
      } else {
        move = 0.15
      }
      if(this.dir === 'x'){
        this.pos.add(p.createVector(
            p.map(p.sin(this.angle), -1, 1, -move, move),
            0
          )
        )
      } else {
        this.pos.add(p.createVector(
            0,
            p.map(p.sin(this.angle), -1, 1, -move, move)
          )
        )
      }
    }

    this.applyForce = function(force){
      if(!this.growing){
        this.acc.add(force)
      }
    }

    this.render = function(){
      this.xoff += 0.05
      p.blendMode(p.ADD)
      p.stroke(255, this.opacity * p.map(p.noise(this.xoff), 0, 1, 0, 1))
      p.line(this.start.x, this.start.y, this.pos.x, this.pos.y)
    }

    this.timeToSplit = function(){
      this.timer--
      if(this.timer < 0 && this.growing){
        this.growing = false
        return true
      } else {
        return false
      }
    }

    this.split = function(angle){
      // current heading
      var theta = this.vel.heading()
      // current speed
      var mag = this.vel.mag()
      // Turn
      theta += p.radians(angle)
      // Polar to Cartesian
      var newVel = p.createVector(mag * p.cos(theta), mag * p.sin(theta))
      newVel.setMag(p.random(1))
      // new arm
      return new Arm(this.pos, newVel, this.timerstart + p.random(5), opacity + 0.05)

    }
  }


  var arms = []
  var centAngle = 0

  p.setup = () => {
    p.frameRate(60)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

  p.draw = () => {
    p.blendMode(p.NORMAL)
    p.background(21, 255)

    if(arms.length < 200){
      arms.push(
        new Arm(
          p.createVector(p.width/2, p.height/2),
          p.createVector(p.random(-1.5, 1.5), p.random(-1.5, 1.5)),
          p.height/10, 0.06
        )
      )
    }

    for(var i = 0; i < arms.length; i++){
      arms[i].update()
      arms[i].render()

      if(arms[i].timeToSplit() && arms.length < 750){
        if(p.random(1) < 0.1){
          arms.push(arms[i].split(p.random(-35, 35)))
          arms.push(arms[i].split(p.random(-35, 35)))
        } else {
          arms.push(arms[i].split(p.random(-35, 35)))
        }
      }

    }

    p.blendMode(p.NORMAL)
    p.noStroke()
    p.fill(10, 200)
    centAngle += 0.05
    var centSize = p.map(p.sin(centAngle), -1, 1, 20, 25)
    p.ellipse(p.width/2, p.height/2, centSize, centSize)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
    arms = []
  }
}
