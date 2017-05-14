export default (p) => {

  var locs = []
  p.setup = () => {
    p.frameRate(60)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(50)
    locs.push([ p.width/2, p.height/2, 0, 100000 ])
    locs.push([ p.width/2, p.height/2, 0, p.random(10000) ])
  }

  p.draw = () => {
    p.blendMode(p.NORMAL)
    p.background(50, 255)
    for(var i = 0; i < locs.length; i++){
      drawCircle(locs[i][0], locs[i][1], locs[i][2], locs[i][3])
      locs[i][0] += p.map(p.noise(locs[i][3]), 0, 1, -2, 2)
      locs[i][1] += p.map(p.noise(locs[i][3] - 70), 0, 1, -2, 2)
      // if(locs[i][0] < 50 ) locs[i][0] = 50
      // if(locs[i][0] > width -50 ) locs[i][0] = width -50
      // if(locs[i][1] < 50 ) locs[i][1] = 50
      // if(locs[i][1] > height -50 ) locs[i][1] = height -50
      locs[i][2] += 10
      locs[i][3] += 0.001
    }
    for(var i = 0; i < locs.length; i++){
      p.blendMode(p.NORMAL)
      p.fill(50, locs[i][2] / 2)
      p.ellipse(locs[i][0], locs[i][1], 100, 100)
    }
  }

  function drawCircle(x, y, diam, xoff){
    p.blendMode(p.NORMAL)
    p.noFill()
    p.stroke('rgba(255, 255, 255, '+ p.map(diam, 2, p.width, 0.3, 0.8) + ')')
    p.strokeWeight(1)
    p.ellipse(x, y, diam, diam)

    if(diam > 50 ){
      // diam *= .9
      diam *= p.map(p.noise(xoff), 0, 1, 0.8, 0.9)
      drawCircle(x, y, diam, xoff)
    }

  }

  p.mouseClicked = () => {
    locs.splice(0, 2)
    locs.push([ p.mouseX, p.mouseY, 10, p.random(10000) ])
    locs.push([ p.mouseX, p.mouseY, 10, p.random(10000) ])
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(50)
  }
}
