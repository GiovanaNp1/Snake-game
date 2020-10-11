let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "rigth";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

function criarCobrinha() {
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = "green";
        context.fillRect(snake[index].x, snake[index].y, box, box);
    }
}

document.addEventListener('keydown', update)

function iniciarJogo(params) {
    if(snake[0].x >15 * box && direction == "rigth") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x =16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for (let index = 1; index < snake.length; index++) {
        if(snake[0].x == snake[index].x && snake[0].y == snake[index].y){
            clearInterval(jogo);
            alert('Game over :(')
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakex = snake[0].x
    let snakey = snake[0].y

    if(direction == "rigth") snakex += box;
    if(direction == "left") snakex -= box;
    if(direction == "up") snakey -= box;
    if(direction =="down") snakey += box;

    if(snakex != food.x || snakey != food.y){
        snake.pop();
        document.getElementById("ponto").innerHTML = "Pontuação: " + snake.length;
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box 
    }

    let newHead = {
        x: snakex,
        y: snakey
    }

    snake.unshift(newHead);
}

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "rigth";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

let jogo = setInterval(iniciarJogo, 100);