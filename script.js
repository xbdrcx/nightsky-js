const canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.append(canvas)
const ctx = canvas.getContext("2d")
var stars = []
var starMaxSize = 0.01
var starGlow = 60
var numStars = 400
var nearStarProbability = 0.1

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class Star {
    constructor(xpos, ypos, maxSize, context) {

        this.starId = stars.length
        this.x = xpos
        this.y = ypos
        this.size = Math.random() * (maxSize - 0.5) + 0.5
        this.color = "white"
        this.context = context
        this.hasGlow = Math.floor(Math.random() * (2 - 0) - 0)

        this.context.fillStyle = this.color
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.size, this.size, 4 * Math.PI)
        this.context.fill()

        if(this.hasGlow) {
            this.context.shadowBlur = starGlow
            this.context.shadowColor = "white"
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.size + 1, this.size + 1, 4 * Math.PI)
            this.context.fill()
        }

        stars.push(this)

    }
    updatePosition() {

        this.x = this.x + 1
        this.y = this.y + 1

        this.context.fillStyle = this.color
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.size, this.size, 4 * Math.PI)
        this.context.fill()

        if(this.hasGlow) {
            var randBlur = Math.floor(Math.random() * (starGlow - 2) + 2)
            this.context.shadowBlur = randBlur
            this.context.shadowColor = "white"
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.size + 1, this.size + 1, 4 * Math.PI)
            this.context.fill()
        }

        if(this.x == canvas.width || this.y == canvas.height) {
            var createStar = Math.floor(Math.random() * (2 - 0) + 0)
            var randomDirection = Math.floor(Math.random() * (2 - 0) + 0)
            if(createStar == 1) {
                if(randomDirection == 0) {
                    var randomX = Math.floor(Math.random() * (canvas.width - 0) + 0)
                    new Star(randomX, 0, starMaxSize, ctx)
                } else {
                    var randomY = Math.floor(Math.random() * (canvas.height - 0) + 0)
                    new Star(0, randomY, starMaxSize, ctx)
                }
            }
        }

    }
}

function probability(n) {
    return Math.random() < n
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0; i<stars.length; i++) {
        stars[i].updatePosition()
    }
    setTimeout(function(){
        requestAnimationFrame(tick)
    }, 10)
}

document.addEventListener("DOMContentLoaded", function() {
    for(let i=0; i<numStars; i++) {
        var randomX = Math.floor(Math.random() * (canvas.width - 0) + 0)
        var randomY = Math.floor(Math.random() * (canvas.height - 0) + 0)
        new Star(randomX, randomY, starMaxSize, ctx)
    }
    tick()
})
