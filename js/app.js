"use strict";

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';

    // Set initial location
    this.x = x;
    this.y = y;

    // Set speed
    this.speed = 100 + Math.random() * 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed = 100 + Math.random() * 200;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Constructor function for our player
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // Set initial location
    this.x = 200;
    this.y = 380;
};

// Update the player's position
Player.prototype.update = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 82;
                if (this.y < 10) {
                    win();
                }
            }
            break;
        case 'down':
            if (this.y < 300) {
                this.y += 82;
            }
            break;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enable the use of arrow keys to move the player
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.update("left");
            break;
        case 'right':
            this.update("right");
            break;
        case 'up':
            this.update("up");
            break;
        case 'down':
            this.update("down");
            break;
    }
};

var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        // If the player touches an enemy, the game resets
        if (player.x >= enemy.x - 50 && player.x <= enemy.x + 50) {
            if (player.y >= enemy.y - 10 && player.y <= enemy.y + 10) {
                player.reset();
            }
        }
    })
};

// Reset the player's position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
    new Enemy(0, 50),
    new Enemy(-500, 135),
    new Enemy(-100, 220),
    new Enemy(-300, 50),
    new Enemy(0, 135),
    new Enemy(-200, 220)
];

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Show winning modal
const winningModal = document.querySelector('.winning-modal');

function win() {
    winningModal.classList.toggle('show');
}

// Let user restart the game
const restart = document.querySelector('.restart');

function restartGame() {
    // Hide winning modal
    winningModal.classList.toggle('show');
    // Reset player's location
    player.reset();
}

restart.addEventListener('click', restartGame);