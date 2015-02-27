// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
var imgs = [];
var fruits = ["fruit1.png", "fruit2.png", "fruit3.png"];
document.body.appendChild(canvas);

// Bacckground image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "background.png";

// eater image
var eaterReady = false;
var eaterImage = new Image();
eaterImage.onload = function () {
    eaterReady = true;
};
eaterImage.src = "eater.png";

// fruit image
var fruitReady1 = false;
for (var i = 0; i < fruits.length; i++) {
    imgs[i] = new Image();
    imgs[i].onload = function () {
        fruitReady1 = true;
    };
    imgs[i].src = fruits[i];
}

// Game objects
var eater = {speed: 8, x: 0, y: 0};
var background = {x: 0, y: 0};
var fruit = {x1: 250, y1: 70,
    x2: 350, y2: 100,
    x3: 40, y3: 350};
var score = 0;

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Update game objects
var update = function () {
    if (38 in keysDown) { // Player holding up
        eater.y -= eater.speed;
    }
    if (40 in keysDown) { // Player holding down
        eater.y += eater.speed;
    }
    if (37 in keysDown) { // Player holding left
        eater.x -= eater.speed;
    }
    if (39 in keysDown) { // Player holding right
        eater.x += eater.speed;
    }
// Are the eater and fruit touching?
    if (eater.x <= (fruit.x1 + 32) && fruit.x1 <= (eater.x + 32)
            && eater.y <= (fruit.y1 + 32) && fruit.y1 <= (eater.y + 32)) {
        ++score;
        fruitXY1();
    }
    if (eater.x <= (fruit.x2 + 32) && fruit.x2 <= (eater.x + 32)
            && eater.y <= (fruit.y2 + 32) && fruit.y2 <= (eater.y + 32)) {
        ++score;
        fruitXY2();
    }
    if (eater.x <= (fruit.x3 + 32) && fruit.x3 <= (eater.x + 32)
            && eater.y <= (fruit.y3 + 32) && fruit.y3 <= (eater.y + 32)) {
        ++score;
        fruitXY3();
    }
// Are the eater and background touching ?
    if (eater.x === background.x) {
        eater.x += eater.speed;
    }
    if ((eater.x + 32) === canvas.width) {
        eater.x -= eater.speed;
    }
    if (eater.y === background.y) {
        eater.y += eater.speed;
    }
    if ((eater.y + 32) === canvas.height) {
        eater.y -= eater.speed;
    }
// Are the images touching ?
    if (fruit.x1 <= (fruit.x2 + 32) && fruit.x2 <= (fruit.x1 + 32)
            && fruit.y1 <= (fruit.y2 + 32) && fruit.y2 <= (fruit.y1 + 32)) {
        fruitXY2();
    }
    if (fruit.x1 <= (fruit.x3 + 32) && fruit.x3 <= (fruit.x1 + 32)
            && fruit.y1 <= (fruit.y3 + 32) && fruit.y3 <= (fruit.y1 + 32)) {
        fruitXY1();
    }
    if (fruit.x2 <= (fruit.x3 + 32) && fruit.x3 <= (fruit.x2 + 32)
            && fruit.y2 <= (fruit.y3 + 32) && fruit.y3 <= (fruit.y2 + 32)) {
        fruitXY3();
    }

};

// Reset the game when the player catches a fruit
var fruitXY1 = function () {
// Throw the first fruit somewhere on the screen randomly
    fruit.x1 = 32 + (Math.random() * (canvas.width - 64));
    fruit.y1 = 32 + (Math.random() * (canvas.height - 64));
};

// Reset the game when the player catches a fruit
var fruitXY2 = function () {
// Throw the second fruit somewhere on the screen randomly
    fruit.x2 = 32 + (Math.random() * (canvas.width - 64));
    fruit.y2 = 32 + (Math.random() * (canvas.height - 64));
};
//
var fruitXY3 = function () {
// Throw the third fruit somewhere on the screen randomly
    fruit.x3 = 32 + (Math.random() * (canvas.width - 64));
    fruit.y3 = 32 + (Math.random() * (canvas.height - 64));
};

var eaterXY = function () {
    eater.x = canvas.width / 2;
    eater.y = canvas.height / 2;
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, background.x, background.y);
    }
    if (eaterReady) {
        ctx.drawImage(eaterImage, eater.x, eater.y);
    }
    if (fruitReady1) {
        ctx.drawImage(imgs[0], fruit.x1, fruit.y1);
        ctx.drawImage(imgs[1], fruit.x2, fruit.y2);
        ctx.drawImage(imgs[2], fruit.x3, fruit.y3);
    }
// Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 32, 32);
};
// The main game loop
var main = function () {
    update();
    render();
// Request to do this again ASAP
    requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
eaterXY();
main();