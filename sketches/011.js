export default (p) => {
  var Drum = function(x, y, diam){
    this.pos = p.createVector(x, y)
    this.diam = diam
    this.colour = 255
    this.opac = 0

    this.emissions = []

    this.render = function(){
      p.noStroke()
      p.blendMode(p.ADD)
      p.fill('rgba(104, 171, 250, ' + this.opac / 2 + ')')
      p.ellipse(this.pos.x, this.pos.y, diam+2, diam+2)
      p.blendMode(p.NORMAL)
      p.fill(this.colour)
      p.ellipse(this.pos.x, this.pos.y, diam, diam)
      for(var i = 0; i < this.emissions.length; i++){
        this.emissions[i].render()
      }
    }
    this.react = function(){
      this.emissions.push(new Emit(this.pos.x, this.pos.y, this.diam))
      setTimeout(function(){
        this.emissions.splice(0, 1)
      }.bind(this), 2000)
    }.bind(this)

  }

  var Emit = function(x, y, size){
    this.size = size + 100
    this.x = x
    this.y = y
    this.time = 1
    this.colour = 255
    this.render = function(){
      p.noFill()
      p.stroke(this.colour, 255 - (this.time * 30))
      p.strokeWeight(1)
      p.ellipse(this.x, this.y, this.size * this.time / 2, this.size * this.time / 2)
      this.time += 0.1
    }
  }

  var Vehicle = function(x, y, sr){
    var scale = [36, 44, 48, 51, 60, 62, 70, 72, 75]
    this.prevPos = p.createVector(x,y)
    this.pos = p.createVector(x,y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.colour = 0
    this.xoff = p.random(0, 100)
    this.sr = 10
    this.desiredSeparation = 30
    // maximum magnitude
    this.maxSpeed = p.random(this.sr / 5, this.sr)
    // turning circle
    this.maxForce = p.random(0.5, 0.01)

    this.seekVector = p.createVector(p.width/2, p.height/2)

    this.initialised = false

    this.initAudio = function(){
      this.envelope = new p5.Env()
      // set attackTime, decayTime, sustainRatio, releaseTime
      this.envelope.setADSR(0.01, 0.5, 0.0, 0.0)
      // set attackLevel, releaseLevel
      this.envelope.setRange(0.1, 0)

      this.note = scale[Math.floor(p.random(scale.length))]
      this.osc = new p5.TriOsc()
      this.osc.amp(0)
      this.osc.start()
      this.initialised = true
    }


    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.applyBehaviours = function(vehicles){
      var separateForce = this.separate(vehicles)
      var seekForce = this.seek(this.seekVector)

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
      if(this.pos.x > p.width){ this.pos.x = this.prevPos.x =  p.width }
    }

    this.display = function(){
      p.blendMode(p.NORMAL)
      p.stroke(this.colour)
      p.strokeWeight(p.map(p.noise(this.xoff), 0, 1, 1, 5))
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.xoff += 0.3
    }

    this.playNote = function(){
      var freqValue = p.midiToFreq(this.note)
      this.osc.freq(freqValue)
      this.envelope.play(this.osc, 0, 0.1)
    }

    this.detectEntry = function(drum){
      var dist = p5.Vector.dist(this.pos, drum.pos)
      if(dist < drum.diam / 2){
        if(this.colour !== 0){
          this.playNote()
          drum.react()
        }
        this.colour = 0
      } else {
        if(this.colour !== 255){
          // this.playNote()
          // drum.react()
        }
        this.colour = 255
      }
    }

  }

  var vehicles = []
  var vehicleCount = 20
  var sr
  var drum
  var filter
  var reverb
  var dry
  var wet
  var master
  var hpf
  var lpf
  var amplitude
  var seekVector
  var seekTimer
  var seekStorage



  p.setup = () => {
    p.frameRate(60)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)

    sr = p.random(0.2, 5)
    seekTimer = 0

    hpf = new p5.HighPass()
    hpf.freq(200)
    hpf.disconnect()
    lpf = new p5.LowPass()
    lpf.freq(1500)
    lpf.disconnect()
    reverb = new p5.Reverb()
    reverb.disconnect()

    master = new p5.Gain()
    master.connect()

    dry = new p5.Gain()
    dry.connect(hpf)
    hpf.connect(lpf)
    lpf.connect(master)
    dry.amp(1.5)

    wet = new p5.Gain()
    wet.connect(master)
    reverb.process(lpf, 30, 5)
    var wetFilt = new p5.HighPass()
    wetFilt.freq(400)
    wetFilt.disconnect()
    reverb.connect(wetFilt)
    wet.setInput(wetFilt)
    wet.amp(5)

    master.amp(4)

    amplitude = new p5.Amplitude()
    drum = new Drum(p.width/2, p.height/2, 100)
    p.background(21)

    seekVector = p.createVector(p.width/2, p.height/2)
  }

  p.draw = () => {
    if(vehicles.length < vehicleCount){
      vehicles.push(new Vehicle(p.width/2 + p.random(-5, 5), p.height/2 + p.random(-5, 5), sr))
    }

    p.blendMode(p.NORMAL)
    p.background(21, 175)
    p.blendMode(p.NORMAL)
    if(vehicles.length > vehicleCount){
      vehicles.splice(0, vehicles.length - vehicleCount)
    }
    var vis = amplitude.getLevel() * 100
    drum.opac = p.map(vis, 0, 1, 0, 1)
    drum.render()

    seekStorage = seekVector.copy()

    for(var i = 0; i < vehicles.length; i++){
      if(!vehicles[i].initialised){
        vehicles[i].initAudio()
        vehicles[i].osc.disconnect()
        vehicles[i].osc.connect(dry)
      }
      vehicles[i].applyBehaviours(vehicles)
      vehicles[i].update()
      vehicles[i].detectEntry(drum)
      vehicles[i].display()

      if(p.mouseX !== 0 && p.mouseY !== 0){
        vehicles[i].seekVector = seekVector
      }
      if(seekVector.dist(seekStorage) === 0){
        seekTimer += 1

      } else {
        seekTimer = 0
      }
      if(seekTimer > 5000){
        seekVector = p.createVector(p.random((p.width/2) - 200, (p.width/2) + 200), p.random((p.height/2) - 200,(p.height/2) + 200))

        for(var i = 0; i < vehicleCount; i++){
          vehicles[i].seekVector = seekVector
        }
        seekTimer = 0
      }
    }
  }

  p.mouseMoved = () => {
    seekVector = p.createVector(p.mouseX, p.mouseY)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
    drum.pos = p.createVector(p.width/2, p.height/2)
  }
}
