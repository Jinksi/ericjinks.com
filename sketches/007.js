export default (p) => {

  let flowfield
  let vehicles = []
  let vehicleCount = 300
  let sr
  let timer = 10000

  function Vehicle(x, y, sr){
    this.prevPos = p.createVector(x,y)
    this.pos = p.createVector(x,y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.r = 3
    this.colour = Math.round(p.random(0,1)) === 0 ? '#E33590' : '#BE5005'
    this.xoff = p.random(0, 100)
    this.sr = sr || 10
    // maximum magnitude
    this.maxSpeed = p.random(sr / 10, sr)
    // turning circle
    this.maxForce = p.random(0.02, 0.07)
    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.follow = (flow) => {
      // what is the vector at this spot in flow field
      let desired = flow.lookup(this.pos)
      desired.mult(this.maxSpeed)
      // steering = desired - velocity
      let steering = p5.Vector.sub(desired, this.vel)
      // limit to maxForce
      steering.limit(this.maxForce)

      // Apply the steering force on the vehicle
      this.applyForce(steering)
    }

    this.update = () => {
      this.prevPos = this.pos.copy()
      this.vel.add(this.acc)
      this.vel.limit(this.maxSpeed) // limit vel to maxSpeed
      this.pos.add(this.vel)
      this.acc.set(0,0)

      if(this.pos.y < 0){ this.pos.y = this.prevPos.y = p.height }
      if(this.pos.x < 0){ this.pos.x = this.prevPos.x = p.width }
      if(this.pos.y > p.height){ this.pos.y = this.prevPos.y = 0 }
      if(this.pos.x > p.width){ this.pos.x = this.prevPos.x =  0 }
    }

    this.display = () => {
      p.blendMode(p.ADD)
      p.stroke(this.colour)
      p.strokeWeight(p.map(p.noise(this.xoff), 0, 1, 0, 6))
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.xoff += 0.3
    }
  }

  function FlowField(res){
    // resolution of each 'cell'
    this.resolution = res

    // Determine Columns/Rows
    this.cols = p.width/this.resolution
    this.rows = p.height / this.resolution

    // fake 2D array
    this.make2Darray = (n) => {
      let array = []
      for (let i = 0; i < n; i++){
        array[i] = []
      }
      return array
    }

    this.init = () => {
      this.field = null
      this.field = this.make2Darray(this.cols)
      // reseed noise
      p.noiseSeed(Math.floor(p.random(10000)))
      let xoff = 0
      for (let i = 0; i < this.cols; i++){
        let yoff = 7
        for (let j = 0; j < this.rows; j++){
          // generate random angle for this cell
          let theta = p.map(p.noise(xoff, yoff), 0, 1, 0, p.PI * 1.5)
          // theta = map(random(), 0, 1, 0, TWO_PI)
          // Polar to cartesian coordinate transformation to get x and y components of the vector
          let vect = p.createVector(p.cos(theta), p.sin(theta))

          this.field[i][j] = vect.mult(-1)
          yoff += 0.3
        }
        xoff += 0.3
      }
    }

    this.init()

    // Draw each vector
    this.display = () => {
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2)
        }
      }
    }

    this.drawVector = (v, x, y, scale) => {
      p.push()
      let arrowsize = 4
      // Translate to vector location
      p.translate(x, y)
      p.stroke(150)
      // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
      p.rotate(v.heading())
      //  calc mag of vector and scale
      let len = v.mag() * scale
      // draw line
      p.line(0, 0, len, 0)
      p.pop()
    }

    // instructions to Vehicle
    this.lookup = (lookup) => {
      let col = Math.floor(p.constrain(lookup.x / this.resolution, 0, this.cols - 1))
      let row = Math.floor(p.constrain(lookup.y / this.resolution, 0, this.rows - 1))
      return this.field[col][row].copy()
    }
  }

  p.setup = () => {
    sr = p.random(0.2, 5)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.pixelDensity(2)
    p.background(21)

    vehicles[0] = new Vehicle(p.random(p.width), p.random(p.height), sr)
    flowfield = new FlowField(100)
    // generate fresh flowfield
    setInterval(function(){
      flowfield.init()
    }, timer)

  }

  p.draw = () => {
    p.blendMode(p.NORMAL)
    p.background(21, 100)
    for (let i = 0; i < vehicles.length; i++){
      vehicles[i].update()
      vehicles[i].display()
      vehicles[i].follow(flowfield)
    }
    if(vehicles.length < vehicleCount){
      vehicles.push(new Vehicle(p.random(p.width), p.random(p.height), sr))
    }
    // flowfield.display();

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

}
