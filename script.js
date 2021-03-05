const WIDTH = 1400
const HEIGHT = 800
const PARTICLE_SIZE = 5
const PARTICLE_CHANGE_SIZE_SPD = 0.1
const PARTICLE_CHANGE_SPD = 0.3
const ACCELERATION = .1

class particle {
  constructor(bullet, deg) {
    this.bullet = bullet
    this.ctx = bullet.ctx
    this.deg = deg
    this.x = bullet.x
    this.y = bullet.y
    this.size = PARTICLE_SIZE

    // toc do phong hat luc khoi tao
    this.speed = 10
    this.speedX = 0
    this.speedY = 0
    this.fallSpeed = 0
  }
  update() {
    // ban ra thay doi toc do
    this.speed -= PARTICLE_CHANGE_SPD
    if (this.speed < 0) { // SPD khong am => hat di theo huong +, khong di nguoc lai
      this.speed = 0
    }

    // + gia toc roi
    this.fallSpeed += ACCELERATION

    // tao random do lon cua dai luong speedX va speedY
    this.speedX = this.speed * Math.cos(this.deg)
    this.speedY = this.speed * Math.sin(this.deg)
    // calculate position
    this.x += this.speedX
    this.y += this.speedY

    // ban ra, giam kich thuoc dan di
    if (this.size > PARTICLE_CHANGE_SIZE_SPD) {
      this.size -= PARTICLE_CHANGE_SIZE_SPD
    }
  }
  draw() {
    this.ctx.fillStyle = '#ff0000'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}


class bullet {
  constructor(fireworks) {
    this.fireworks = fireworks
    this.ctx = fireworks.ctx
    this.x = 300
    this.y = 300
    this.color = Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255)

    this.particles = []

    // 10 particles
    for (let i = 0; i < 10; i++) {
      // tinh deg / 1 particle
      let bulletDeg = Math.PI * 2 / 10

      let newParticle = new particle(this, i * bulletDeg)
      this.particles.push(newParticle)
    }
    // create one particle
    // let newParticle = new particle(this, 1)
    // this.particles.push(newParticle)
  }
  update() {
    this.particles.forEach(particle => particle.update())
  }
  draw() {
    this.particles.forEach(particle => particle.draw())
  }
}


class fireworks {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = WIDTH
    this.canvas.height = HEIGHT
    document.body.appendChild(this.canvas)

    this.bullets = []
    // create new bullet
    let newBullet = new bullet(this)
    this.bullets.push(newBullet)

    this.loop()
  }

  loop() {
    this.bullets.forEach(bullet => bullet.update())
    this.draw()
    setTimeout(() => this.loop(), 20)
  }

  clearScreen() {
    this.ctx.fillStyle = '#000000'
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  draw() {
    this.clearScreen()
    this.bullets.forEach(bullet => bullet.draw())
  }
}

var f = new fireworks()
