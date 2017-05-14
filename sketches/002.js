export default (p) => {

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.pixelDensity(2)
    p.background('#5100CC')
    p.frameRate(24)
  }

  p.draw = () => {

    var h = (p.height / 4) + (p.randomGaussian() * p.height / 4)
    p.fill('rgba(26, 223, 185, 0.8)')
    p.stroke('#1ADFB9')
    p.blendMode(p.ADD)
    p.ellipse(p.width/2, p.height/2, h, h)
    p.blendMode(p.NORMAL)
    p.fill('rgba(81, 0, 204, 0.05)')
    p.strokeWeight(0)
    p.stroke(0)
    p.rect(0,0, p.width, p.height)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

}
