const canvasGame = document.querySelector(".canvas01")
const canvasPlacar = document.querySelector(".canvas02")
const ctxGame = canvasGame.getContext("2d")
const ctxPlacar = canvasPlacar.getContext("2d")

const size = 30

const snake = [
    { x: 200, y: 200 },
    { x: 230, y: 200 }
]

let direction;
let loopId;


const drawSnake = () => {
    ctxGame.fillStyle = "#ddd"

    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctxGame.fillStyle = "blue"
        }
        ctxGame.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    snake.shift()
}

const gameLoop = () => {
    /* if (loopId) {
         clearInterval(loopId)
     }
     */

    ctxGame.clearRect(0, 0, 600, 600)
    moveSnake()
    drawSnake()

    let loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

ctxPlacar.fillStyle = "blue"
ctxPlacar.fillRect(150, 300, 50, 50)