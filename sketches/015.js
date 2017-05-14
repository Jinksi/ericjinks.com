export default (p) => {

  let n = 0
  let c = 10
  let mode = 1
  let dots = []
  let dotCount = 1000
  let angle = 137.5
  let blur = 75

  const Dot = function(n, c){
    this.n = n
    this.col = 255
    this.xoff = mode ? n*n : n / 10
    this.inc = mode ? 0.005 : 0.02
    this.render = () => {
      this.c = c
      // this.a = (this.n * 137.5) + (p.millis() / 100) * p.sin(dotCount / n) * 200
      this.a = (this.n * angle) + p.map(p.noise(this.xoff), 0, 1, -10, 10)
      this.r = this.c * p.sqrt(this.n)
      this.x = this.r * p.cos(this.a) + p.width/2
      this.y = this.r * p.sin(this.a) + p.height/2
      p.fill(this.col)
      p.noStroke()
      if(mode){
        p.ellipse(this.x, this.y, p.map(p.sin(p.millis() / 10 + n*n), 0, 1, 0, 4))
      } else {
        p.ellipse(this.x, this.y, 4 - (n * (0.005 * c / 15)))
      }
      this.xoff += this.inc
    }
  }

  function init(){
    dotCount = p.width * 1.5
    dots = []
    for(let n = dots.length; n < dotCount; n++){
      dots.push(new Dot(n, c))
    }
  }

  p.setup = () => {
    p.frameRate(60)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
    p.angleMode(p.DEGREES)
    init()
  }

  p.draw = () => {
    p.background(21, blur)
    dots.map(dot => dot.render())
    angle = p.map(p.width - p.mouseX, 0, p.width, 137.3, 137.5)
    blur = p.map(p.height - p.mouseY, 0, p.height, 150, 10)
  }

  p.mouseClicked = () => {
    mode = !mode
    c = p.random(8, 15)
    init()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }
}
