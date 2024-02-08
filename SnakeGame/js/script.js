const canvasGame = document.querySelector(".canvas01")
const canvasPlacar = document.querySelector(".canvas02")
const ctxGame = canvasGame.getContext("2d")
const ctxPlacar = canvasPlacar.getContext("2d")

const size = 30

const snake = [
    { x: 200, y: 200 },
    { x: 230, y: 200 },
    { x: 260, y: 200 },
    { x: 290, y: 200 }
]

const drawSnake = () => {
    ctxGame.fillStyle = "red"

    snake.forEach((position) => {
        ctxGame.fillRect(position.x, position.y, size, size)
    })
}

drawSnake()

ctxPlacar.fillStyle = "blue"
ctxPlacar.fillRect(150, 300, 50, 50)