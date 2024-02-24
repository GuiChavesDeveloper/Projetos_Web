const canvasGame = document.querySelector(".canvas01")
const ctxGame = canvasGame.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio('\assets/audio.mp3')

const size = 30

const initialPosition = { x: 300, y: 300 }

let snake = [initialPosition]

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvasGame.width - size)
    return Math.round(number / 30) * 30
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "orange"
}

let direction;
let loopId;

const drawFood = () => {
    const { x, y, color } = food

    ctxGame.shadowColor = color;
    ctxGame.shadowBlur = 6
    ctxGame.fillStyle = color;
    ctxGame.fillRect(x, y, size, size)
    ctxGame.shadowBlur = 0
}

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

const drawGrid = () => {
    ctxGame.lineWidth = 1
    ctxGame.strokeStyle = "#191919"

    for (let i = 30; i < canvasGame.width; i += 30) {
        ctxGame.beginPath();
        ctxGame.lineTo(i, 0);
        ctxGame.lineTo(i, canvasGame.width);
        ctxGame.stroke();

        ctxGame.beginPath();
        ctxGame.lineTo(0, i);
        ctxGame.lineTo(canvasGame.width, i);
        ctxGame.stroke();
    }
}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvasGame.width - size
    const neckIndex = snake.length - 2

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvasGame.style.filter = "blur(4px)"
}

const gameLoop = () => {
    clearInterval(loopId)

    ctxGame.clearRect(0, 0, 630, 630)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 250)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvasGame.style.filter = "none"
    snake = [initialPosition]
    food.x = randomPosition()
    food.y = randomPosition()
})