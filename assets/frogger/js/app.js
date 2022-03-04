// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Assign image, x & y positions and speed to enemy object
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //When Enemy reaches width of canvas restart it at left side
    if (this.x >= ctx.canvas.width){
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    //Assign image, x & y positions to player object
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    if (this.x <= 0){
        this.x = 0;
    }
    else if (this.x>=400) {
        this.x = 400;
    }
    if (this.y < 0){
        this.y = -50;
        setTimeout(function() {player.y = 375; player.x =200;}, 500);
    }
    else if (this.y>375){
        this.y =375;
    }
};

//Draw the Player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move player position x(L/R) or y(U/D) based on key input
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            this.x -= 100;
            break;

        case 'up':
            this.y -= 85;
            break;

        case 'right':
            this.x += 100;
            break;

        case 'down':
            this.y += 85;
            break;
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-350, 205, 100), new Enemy(-500, 205, 250), new Enemy(-700, 120, 400), new Enemy(-100, 35, 200)];
var player = new Player(200, 375);


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


var x = document.getElementById('resetBtn');
x.onclick = function changeDisplay(){document.getElementById('winner').style.display = 'none'};






