export default (p) => {

  const NUM_PARTICLES = 500
  let psys

  function Particle(){
    this.position = p.createVector(p.random(p.width), p.random(p.height))
    this.velocity = p.createVector(0,0)

    this.update = () => {
      this.velocity.x = 1*(p.noise(this.position.y/1000)-0.5)
      this.velocity.y = 1*(p.noise(this.position.x/1000)-0.5)
      this.position.add(this.velocity)

      if(this.position.x<0)this.position.x+=p.width
      if(this.position.x>p.width)this.position.x-=p.width
      if(this.position.y<0)this.position.y+=p.height
      if(this.position.y>p.height)this.position.y-=p.height
    }

    this.render = () => {
      p.stroke(255)
      p.line(this.position.x,this.position.y,this.position.x-this.velocity.x,this.position.y-this.velocity.y)
    }
  }

  function ParticleSystem(NUM_PARTICLES){
    this.particles = []

    this.addParticle = () => {
      if(this.particles.length <= 500){
        this.particles.push(new Particle())
      }
    }

    this.update = () => {
      this.particles.map(part => part.update())
    }

    this.render = () => {
      this.particles.map(part => part.render())
    }
  }

  p.setup = function() {
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background('#212121')
    psys = new ParticleSystem()
  }

  p.draw = function()  {

    p.noStroke()
    p.fill('rgba(33, 33, 33, 0.9)')
    p.ellipse(p.width/2,p.height/2,p.height/2,p.height/2)
    p.fill('rgba(31,31,31,0)')
    p.rect(0,0,p.width,p.height)

    psys.addParticle()
    psys.update()
    psys.render()

  }

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background('#212121')
    psys = new ParticleSystem()

  }


}
