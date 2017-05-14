export default (p) => {
  var t = 0
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.pixelDensity(2)
    p.background('#050505')
    p.frameRate(60)
  }

  p.draw = function() {

    // random
    var x = p.random(0, p.width)
    var y = p.random(0, p.height)
    p.fill(255, 100)
    p.noStroke()
    // ellipse(x, y, 1, 1)

    // Perlin Noise
    t = t + 1
    for (var i = 1; i <= 50; i++) {
      var tx = t / i
      var p1 = p.noise(tx)
      var p2 = p.noise(tx - 2)
      var a = p.map(p1, 0, 1, 0, p.width)
      var b = p.map(p2, 0, 1, 0, p.height)
      p.fill('rgba(255, 54, 144, 0.2)')
      p.noStroke()
      p.blendMode(p.ADD)
      var size = p.random(1, 2)
      p.ellipse(a, b, size, size)

    }

  }

  p.windowResized = function() {
    t = 0
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background('#050505')

  }
}
