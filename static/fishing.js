let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let request_id;

let monsterArray = []
let rod = null;
let reeling = false;

let background = [
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 50, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 52, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 70, 67, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 56, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 58, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 54, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
];


let tilesPerRow = 6;
let tileSize = 16;

let playerSprites = {
    walk: new Image(),
    idle: new Image(),
    attack: new Image(),
};

let oceanTileset = new Image();
let beachTileset = new Image();

let player = {
    x: 0,
    y: 150,
    xChange: 0,
    yChange: 0,
    width: 48,
    height: 48,
    frameX: 0,
    frameY: 0,
    isFighting: false,
    coins: 0,
    health: 100,
    speed: 3,
    animationState: "idle",
    frameCount: 8,
    direction: 1
};

let frameCounter = 0;
let frameDelay = 5;

let playerImage = new Image();

let mouseX = 0;
let mouseY = 0;


let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;


document.addEventListener("DOMContentLoaded", init, false);


function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (event) => {
        let rect = canvas.getBoundingClientRect(); //reference this
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    player.frameX = 0;
    player.frameY = 0;
    player.health = 100;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false)

    load_assets([
        { var: oceanTileset, url: "../static/images/oceanTileset.png" },
        { var: beachTileset, url: "../static/images/beachTileset.png" },
        { var: playerSprites.walk, url: "../static/images/playerwalk.png" },
        { var: playerSprites.idle, url: "../static/images/playeridle.png" }
    ], function () {
        console.log("All assets loaded!");

        for (let i = 0; i < 5; i++) {
            spawnMonster();
        }

        draw();

    });
}


function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;

    if (elapsed <= fpsInterval) {
        return;
    }

    then = now - (elapsed % fpsInterval);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#87cefa";


    // Draw tileset background
    for (let r = 0; r < background.length; r += 1) {
        for (let c = 0; c < background[r].length; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileset, tileId;

                // Determine which tileset to use
                if (tile < 50) {
                    // Ocean tileset (0-49)
                    tileset = oceanTileset;
                    tileId = tile;
                } else {
                    // Beach tileset (50-99)
                    tileset = beachTileset;
                    tileId = tile - 50;
                }

                let tileRow = Math.floor(tileId / tilesPerRow);
                let tileCol = Math.floor(tileId % tilesPerRow);

                context.drawImage(tileset,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    movePlayer();

    let currentSprite;
    if (player.animationState === "walk") {
        currentSprite = playerSprites.walk;
    } else {
        currentSprite = playerSprites.idle;
    }

    context.drawImage(
        currentSprite, 
        player.frameX * player.width, 
        player.frameY * player.height, 
        player.width,
        player.height, 
        player.x, 
        player.y, 
        player.width, 
        player.height 
    );

    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveLeft && moveRight)) {
        frameCounter++;
        if (frameCounter >= frameDelay) {
            player.frameX = (player.frameX + 1) % player.frameCount; // Loop through frames
            frameCounter = 0;
        }
    } else {
        player.frameX = 0; // Reset to the first frame when idle
    }


    // Draw the monsters
    for (let i = 0; i < monsterArray.length; i++) {
        let monster = monsterArray[i];

        // Monster movement and behavior
        if (monster.captured) {
            // Monster is captured (similar to hooked fish logic)
            if (monster.strength > 0) {
                if (reeling) {
                    let angle = Math.atan2(player.y - monster.y, player.x - monster.x);
                    monster.x += Math.cos(angle) * 2;
                    monster.y += Math.sin(angle) * 2;
                    monster.strength--;
                }

                // Possibility for the monster to escape
                if (Math.random() < monster.escapeChance) {
                    console.log("Monster escaped!");
                    monster.captured = false;
                    monster.speed = Math.random() * 1.5 + 0.5;
                    if (rod && rod.capturedMonster === monster) {
                        rod.capturedMonster = null;
                    }
                }
            } else {
                console.log("Monster Defeated!");
                player.coins += Math.floor(Math.random() * 10) + 1; // Reward for defeating monster
                monsterArray.splice(i, 1);
                i--; // Adjust index after removing element
                if (rod) {
                    rod.capturedMonster = null;
                }
                spawnMonster(); // Create a new monster
            }
        } else {
            // Normal monster movement
            monster.x += Math.cos(monster.angle) * monster.speed;
            monster.y += Math.sin(monster.angle) * monster.speed;

            // Occasionally change direction
            if (Math.random() < 0.02) {
                monster.angle += (Math.random() - 0.5) * 0.5;
            }

            // NEW: Occasionally move toward player if in range
            if (Math.random() < 0.01) {
                let distToPlayer = Math.hypot(player.x - monster.x, player.y - monster.y);
                if (distToPlayer < 150) {
                    monster.angle = Math.atan2(player.y - monster.y, player.x - monster.x);
                    monster.speed = 1.5; // Speed up when chasing player

                    // Attack player if close enough
                    if (distToPlayer < 30 && !monster.attackCooldown) {
                        console.log("Monster attacks!");
                        player.health -= monster.attackPower;
                        monster.attackCooldown = true;
                        setTimeout(() => { monster.attackCooldown = false; }, 2000); // 2 second cooldown
                    }
                }
            }

            // Wrap around screen
            if (monster.x < 0) monster.x = canvas.width;
            if (monster.x > canvas.width) monster.x = 0;
            if (monster.y < 0) monster.y = canvas.height;
            if (monster.y > canvas.height) monster.y = 0;
        }

        // Draw the monster (simple rectangle for now, you can use an image later)
        context.fillStyle = monster.color;
        context.fillRect(monster.x, monster.y, monster.size, monster.size);
    }

    // Draw weapon (formerly fishing rod)
    if (rod) {
        // Move weapon if not capturing a monster
        if (!rod.capturedMonster) {
            rod.x += Math.cos(rod.angle) * rod.speed;
            rod.y += Math.sin(rod.angle) * rod.speed;

            // Stop the weapon at max distance
            let distance = Math.hypot(rod.x - player.x, rod.y - player.y);
            if (distance > 150) {
                rod.speed = 0;
            }

            // Check for collisions with monsters
            for (let monster of monsterArray) {
                if (!monster.captured && collides(rod, monster)) {
                    monster.captured = true;
                    rod.capturedMonster = monster;
                    monster.speed = 0;
                    console.log("Monster captured!");
                    break;
                }
            }
        }

        // Draw the weapon line
        context.strokeStyle = "brown";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(player.x + player.width / 2, player.y + player.height / 2); // Start from player center
        context.lineTo(rod.x, rod.y); // Extend to weapon position
        context.stroke();

        // Draw the weapon point
        context.fillStyle = "red";
        context.fillRect(rod.x - 2, rod.y - 2, 5, 5);
    }

    // Draw player stats
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Coins: ${player.coins}`, 10, 20);
    context.fillText(`Health: ${player.health}`, 10, 45);
}


function movePlayer() {
    // Handle horizontal movement
    if (moveLeft && player.x > 0) {
        player.xChange -= 0.5;
        player.animationState = "walk";
        player.frameY = 1; // Row for walking left
    }
    if (moveRight && player.x + player.width < canvas.width) {
        player.xChange += 0.5;
        player.animationState = "walk";
        player.frameY = 2; // Row for walking right
    }

    // Handle vertical movement
    if (moveUp && player.y > 0) {
        player.yChange -= 0.5;
        player.animationState = "walk";
        player.frameY = 3; // Row for walking up
    }
    if (moveDown && player.y + player.height < canvas.height) {
        player.yChange += 0.5;
        player.animationState = "walk";
        player.frameY = 0; // Row for walking down
    }

    // If no movement keys are pressed, set to idle
    if (!moveLeft && !moveRight && !moveUp && !moveDown) {
        player.animationState = "idle";
    }

    // Update the player's position
    player.x += player.xChange;
    player.y += player.yChange;

    // Apply friction to slow down the player
    player.xChange *= 0.9;
    player.yChange *= 0.9;

    // Wrap around the screen horizontally
    if (player.x + player.width < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = -player.width;
    }

    // Wrap around the screen vertically
    if (player.y + player.height < 0) {
        player.y = canvas.height;
    } else if (player.y > canvas.height) {
        player.y = -player.height;
    }
}

function collides(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
}


function spawnMonster() {
    // Choose a random monster type
    const monsterTypes = [
        { color: "red", size: 20, attackPower: 5, strength: 15 },
        { color: "purple", size: 15, attackPower: 3, strength: 10 },
        { color: "darkgreen", size: 25, attackPower: 8, strength: 20 }
    ];

    const monsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    let monster = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: monsterType.size,
        color: monsterType.color,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
        captured: false,
        strength: monsterType.strength, // Instead of reelStrength
        attackPower: monsterType.attackPower, // New property
        escapeChance: Math.random() * 0.2 + 0.05,
        attackCooldown: false // To prevent continuous attacks
    };

    // Make sure monster doesn't spawn too close to player
    let distToPlayer = Math.hypot(player.x - monster.x, player.y - monster.y);
    if (distToPlayer < 100) {
        monster.x = (monster.x + canvas.width / 2) % canvas.width;
        monster.y = (monster.y + canvas.height / 2) % canvas.height;
    }

    monsterArray.push(monster);
}


function activate(event) {
    let key = event.key.toLowerCase();

    if (event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "w" ||
        event.key === "a" ||
        event.key === "s" ||
        event.key === "d") {
        event.preventDefault();
    }

    if (key === "ArrowLeft" || key === "a") {
        moveLeft = true;
        player.animationState = "walk";
        player.frameY = 1;
    } else if (key === "ArrowUp" || key === "w") {
        moveUp = true;
        player.animationState = "walk";
        player.frameY = 3;
    } else if (key === "ArrowRight" || key === "d") {
        moveRight = true;
        player.animationState = "walk";
        player.frameY = 2;
    } else if (key === "ArrowDown" || key === "s") {
        moveDown = true;
        player.animationState = "walk";
        player.frameY = 0;
    }

    if (key === "e") {
        if (!rod) {
            // Cast the fishing rod
            let angle = Math.atan2(mouseY - player.y, mouseX - player.x);

            rod = {
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                size: 5,
                speed: 5,
                angle: angle,
                capturedMonster: null
            };
        } else if (rod.capturedMonster) {
            // Start reeling when E is pressed and there's a captured monster
            reeling = true;
        }
    }

    if (key === "r" && rod) {
        console.log("You withdrew your hook");
        if (rod.capturedMonster) {
            rod.capturedMonster.captured = false;
            rod.capturedMonster.speed = Math.random() * 1.5 + 0.5;
        }
        rod = null;
    }
}


function deactivate(event) {
    let key = event.key.toLowerCase();

    if (key === "ArrowLeft" || key === "a") {
        moveLeft = false;
    } else if (key === "ArrowUp" || key === "w") {
        moveUp = false;
    } else if (key === "ArrowRight" || key === "d") {
        moveRight = false;
    } else if (key === "ArrowDown" || key === "s") {
        moveDown = false;
    } else if (key === "e") {
        reeling = false;
    }

    if (!moveLeft && !moveRight && !moveUp && !moveDown) {
        player.animationState = "idle";
    }
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded_assets = 0;

    let loaded = function () {
        console.log("Asset loaded");
        loaded_assets++;
        if (loaded_assets === num_assets) {
            callback();
        }
    };

    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("Loading image:", asset.url);
            element.addEventListener("load", loaded, false);
        } else if (element instanceof HTMLAudioElement) {
            console.log("Loading audio:", asset.url);
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

function stop() {
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    window.cancelAnimationFrame(request_id);
}



