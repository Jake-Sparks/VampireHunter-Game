let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let request_id;

let monsterArray = [];
let hook = null;
let reeling = false;
let projectiles = [];
let damageNumbers = [];

let currentWave = 1;
let maxWaves = 5;
let enemiesRemaining = 0; // tracks how many enemies left in the wave
let waveInProgress = false;
let gameWon = false;

let background = [
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56],
    [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56]
];


let tilesPerRow = 6;
let tileSize = 16;

let playerSprites = {
    walk: new Image(),
    idle: new Image(),
    attack: new Image()
};

let monsterSprites = {
    purple: new Image(),
    red: new Image(),
    green: new Image(),
    blue: new Image(),
    boss: new Image()
};

let vampTileset = new Image();

let player = {
    x: 0,
    y: 150,
    xChange: 0,
    yChange: 0,
    width: 64,
    height: 64,
    frameX: 0,
    frameY: 0,
    isFighting: false,
    coins: 0,
    health: 100,
    speed: 3,
    animationState: "idle",
    frameCount: 4,
    direction: 1,
    lastDirection: 0
};

let score = 0;

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
        let rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width; // Horizontal scale factor
        let scaleY = canvas.height / rect.height; // Vertical scale factor
        mouseX = (event.clientX - rect.left) * scaleX;
        mouseY = (event.clientY - rect.top) * scaleY;
    });

    canvas.addEventListener("click", (event) => {
        // Only allow melee attack if we have a captured monster
        if (hook && hook.capturedMonster) {
            performMeleeAttack(hook.capturedMonster);
        }
    });

    player.frameX = 0;
    player.frameY = 0;
    player.health = 100;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false)

    load_assets([
        { var: vampTileset, url: "../static/images/tileset.png" },
        { var: playerSprites.walk, url: "../static/images/vampire1_run.png" },
        { var: playerSprites.idle, url: "../static/images/vampire1_idle.png" },
        { var: monsterSprites.purple, url: "../static/images/goblin.png" },
        { var: monsterSprites.red, url: "../static/images/BODY_male.png" },
        { var: monsterSprites.green, url: "../static/images/vampire2.png" },
        { var: monsterSprites.blue, url: "../static/images/vampire3.png" },
        { var: monsterSprites.boss, url: "../static/images/boss.png" }
    ], function () {
        console.log("All assets loaded!");

        // Start the first wave
        spawnWave();

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
    context.fillStyle = "#856cef"; // Fixed hex color code

    drawBackground();
    drawPlayer();
    movePlayer();
    updateWaveProgress();
    drawProjectiles();
    drawDamageNumbers();
    preventMonsterOverlap();

    // Draw the monsters
    for (let i = 0; i < monsterArray.length; i++) {
        let monster = monsterArray[i];

        if (monster.type === "boss") {
            // Draw the boss sprite
            context.drawImage(
                boss.sprite,
                boss.frameX * monster.width,
                boss.frameY * monster.height,
                boss.width,
                boss.height,
                boss.x,       // X position
                boss.y,       // Y position
                boss.size,    // Width
                boss.size     // Height
            );

            // Draw boss health bar
            context.fillStyle = "red";
            context.fillRect(monster.x, monster.y - 15, monster.size, 5);
            context.fillStyle = "green";
            context.fillRect(monster.x, monster.y - 15, monster.size * (monster.health / 500), 5);

            // Boss behavior
            monster.move();
            monster.fireFlames();

            if (monster.health <= 0) {
                console.log("Boss defeated!");
                monsterArray.splice(i, 1);
                i--;
                enemiesRemaining--;
                score += 500;

                if (currentWave >= maxWaves) {
                    console.log("You won the game!");
                    stop(); // End the game
                } else {
                    console.log(`Wave ${currentWave} completed!`);
                    // Let updateWaveProgress handle the next wave
                }
            }
        } else {
            // Update animation frame
            monster.frameCounter++;
            if (monster.frameCounter >= monster.frameDelay) {
                monster.frameX = (monster.frameX + 1) % monster.frameCount;
                monster.frameCounter = 0;
            }


            // Draw regular monster sprite
            context.drawImage(
                monster.sprite, // Monster sprite
                monster.frameX * monster.width,
                monster.frameY * monster.height,
                monster.width,
                monster.height,
                monster.x,       // X position
                monster.y,       // Y position
                monster.size,    // Width
                monster.size     // Height
            );

            // Draw health bar for regular monsters
            context.fillStyle = "red";
            context.fillRect(monster.x, monster.y - 5, monster.size, 3);
            context.fillStyle = "green";
            let maxHealth = 30 + (currentWave * 5);
            context.fillRect(monster.x, monster.y - 5, monster.size * (monster.health / maxHealth), 3);

            if (monster.captured && !monster.escapeCooldown) {
                if (monster.health > 0) {
                    if (reeling) {
                        let angle = Math.atan2(player.y - monster.y, player.x - monster.x);
                        monster.x += Math.cos(angle) * 2;
                        monster.y += Math.sin(angle) * 2;
                        monster.health--;
                    }

                    // Possibility for the monster to escape 
                    if (Math.random() < monster.escapeChance) {
                        console.log("Monster escaped!");
                        monster.captured = false;
                        monster.speed = Math.random() * 2 + 1;
                        if (hook && hook.capturedMonster === monster) {
                            hook.capturedMonster = null;
                        }
                    }
                } else {
                    console.log("Monster Defeated!");
                    player.coins += Math.floor(Math.random() * 10) + 1; // Reward for defeating monster
                    monsterArray.splice(i, 1);
                    i--; // Adjust index after removing element
                    enemiesRemaining--; // IMPORTANT: Decrement enemies remaining
                    score += 100; // Add score for defeating monster
                    if (hook) {
                        hook.capturedMonster = null;
                    }
                }
            } else {
                // Make the monster chase the player
                monster.angle = Math.atan2(player.y - monster.y, player.x - monster.x); // Calculate angle toward player
                monster.x += Math.cos(monster.angle) * monster.speed; // Move toward player
                monster.y += Math.sin(monster.angle) * monster.speed; // Move toward player

                if (Math.abs(Math.cos(monster.angle)) > Math.abs(Math.sin(monster.angle))) {
                    // Moving more horizontally than vertically
                    if (Math.cos(monster.angle) > 0) {
                        monster.frameY = 3; // Right
                    } else {
                        monster.frameY = 2; // Left
                    }
                } else {
                    // Moving more vertically than horizontally
                    if (Math.sin(monster.angle) > 0) {
                        monster.frameY = 0; // Down
                    } else {
                        monster.frameY = 1; // Up
                    }
                }
                
                // Attack player if close enough
                let distToPlayer = Math.hypot(player.x - monster.x, player.y - monster.y);
                if (distToPlayer < 50 && !monster.attackCooldown) {
                    console.log("Monster attacks!");
                    player.health -= monster.attackPower;
                    monster.attackCooldown = true;
                    setTimeout(() => { monster.attackCooldown = false; }, 1000); // 1-second cooldown
                }

                // Wrap around screen
                if (monster.x < 0) monster.x = canvas.width;
                if (monster.x > canvas.width) monster.x = 0;
                if (monster.y < 0) monster.y = canvas.height;
                if (monster.y > canvas.height) monster.y = 0;
            }
        }
    }

    // UI elements
    context.fillStyle = "black";
    context.font = "18px Arial";
    context.fillText(`Health: ${player.health}`, 10, 45);
    context.fillText(`Score: ${score}`, 10, 70);
    context.fillText(`Coins: ${player.coins}`, 10, 20);
    context.fillText(`Wave: ${currentWave}/${maxWaves}`, 10, 95);

    // Draw the custom crosshair
    context.strokeStyle = "red"; // Crosshair color
    context.lineWidth = 2;

    // Horizontal line
    context.beginPath();
    context.moveTo(mouseX - 10, mouseY); // Start 10px to the left of the mouse
    context.lineTo(mouseX + 10, mouseY); // End 10px to the right of the mouse
    context.stroke();

    // Vertical line
    context.beginPath();
    context.moveTo(mouseX, mouseY - 10); // Start 10px above the mouse
    context.lineTo(mouseX, mouseY + 10); // End 10px below the mouse
    context.stroke();

    // Draw hook
    if (hook) {
        // Change hook color based on whether it has captured a monster
        context.strokeStyle = hook.capturedMonster ? "green" : "red";
        context.lineWidth = 2;

        // Grapple hook line
        context.beginPath();
        context.moveTo(player.x + player.width / 2, player.y + player.height / 2); // Start from player center
        context.lineTo(hook.x, hook.y); // Extend to grapple hook position
        context.stroke();

        // Grapple hook point
        context.fillStyle = hook.capturedMonster ? "green" : "red";
        context.fillRect(hook.x - 2, hook.y - 2, 5, 5);

        if (!hook.capturedMonster) {
            let dx = Math.cos(hook.angle) * hook.speed;
            let dy = Math.sin(hook.angle) * hook.speed;

            // Apply small momentum to hook movement
            if (hook.momentum) {
                dx += hook.momentum.x;
                dy += hook.momentum.y;
                // Gradually reduce momentum
                hook.momentum.x *= 0.95;
                hook.momentum.y *= 0.95;
            }

            hook.x += dx;
            hook.y += dy;

            // Update the traveled distance
            hook.traveledDistance += Math.hypot(dx, dy);

            // Stop the hook if it has traveled its maximum distance
            if (hook.traveledDistance >= hook.maxDistance && !hook.capturedMonster) {
                console.log("Hook reached its maximum distance.");
                hook = null; // Reset the hook
                return;
            }

            // Add a slight gravity effect
            if (!hook.momentum) hook.momentum = { x: 0, y: 0 };
            hook.momentum.y += 0.1;

            // Check for collisions with monsters
            for (let monster of monsterArray) {
                if (monster && !monster.captured && collides(hook, monster)) {
                    monster.captured = true;
                    hook.capturedMonster = monster;
                    hook.pulling = true;
                    monster.speed = 0;

                    // Reset momentum when a monster is caught
                    hook.momentum = { x: 0, y: 0 };
                    console.log("Monster captured!");
                    break;
                }
            }
        } else if (hook.capturedMonster) {
            let monster = hook.capturedMonster;
            let distToPlayer = Math.hypot(player.x - monster.x, player.y - monster.y);
            let angle = Math.atan2(player.y - monster.y, player.x - monster.x);

            // Pull strength decreases as monster gets closer (feels more natural)
            let pullStrength = Math.min(3, distToPlayer / 20);
            monster.x += Math.cos(angle) * pullStrength;
            monster.y += Math.sin(angle) * pullStrength;

            // Resistance increases as monster gets closer to player
            if (Math.random() < monster.resistance * (100 / distToPlayer)) {
                let resistAngle = angle + Math.PI + (Math.random() - 0.5);
                monster.x += Math.cos(resistAngle) * monster.resistance;
                monster.y += Math.sin(resistAngle) * monster.resistance;

                // Visual feedback for resistance
                if (Math.random() < 0.2) {
                    createDamageNumber(monster.x + (Math.random() - 0.5) * 20,
                        monster.y + (Math.random() - 0.5) * 20,
                        "!");
                }
            }

            // Check if close enough to the player
            if (distToPlayer < 30) {
                console.log("Monster captured and defeated!");
                player.coins += Math.floor(Math.random() * 10) + 1;
                monsterArray.splice(monsterArray.indexOf(hook.capturedMonster), 1);
                hook.capturedMonster = null;
                hook = null;
                // hook.pulling = false; // This line is commented out since hook becomes null
                enemiesRemaining--;
                score += 100;
            }
        }
    }
}


function drawBackground() {
    for (let r = 0; r < background.length; r += 1) {
        for (let c = 0; c < background[r].length; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(vampTileset,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
}


function drawPlayer() {
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

    if (player.isFighting) {
        // Use attack sprite or change color to indicate attack
        context.fillStyle = "red"; // Temporary visual indicator
        context.fillRect(player.x + player.width / 2, player.y + player.height / 2,
            player.lastDirection === 3 ? 30 : -30, 5);
    }

    if (player.health <= 0) {
        console.log("Game Over!");
        context.fillStyle = "red";
        context.font = "48px Arial";
        context.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
        stop();
        return;
    }
}


function movePlayer() {
    // Handle horizontal movement
    if (moveLeft && player.x > 0) {
        player.xChange -= 0.5;
        player.animationState = "walk";
        player.frameY = 2; // row for walking left
        player.lastDirection = 2; // left
    }
    if (moveRight && player.x + player.width < canvas.width) {
        player.xChange += 0.5;
        player.animationState = "walk";
        player.frameY = 3; // Row for walking right
        player.lastDirection = 3; // right
    }

    // Handle vertical movement
    if (moveUp && player.y > 0) {
        player.yChange -= 0.5;
        player.animationState = "walk";
        player.frameY = 1; // Row for walking up
        player.lastDirection = 1; // up
    }
    if (moveDown && player.y + player.height < canvas.height) {
        player.yChange += 0.5;
        player.animationState = "walk";
        player.frameY = 0; // Row for walking down
        player.lastDirection = 0; // down
    }

    // If no movement keys are pressed, set to idle
    if (!moveLeft && !moveRight && !moveUp && !moveDown) {
        player.animationState = "idle";
        player.frameY = player.lastDirection;
    }

    // Update the player's position
    player.x += player.xChange;
    player.y += player.yChange;

    // Apply friction to the player
    player.xChange *= 0.9;
    player.yChange *= 0.9;

    // Wrap horizontally
    if (player.x + player.width < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = -player.width;
    }

    // Wrap vertically
    if (player.y + player.height < 0) {
        player.y = canvas.height;
    } else if (player.y > canvas.height) {
        player.y = -player.height;
    }
}


function performMeleeAttack(monster) {
    // Check if monster is close enough to player
    let distToPlayer = Math.hypot(player.x - monster.x, player.y - monster.y);
    if (distToPlayer < 100) { // Melee range
        // Deal damage based on player's strength
        let damage = 5 + Math.floor(Math.random() * 5); // 5-9 damage
        monster.health -= damage;

        // Visual feedback
        player.isFighting = true;
        setTimeout(() => { player.isFighting = false; }, 200);

        // Show damage number
        createDamageNumber(monster.x, monster.y, damage);

        console.log(`Melee attack! Dealt ${damage} damage.`);
    }
}


function createDamageNumber(x, y, amount) {
    damageNumbers.push({
        x: x,
        y: y,
        amount: amount,
        life: 30, // frames it will be visible
        color: "white"
    });
}


function drawDamageNumbers() {
    for (let i = 0; i < damageNumbers.length; i++) {
        let dmg = damageNumbers[i];
        dmg.life--;
        dmg.y -= 1; // Float upward

        // Fade out as life decreases
        let alpha = dmg.life / 30;
        context.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        context.font = "16px Arial";
        context.fillText(dmg.amount, dmg.x, dmg.y);

        if (dmg.life <= 0) {
            damageNumbers.splice(i, 1);
            i--;
        }
    }
}


function drawProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        let projectile = projectiles[i];
        projectile.x += Math.cos(projectile.angle) * projectile.speed;
        projectile.y += Math.sin(projectile.angle) * projectile.speed;

        // Draw the projectile
        context.fillStyle = projectile.color;
        context.beginPath();
        context.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
        context.fill();

        // Check for collisions with monsters
        for (let j = 0; j < monsterArray.length; j++) {
            let monster = monsterArray[j];
            if (collides(projectile, monster)) {
                console.log("Projectile hit a monster!");
                monster.health -= 10; // Reduce monster health
                projectiles.splice(i, 1); // Remove the projectile
                i--; // Adjust index after removing the projectile
                if (monster.health <= 0) {
                    console.log("Monster defeated!");
                    monsterArray.splice(j, 1); // Remove the monster
                    enemiesRemaining--; // Decrement enemiesRemaining
                    score += 100;
                }
                break; // Exit the loop after handling the collision
            }
        }

        // Remove projectile if it goes off-screen
        if (
            projectile.x < 0 || projectile.x > canvas.width ||
            projectile.y < 0 || projectile.y > canvas.height
        ) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}


function collides(obj1, obj2) {
    if (!obj1 || !obj2) {
        return false;
    }
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
}


function preventMonsterOverlap() {
    // Check each monster against every other monster
    for (let i = 0; i < monsterArray.length; i++) {
        let monster1 = monsterArray[i];

        // Skip if captured
        if (monster1.captured) continue;

        for (let j = i + 1; j < monsterArray.length; j++) {
            let monster2 = monsterArray[j];

            // Skip if captured
            if (monster2.captured) continue;

            // Calculate distance between monsters
            let dx = monster2.x - monster1.x;
            let dy = monster2.y - monster1.y;
            let distance = Math.hypot(dx, dy);

            // Minimum distance to maintain between monsters (sum of their sizes)
            let minDistance = monster1.size + monster2.size;

            // If they're too close, push them apart
            if (distance < minDistance) {
                // Direction vector (normalized)
                let nx = dx / distance || 0;
                let ny = dy / distance || 0;

                // Calculate how much they need to be moved
                let overlap = minDistance - distance;

                // Move each monster half the total distance needed
                // The boss is harder to push
                let m1Weight = monster1.type === "boss" ? 0.1 : 0.5;
                let m2Weight = monster2.type === "boss" ? 0.1 : 0.5;

                // Adjust weights if needed so they sum to 1
                let totalWeight = m1Weight + m2Weight;
                m1Weight /= totalWeight;
                m2Weight /= totalWeight;

                // Apply the movement
                monster1.x -= nx * overlap * m1Weight;
                monster1.y -= ny * overlap * m1Weight;
                monster2.x += nx * overlap * m2Weight;
                monster2.y += ny * overlap * m2Weight;
            }
        }
    }
}


function spawnWave() {
    // Clear any remaining monsters
    monsterArray = [];

    // Determine wave content based on current wave
    if (currentWave < maxWaves) {
        // Normal waves: spawn increasing number of regular monsters
        let numMonsters = currentWave * 3 + 2; // Scale number of monsters with wave
        console.log(`Spawning ${numMonsters} monsters for wave ${currentWave}`);

        for (let i = 0; i < numMonsters; i++) {
            let monster = createMonster(currentWave);
            monsterArray.push(monster);
        }
    } else {
        // Final wave: spawn boss
        console.log("BOSS WAVE STARTING!");
        spawnBoss();
    }

    // Set the wave progress tracking variables
    enemiesRemaining = monsterArray.length;
    waveInProgress = true;

    console.log(`Wave ${currentWave} started with ${enemiesRemaining} enemies!`);
    debugGameState(); // Debug output
}


function createMonster(wave) {
    const monsterTypes = [
        { color: "purple", size: 45, attackPower: 3, health: 25, sprite: monsterSprites.purple },
        { color: "red", size: 60, attackPower: 5, health: 35, sprite: monsterSprites.red },
        { color: "darkgreen", size: 70, attackPower: 8, health: 50, sprite: monsterSprites.green },
        { color: "blue", size: 80, attackPower: 10, health: 65, sprite: monsterSprites.blue }
    ];

    // Get appropriate monster type for the wave (with bounds checking)
    const typeIndex = Math.min(wave - 1, monsterTypes.length - 1);
    const monsterType = monsterTypes[typeIndex];

    let monster = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: monsterType.size,
        sprite: monsterType.sprite,
        frameX: 0,
        frameY: 0,
        frameCount: 4,
        frameDelay: 5,
        frameCounter: 0,
        width: 64,
        height: 64,
        color: monsterType.color,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * (1 + wave * 0.3), // Increase speed with wave
        captured: false,
        health: monsterType.health + wave * 5, // Increase health with wave
        attackPower: monsterType.attackPower + wave, // Increase attack power with wave
        escapeChance: Math.random() * 0.2 + 0.05,
        attackCooldown: false,
        resistance: Math.random() * 0.5 + 0.1,
        ranged: wave > 2 && Math.random() < 0.3 // Some monsters are ranged in later waves
    };

    return monster;
}


function updateWaveProgress() {
    // Handle ranged monster attacks
    for (let monster of monsterArray) {
        if (monster.ranged && Math.random() < 0.01) {
            fireProjectile(monster);
        }
    }

    // Check if the wave is complete
    if (enemiesRemaining <= 0 && waveInProgress) {
        waveInProgress = false;
        console.log(`Wave ${currentWave} completed!`);

        player.health = 100;

        // If not the final wave, prepare for the next one
        if (currentWave < maxWaves) {
            console.log(`Preparing for wave ${currentWave + 1}`);

            // Show wave completion message on screen
            context.fillStyle = "green";
            context.font = "30px Arial";
            context.fillText(`Wave ${currentWave} Complete!`, canvas.width / 2 - 150, canvas.height / 2);

            // Start next wave after delay
            setTimeout(() => {
                currentWave++;
                spawnWave();
            }, 2000);
        } else {
            // Game complete - victory!
            console.log("All waves completed! Victory!");
            context.fillStyle = "gold";
            context.font = "48px Arial";
            context.fillText("Victory!", canvas.width / 2 - 100, canvas.height / 2);
            setTimeout(() => stop(), 5000); // End game after showing victory message
        }
    }
}


function fireProjectile(monster) {
    if (!monster || typeof monster.x !== "number" || typeof monster.y !== "number") {
        console.error("Invalid monster object for firing projectile");
        return;
    }

    let angle = Math.atan2(player.y - monster.y, player.x - monster.x);
    let projectile = {
        x: monster.x,
        y: monster.y,
        angle: angle,
        speed: 3,
        size: 5,
        color: "orange"
    };

    projectiles.push(projectile);
}


function spawnBoss() {
    let boss = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 60,
        sprite: monsterSprites.boss,
        frameX: 0,
        frameY: 0,
        width: 64,
        height: 64,
        color: "black",
        health: 500, // Boss health
        type: "boss", // Add type property
        attackCooldown: false,
        fireFlames: function () {
            if (!this.attackCooldown) {
                // Fire multiple flames in different directions
                for (let i = 0; i < 3; i++) {
                    let angle = Math.atan2(player.y - this.y, player.x - this.x);
                    // Add spread to the flames
                    angle += (i - 1) * 0.3;

                    let projectile = {
                        x: this.x,
                        y: this.y,
                        angle: angle,
                        speed: 4,
                        size: 8,
                        color: "red"
                    };

                    projectiles.push(projectile);
                }

                this.attackCooldown = true;
                setTimeout(() => { this.attackCooldown = false; }, 1000);
            }
        },
        move: function () {
            // Boss moves towards player but with some randomness
            if (Math.random() < 0.7) {
                let angle = Math.atan2(player.y - this.y, player.x - this.x);
                this.x += Math.cos(angle) * 1.5; // Boss movement speed
                this.y += Math.sin(angle) * 1.5;
            } else {
                // Random movement
                this.x += (Math.random() - 0.5) * 3;
                this.y += (Math.random() - 0.5) * 3;
            }

            // Keep boss on screen
            this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
            this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));
        }
    };

    monsterArray.push(boss);
    enemiesRemaining = 1; // Only the boss remains
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
    } else if (key === "ArrowUp" || key === "w") {
        moveUp = true;
        player.animationState = "walk";
    } else if (key === "ArrowRight" || key === "d") {
        moveRight = true;
        player.animationState = "walk";
    } else if (key === "ArrowDown" || key === "s") {
        moveDown = true;
        player.animationState = "walk";
    }

    if (key === "e") {
        if (!hook) {
            // Calculate the angle and distance to the crosshair
            let dx = mouseX - (player.x + player.width / 2);
            let dy = mouseY - (player.y + player.height / 2);
            let distance = Math.hypot(dx, dy); // Distance to the crosshair

            let angle = Math.atan2(dy, dx);

            hook = {
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                size: 5,
                speed: 15,
                angle: angle,
                maxDistance: distance, // Set the maximum distance to the crosshair
                traveledDistance: 0,
                capturedMonster: null,
                pulling: false,
                momentum: { x: 0, y: 0 }
            };
        } else if (hook.capturedMonster) {
            // Start reeling when E is pressed and there's a captured monster
            reeling = true;
        }
    }

    if (key === "r" && hook) {
        console.log("You withdrew your hook");
        if (hook.capturedMonster) {
            hook.capturedMonster.captured = false;
            hook.capturedMonster.speed = Math.random() * 2 + 1;
        }
        hook = null;
    }

    // FOR DEBUG ONLY - manual wave progression with 'n' key
    if (key === "n") {
        debugGameState();
        if (waveInProgress) {
            currentWave++;
            if (currentWave <= maxWaves) {
                spawnWave();
            } else {
                console.log("Already at max wave!");
            }
        } else {
            console.log("Can't start new wave while current wave is in progress!");
        }
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
        player.frameY = player.lastDirection; // Use last direction for idle pose
    }
}


function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("Asset loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("image");
            element.addEventListener("load", loaded, false);
        } else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}


function debugGameState() {
    console.log("=== GAME STATE DEBUG ===");
    console.log(`Current Wave: ${currentWave}`);
    console.log(`Wave In Progress: ${waveInProgress}`);
    console.log(`Enemies Remaining: ${enemiesRemaining}`);
    console.log(`Monster Array Length: ${monsterArray.length}`);
    console.log("========================");
}


function stop() {
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    window.cancelAnimationFrame(request_id);
}