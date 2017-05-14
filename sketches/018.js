const firebase = require('firebase/app')
require('firebase/database')
const moment = require('moment')
const _each = require('lodash/each')
const _remove = require('lodash/remove')
const _throttle = require('lodash/throttle')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFOf68gcuZVX8Vlpas-BjFi9HZqwoitSw",
  authDomain: "bioluminescence-i.firebaseapp.com",
  databaseURL: "https://bioluminescence-i.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "734077922729"
};
firebase.initializeApp(config);

const dbVehicles = firebase.database().ref().child('vehicleCount')
const dbPlayers = firebase.database().ref().child('players')

export default (p) => {

  let vehicles = []
  let vehicleCount = 7
  let players = {}
  let vehicleGroups = {}
  let me = {
    x: 0.5,
    y: 0.5,
    time: moment().toISOString(),
    colour: chooseColour()
  }

  dbVehicles.on('value', data => vehicleCount = data.val())
  dbPlayers.on('value', data => {
    players = data.val()
  })

  function chooseColour(){
    const random = Math.random()
    if(random < .2) return '#FE5050'
    if(random < .4) return '#26C0F7'
    if(random < .6) return '#49D582'
    if(random < .8) return '#FF3690'
    return '#fff736'
  }

  function newPlayer(player){
    const newPlayerKey = dbPlayers.push().key
    player.key = newPlayerKey

    let updates = {}
    updates[newPlayerKey] = {
      x: player.x,
      y: player.y,
      time: player.time,
      colour: player.colour
    }
    return dbPlayers.update(updates)
  }

  function kickPlayers(players){
    console.log('checking afk players')
    const now = moment()
    let kicked = []
    _each(players, (player, playerKey) => {
      const playerTime = player.time
      const diff = now.diff(moment(playerTime))
      if(!player.time || !player.colour || diff > 60000){
        console.log(`kicking ${playerKey}`);
        dbPlayers.child(playerKey).remove()
        kicked.push(playerKey)
      }
    })
    kicked.map(playerKey => {
      _remove(vehicles, vehicle => {
        return vehicle.key === playerKey
      })
    })

  }

  setInterval(() => kickPlayers(players), 10000)

  function updatePlayer(player){
    if(!player.key) return
    let updates = {}
    updates[player.key] = {
      x: player.x,
      y: player.y,
      time: player.time,
      colour: player.colour
    }
    return dbPlayers.update(updates)
  }


  var Vehicle = function(x, y, seekVector, colour, key){
    this.key = key
    this.seekVector = seekVector
    this.prevPos = p.createVector(x,y)
    this.pos = p.createVector(x,y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.colour = colour || '#FE5050'
    this.xoff = p.random(0, 100)
    this.sr = 10
    this.desiredSeparation = 30
    // maximum magnitude
    this.maxSpeed = p.random(this.sr / 5, this.sr)
    // turning circle
    this.maxForce = p.random(0.5, 0.2)

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
      if(this.pos.x > p.width){ this.pos.x = this.prevPos.x = p.width }
    }

    this.display = function(){
      p.blendMode(p.ADD)
      p.stroke(this.colour)
      p.strokeWeight(p.map(p.noise(this.xoff), 0, 1, 1, 5))
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.xoff += 0.3
    }

  }

  var VehicleGroup = function(vehicleCount, player, playerKey){

    this.seekVector

    this.vehicleCount = vehicleCount

    this.init = function(){
      this.seekVector = p.createVector(
        p.windowWidth * player.x,
        p.windowHeight * player.y
      )

      for(let i = 0; i < this.vehicleCount; i++){
        vehicles.push(
          new Vehicle(
            p.width/2 + p.random(-5, 5),
            p.height/2 + p.random(-5, 5),
            this.seekVector,
            player.colour,
            playerKey
          )
        )
      }
    }

    this.update = function(player){
      this.seekVector.set(
        p.windowWidth * player.x,
        p.windowHeight * player.y
      )
    }

  }

  p.setup = () => {
    newPlayer(me)
    p.pixelDensity(2)
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

  p.draw = () => {
    p.blendMode(p.MULTIPLY)
    p.background(21, 20)

    _each(players, (player, playerKey) => {
      // each player create vehicleGroup
      if(!vehicleGroups[playerKey]){
        vehicleGroups[playerKey] = new VehicleGroup(vehicleCount, player, playerKey)
        vehicleGroups[playerKey].init()
      }

      // each vehicleGroup create vehicles with seekVector
      vehicleGroups[playerKey].update(player)
    })


    for(let i = 0; i < vehicles.length; i++){
      vehicles[i].applyBehaviours(vehicles)
      vehicles[i].update()
      vehicles[i].display()
    }
  }

  var updateMe = _throttle(() => {
    me.x = p.mouseX / p.windowWidth
    me.y = p.mouseY / p.windowHeight
    me.time = moment().toISOString()
    updatePlayer(me)
  }, 100)

  p.mouseMoved = function(){
    updateMe()
  }

  p.touchMoved = function(){
    updateMe()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.background(21)
  }

}
