let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let request_id;

let fishArray = []
let rod = null;
let reeling = false;

let background = [




]


let tilesPerRow = 6;
let tileSize = 16;

let backgroundImage = new Image();

let player = {
    x: 0,
    y: 150,
    width: 32,
    height: 48,
    size: 10,
    isFishing: false,
    coins: 0,
    speed: 3,
    in_air: false
};

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

    // i++ increments i by 1 each iteration 
    for (let i = 0; i < 5; i++) {
        spawnFish();
    }

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false)

    draw();
}


function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then; // tell us how much time passed since last frame

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval); // accounts for leftover time maintaining precision (reference)
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Move player
        movePlayer();

        // Draw the player
        context.fillStyle = "white";
        context.fillRect(player.x, player.y, player.size, player.size);

        // Draw the fish
        context.fillStyle = "green";
        for (let i = 0; i < fishArray.length; i++) {
            let fish = fishArray[i];
            
            // If the fish is hooked, move it toward the player
            if (fish.hooked) {
                if (fish.reelStrength > 0) {
                    if (reeling) {
                        let angle = Math.atan2(player.y - fish.y, player.x - fish.x);
                        fish.x += Math.cos(angle) * 2;
                        fish.y += Math.sin(angle) * 2;
                        fish.reelStrength--;
                    }

                    // Possibility for the fish to escape
                    if (Math.random() < fish.escapeChance) {
                        console.log("Fish escaped!");
                        fish.hooked = false;
                        fish.speed = Math.random() * 1.5 + 0.5;
                        if (rod && rod.hookedFish === fish) {
                            rod.hookedFish = null;
                        }
                    }
                } else {
                    console.log("Fish Caught!");
                    player.coins += Math.floor(Math.random() * 10) + 1; // Add coins when fish is caught
                    fishArray.splice(i, 1);
                    i--; // Adjust index after removing element
                    if (rod) {
                        rod.hookedFish = null;
                    }
                    spawnFish();
                }
            } else {
                // Normal fish movement
                fish.x += Math.cos(fish.angle) * fish.speed;
                fish.y += Math.sin(fish.angle) * fish.speed;
                
                // Occasionally change direction
                if (Math.random() < 0.02) {
                    fish.angle += (Math.random() - 0.5) * 0.5;
                }

                // Wrap around screen
                if (fish.x < 0) fish.x = canvas.width;
                if (fish.x > canvas.width) fish.x = 0;
                if (fish.y < 0) fish.y = canvas.height;
                if (fish.y > canvas.height) fish.y = 0;
            }

            context.fillRect(fish.x, fish.y, fish.size, fish.size);
        }

        // Draw fishing rod
        if (rod) {
            // Move rod if it's not attached to a fish
            if (!rod.hookedFish) {
                rod.x += Math.cos(rod.angle) * rod.speed;
                rod.y += Math.sin(rod.angle) * rod.speed;
                
                // Stop the rod at max distance
                let distance = Math.hypot(rod.x - player.x, rod.y - player.y);
                if (distance > 150) {
                    rod.speed = 0;
                }
                
                // Check for collisions with fish
                for (let fish of fishArray) {
                    if (!fish.hooked && collides(rod, fish)) {
                        fish.hooked = true;
                        rod.hookedFish = fish;
                        fish.speed = 0;
                        console.log("Fish hooked!");
                        break;
                    }
                }
            }

            // Draw the fishing line
            context.strokeStyle = "brown";
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(player.x + player.size / 2, player.y); // Start from the player
            context.lineTo(rod.x, rod.y); // Extend to rod's position
            context.stroke();
            
            // Draw the rod point
            context.fillStyle = "red";
            context.fillRect(rod.x - 2, rod.y - 2, 5, 5);
        }
        
        // Draw player stats
        context.fillStyle = "white";
        context.font = "16px Arial";
        context.fillText(`Coins: ${player.coins}`, 10, 20);
    }
}


function movePlayer() {
    if (moveLeft && player.x > 0) player.x -= player.speed;
    if (moveRight && player.x + player.size < canvas.width) player.x += player.speed;
    if (moveUp && player.y > 0) player.y -= player.speed;
    if (moveDown && player.y + player.size < canvas.height) player.y += player.speed;
}

// Spawn a new fish
function spawnFish() {
    let fish = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15,
        angle: Math.random() * Math.PI * 2, // the direction of the fishes
        speed: Math.random() * 1.5 + 0.5, // move the fishies slowly
        hooked: false,
        reelStrength: Math.floor(Math.random() * 10) + 5, // 5-15 E presses to reel in
        escapeChance: Math.random() * 0.2 + 0.05 // 5-25% escape chance
    };
    fishArray.push(fish);
}


function collides(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
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
    } else if (key === "ArrowUp" || key === "w") {
        moveUp = true;
    } else if (key === "ArrowRight" || key === "d") {
        moveRight = true;
    } else if (key === "ArrowDown" || key === "s") {
        moveDown = true;
    }

    if (key === "e") {
        if (!rod) {
            // Cast the fishing rod
            let angle = Math.atan2(mouseY - player.y, mouseX - player.x);

            rod = {
                x: player.x,
                y: player.y,
                size: 5,
                speed: 5,
                angle: angle,
                hookedFish: null
            };
        } else if (rod.hookedFish) {
            // Start reeling when E is pressed and there's a hooked fish
            reeling = true;
        }
    }

    if (key === "r" && rod) {
        console.log("You reeled in the rod.");
        if (rod.hookedFish) {
            rod.hookedFish.hooked = false;
            rod.hookedFish.speed = Math.random() * 1.5 + 0.5;
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
}


function stop() {
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    window.cancelAnimationFrame(request_id);
}



