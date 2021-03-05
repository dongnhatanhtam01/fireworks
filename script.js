const WIDTH = 1400
const HEIGHT = 800
const PARTICLE_SIZE = 8
const PARTICLE_CHANGE_SIZE_SPD = 0.1
const PARTICLE_CHANGE_SPD = 0.5
const ACCELERATION = .15

// dot parameter
const DOT_CHANGE_SIZE_SPD = .05
const DOT_CHANGE_ALP_SPD = .05

// toc do ban it nhat
const PARTICAL_MIN_SPD = 14

// amount of particle in 1 bullet
NUMBER_PARTICAL_PER_BULLET = 25

class particle {
  constructor(bullet, deg) {
    this.bullet = bullet
    this.ctx = bullet.ctx
    this.color = this.bullet.color
    this.deg = deg
    this.x = bullet.x
    this.y = bullet.y
    this.size = PARTICLE_SIZE

    // toc do phong hat luc khoi tao
    this.speed = Math.random() * 4 + PARTICAL_MIN_SPD
    this.speedX = 0
    this.speedY = 0
    this.fallSpeed = 0

    // cham con cua partical
    this.dots = []
    // { x: 10, y: 10, alpha: 1, size: 10 }
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
    this.speedY = this.speed * Math.sin(this.deg) - this.fallSpeed
    // calculate position
    this.x += this.speedX
    this.y += this.speedY

    // ban ra, giam kich thuoc dan di
    if (this.size > PARTICLE_CHANGE_SIZE_SPD) {
      this.size -= PARTICLE_CHANGE_SIZE_SPD
    }

    // neu hat con du lon va con xuat hien tren man hinh
    if (this.size > 0) {
      this.dots.push({
        x: this.x,
        y: this.y,
        alpha: 1,
        size: this.size
      })
    }

    // lam mo cham con
    this.dots.forEach(dot => {
      dot.size -= DOT_CHANGE_SIZE_SPD
      dot.alpha -= DOT_CHANGE_ALP_SPD
    })

    // sửa lỗi dot < 0
    this.dots = this.dots.filter(dot => {
      return dot.size > 0
    })

    // xóa bỏ 1 hạt khi nó hết thuốc
    if (this.dots.length == 0) {
      this.remove()
    }
  }
  remove() {
    // indexOf (this) ý nói hạt hiện tại trong mảng
    this.bullet.particles.splice(this.bullet.particles.indexOf(this), 1)
  }
  draw() {
    // ve them hat cho dep
    this.dots.forEach(dot => {
      this.ctx.fillStyle = 'rgba(' + this.color + ',' + dot.alpha + ' )'
      this.ctx.beginPath()
      this.ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI)
      this.ctx.fill()
    })

    // this.ctx.fillStyle = '#ff0000'
    // this.ctx.beginPath()
    // this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    // this.ctx.fill()
  }
}


class bullet {
  constructor(fireworks) {
    this.fireworks = fireworks
    this.ctx = fireworks.ctx
    this.x = Math.random() * WIDTH
    this.y = Math.random() * HEIGHT / 2
    this.color = Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255)

    this.particles = []

    // 10 particles
    let bulletDeg = Math.PI * 2 / NUMBER_PARTICAL_PER_BULLET
    for (let i = 0; i < NUMBER_PARTICAL_PER_BULLET; i++) {
      // tinh deg / 1 particle
      let newParticle = new particle(this, i * bulletDeg)
      this.particles.push(newParticle)
    }
    // create one particle
    // let newParticle = new particle(this, 1)
    // this.particles.push(newParticle)
  }
  update() {
    if (this.particles.length == 0) {
      this.remove()
    }
    this.particles.forEach(particle => particle.update())
  }
  draw() {
    this.particles.forEach(particle => particle.draw())
  }
  remove() {
    this.fireworks.bullets.splice(this.fireworks.bullets.indexOf(this), 1)
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

    // tao ra nhieu qua bullet 
    setInterval(() => {
      let newBullet = new bullet(this)
      this.bullets.push(newBullet)
    }, 1500)

    // create new bullet
    // let newBullet = new bullet(this)
    // this.bullets.push(newBullet)

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
