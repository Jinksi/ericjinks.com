export default (p) => {

  const col1 = 21
  const range = p.random(10, 15)
  let system = []

  const Eqo = function(posy){
    this.col = p.random(1) > .5 ? '#d96083' : 255
    this.posy = posy
    this.yoff = this.posy * 0.001
    this.update = function(){
      // p.blendMode(p.OVERLAY)
      p.stroke(this.col)
      p.noFill()
      // We are going to draw a polygon out of the wave points
      p.beginShape()

      this.xoff = this.posy * 0.003
      for (let x = 0; x <= p.width; x += 10) {

        // Calculate a y value according to noise, map to
        let y = p.map(p.noise(this.xoff, this.yoff), 0, 1, this.posy, ((this.posy + range) * 4))
        // Set the vertex
        p.vertex(x, y)
        // Increment x dimension for noise
        this.xoff += 0.009
      }
      // increment y dimension for noise
      this.yoff += 0.003
      // p.vertex(p.width, p.height)
      // p.vertex(0, p.height)
      p.endShape()

    }
  }

  p.setup = () => {
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(col1)
    let posy = 0
    while(posy < p.height){

      system.push(new Eqo(posy))
      posy += p.random(range, range * 2)
    }
  }

  p.draw = () => {
    p.blendMode(p.NORMAL)
    p.background(col1, 200)
    system.map(eqo => eqo.update())
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }
}
