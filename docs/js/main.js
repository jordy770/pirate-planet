"use strict";
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.emptyScreen = function () {
        var foreground = document.getElementsByTagName("foreground")[0];
        var background = document.getElementsByTagName("background")[0];
        foreground.innerHTML = "";
        background.innerHTML = "";
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.restartbtn = document.createElement("startbtn");
        this.restartmodal = document.createElement("startmodal");
        this.restarttext = document.createElement("starttext");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.restartmodal);
        this.restartmodal.appendChild(this.restartbtn);
        this.restartmodal.appendChild(this.restarttext);
        this.restartbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    GameOver.prototype.update = function () {
        this.restartbtn.innerHTML = "RESTART GAME";
        this.restarttext.innerHTML = "OEPS! Je schip heeft te veel schade gehad. Probeer het opnieuw.";
    };
    GameOver.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new SpaceGame(this.game));
    };
    return GameOver;
}());
var Interface = (function () {
    function Interface(g) {
        this.planetWidth = 400;
        this.planetHeight = 100;
        this.game = g;
        console.log('ik ben de interface bitches');
        var foreground = document.getElementsByTagName("foreground")[0];
        this.interface = document.createElement("interface");
        foreground.appendChild(this.interface);
        this.updateInterface();
    }
    Interface.prototype.update = function () {
    };
    Interface.prototype.updateInterface = function () {
        this.planetImage = new Image(this.planetWidth, this.planetHeight);
        this.planetImage.setAttribute('style', 'left:400px;top:20px;');
        this.planetImage.src = 'images/planet1.png';
        this.interface.appendChild(this.planetImage);
        console.log('updating interface');
    };
    return Interface;
}());
var Enemy = (function () {
    function Enemy(x, y) {
        this.x = x;
        this.y = y;
        this.div = document.createElement("enemy");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Enemy.prototype.scrollLeft = function (pos) {
        this.x += pos;
    };
    Enemy.prototype.remove = function () {
        this.div.remove();
    };
    Enemy.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Enemy.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Enemy;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.score = 0;
        this.hitShip = 0;
        this.MAX_JERRY = 4;
        this.game = g;
        this.interface = new Interface(this.game);
        var background = document.getElementsByTagName("background")[0];
        this.textfield = document.createElement("textfield");
        background.appendChild(this.textfield);
        var container = document.getElementsByTagName("container")[0];
        console.log("hallo");
        this.ship = new Ship();
        this.jerrycans = new Array();
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        this.platforms = new Array();
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _i = 0, jerrycanCoordinates_1 = jerrycanCoordinates; _i < jerrycanCoordinates_1.length; _i++) {
            var jcoords = jerrycanCoordinates_1[_i];
            this.jerrycans.push(new Jerrycan(jcoords.x, jcoords.y));
        }
        for (var _a = 0, platformCoordinates_1 = platformCoordinates; _a < platformCoordinates_1.length; _a++) {
            var coords = platformCoordinates_1[_a];
            this.platforms.push(new Platform(coords.x, coords.y));
        }
        this.player = new Player(this);
    }
    GameScreen.prototype.scrollLevel = function (pos) {
        this.ship.scrollLeft(pos);
        for (var _i = 0, _a = this.jerrycans; _i < _a.length; _i++) {
            var jerrycan = _a[_i];
            jerrycan.scrollLeft(pos);
        }
        for (var _b = 0, _c = this.platforms; _b < _c.length; _b++) {
            var platform = _c[_b];
            platform.scrollLeft(pos);
        }
    };
    GameScreen.prototype.update = function () {
        this.player.update();
        this.ship.update();
        this.textfield.innerHTML = this.score + "/" + this.MAX_JERRY;
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;");
        for (var _i = 0, _a = this.jerrycans; _i < _a.length; _i++) {
            var jerrycan = _a[_i];
            jerrycan.update();
            if (this.checkCollision(this.player.getRectangle(), jerrycan.getRectangle())) {
                this.score++;
                console.log(this.score);
                jerrycan.remove();
            }
        }
        for (var _b = 0, _c = this.platforms; _b < _c.length; _b++) {
            var platform = _c[_b];
            platform.update();
        }
        for (var _d = 0, _e = this.platforms; _d < _e.length; _d++) {
            var platform = _e[_d];
            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.setFalling(false);
                break;
            }
            else {
                this.player.setFalling(true);
            }
        }
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitShip++;
            if (this.hitShip > 0 && this.score == this.MAX_JERRY) {
                this.game.emptyScreen();
                this.game.showScreen(new SpaceGame(this.game));
            }
        }
    };
    GameScreen.prototype.removeMe = function (j) {
        var removeList = [];
        for (var i = 0; i < this.MAX_JERRY; i++) {
            if (this.jerrycans[i] == j) {
                removeList.push(i);
            }
        }
        removeList.reverse();
        for (var _i = 0, removeList_1 = removeList; _i < removeList_1.length; _i++) {
            var i = removeList_1[_i];
            this.jerrycans.splice(i, 1);
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return GameScreen;
}());
var Jerrycan = (function () {
    function Jerrycan(x, y) {
        this.x = x;
        this.y = y;
        this.div = document.createElement("jerrycan");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Jerrycan.prototype.scrollLeft = function (pos) {
        this.x += pos;
    };
    Jerrycan.prototype.remove = function () {
        this.div.remove();
    };
    Jerrycan.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Jerrycan.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Jerrycan;
}());
var Platform = (function () {
    function Platform(x, y) {
        this.x = x;
        this.y = y;
        this.div = document.createElement("platform");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Platform.prototype.scrollLeft = function (pos) {
        this.x += pos;
    };
    Platform.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Platform.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Platform;
}());
var Player = (function () {
    function Player(b) {
        var _this = this;
        this.levelposition = 0;
        this.y = 10;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.falling = true;
        this.gamescreen = b;
        this.player = document.createElement("player");
        var background = document.getElementsByTagName("background")[0];
        background.appendChild(this.player);
        this.gravity = 10;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
            case "a":
                this.speedLeft = 10;
                break;
            case "ArrowRight":
            case "d":
                this.speedRight = 10;
                break;
            case "ArrowUp":
            case "w":
                this.speedUp = 50;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
            case "a":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
            case "d":
                this.speedRight = 0;
                break;
            case "ArrowUp":
            case "w":
                this.speedUp = 0;
                break;
        }
    };
    Player.prototype.setFalling = function (b) {
        this.falling = b;
    };
    Player.prototype.update = function () {
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight;
        this.gamescreen.scrollLevel(this.speedLeft - this.speedRight);
        this.gravity = (this.falling) ? 10 : 0;
        var newY = this.y - this.speedUp + this.gravity;
        if (newY > 0 && newY + 150 < 720) {
            this.y = newY;
        }
        this.player.style.transform = "translate(200px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player;
}());
var Ship = (function () {
    function Ship() {
        var foreground = document.getElementsByTagName("foreground")[0];
        this.ship = document.createElement("ship");
        foreground.appendChild(this.ship);
        this.x = 3000 - this.getRectangle().width;
        this.y = 720 - this.getRectangle().height;
    }
    Ship.prototype.scrollLeft = function (pos) {
        this.x += pos;
    };
    Ship.prototype.update = function () {
        this.ship.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Ship.prototype.getRectangle = function () {
        return this.ship.getBoundingClientRect();
    };
    return Ship;
}());
var Asteroid = (function () {
    function Asteroid(g) {
        this.spacegame = g;
        var foreground = document.getElementsByTagName("foreground")[0];
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);
        this.asteroidImage.src = 'images/asteroid.png';
        this.asteroid = document.createElement("asteroid");
        this.hitbox = document.createElement("hitbox");
        foreground.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage);
        this.asteroid.appendChild(this.hitbox);
        this.reset();
        console.log('Created asteroid');
    }
    Asteroid.prototype.update = function () {
        this.y += this.speed;
        this.asteroid.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.y > 720 + this.asteroidSize) {
            this.reset();
        }
    };
    Asteroid.prototype.reset = function () {
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.x = Math.floor((Math.random() * 1280 - this.asteroidSize) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize;
        this.asteroidImage.width = this.asteroidSize;
        this.asteroidImage.height = this.asteroidSize;
        this.hitbox.style.height = this.asteroidSize + "px";
        this.hitbox.style.width = this.asteroidSize + "px";
        if (this.asteroidSize > 40) {
            this.hitbox.style.left = "-20px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 100) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 160) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
    };
    Asteroid.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    return Asteroid;
}());
var Background = (function () {
    function Background() {
        this.width = 1280;
        this.height = 720;
        this.yPos = 0;
        this.background = new Image(this.width, this.height);
        this.background.setAttribute("id", "background");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.background);
        console.log('Created background');
    }
    Background.prototype.loop = function () {
        this.yPos = this.yPos + 2;
        this.background.style.backgroundPosition = '0px ' + this.yPos + 'px';
    };
    return Background;
}());
var Laser = (function () {
    function Laser(x) {
        this.laserWidth = 15;
        this.laserHeight = 32;
        this.y = 520;
        this.x = x - 0.5 * this.laserWidth;
        this.laser = new Image(this.laserWidth, this.laserHeight);
        this.laser.setAttribute('style', 'left:' + this.x + 'px;top:0px;');
        this.laser.classList.add('laser');
        this.laser.src = 'images/laser.png';
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.laser);
        this.update();
        console.log('Created laser');
    }
    Laser.prototype.update = function () {
        this.y = this.y - 5;
        this.laser.style.transform = "translate(0px," + this.y + "px)";
        if (this.y < 0 - this.laserHeight) {
            this.laser.remove();
        }
    };
    Laser.prototype.remove = function () {
        this.laser.remove();
    };
    Laser.prototype.getRectangle = function () {
        return this.laser.getBoundingClientRect();
    };
    return Laser;
}());
var SpaceGame = (function () {
    function SpaceGame(g) {
        this.levens = 3;
        this.time = 0;
        this.afstand = 2452800;
        this.game = g;
        this.background = new Background();
        this.spaceship = new Spaceship(this);
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.textfield = document.createElement("textfield");
        this.foreground.appendChild(this.textfield);
        this.asteroids = [];
        this.lasers = [];
        for (var i = 0; i < 6; i++) {
            var asteroid = new Asteroid(this);
            this.asteroids.push(asteroid);
            asteroid.update();
        }
    }
    Object.defineProperty(SpaceGame.prototype, "Time", {
        get: function () {
            return this.time;
        },
        enumerable: true,
        configurable: true
    });
    SpaceGame.prototype.update = function () {
        this.spaceship.update();
        this.textfield.innerHTML = "LEVENS: " + this.levens + " -  AFSTAND: " + this.afstand + "km";
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;");
        for (var _i = 0, _a = this.lasers; _i < _a.length; _i++) {
            var l = _a[_i];
            l.update();
        }
        for (var _b = 0, _c = this.asteroids; _b < _c.length; _b++) {
            var asteroid = _c[_b];
            asteroid.update();
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset();
                if (this.levens > 0) {
                    this.levens--;
                }
                console.log("ship hits asteroid");
            }
            for (var _d = 0, _e = this.lasers; _d < _e.length; _d++) {
                var las = _e[_d];
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers");
                    asteroid.reset();
                    las.remove();
                }
            }
        }
        if (this.levens == 0) {
            this.spaceship.removeSpaceship();
            this.game.emptyScreen();
            this.game.showScreen(new GameOver(this.game));
        }
        if (this.time == 1400) {
            this.spaceship.removeSpaceship();
            this.game.emptyScreen();
            this.game.showScreen(new GameScreen(this.game));
        }
        this.time++;
        this.afstand = this.afstand - 1752;
        console.log(this.time);
        console.log(this.afstand);
        this.background.loop();
    };
    SpaceGame.prototype.addLaser = function (l) {
        this.lasers.push(l);
    };
    SpaceGame.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return SpaceGame;
}());
var Spaceship = (function () {
    function Spaceship(g) {
        var _this = this;
        this.width = 100;
        this.height = 150;
        this.x = 0.5 * 1280 - 0.5 * this.width;
        this.y = 720 - this.height - 50;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.spacegame = g;
        this.spaceshipImage = new Image(this.width, this.height);
        this.spaceshipImage.src = 'images/ship.png';
        this.spaceshipImage.setAttribute("id", "spaceship");
        this.hitbox = document.createElement("hitbox");
        this.spaceship = document.createElement("spaceship");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.spaceship);
        this.spaceship.appendChild(this.spaceshipImage);
        this.spaceship.appendChild(this.hitbox);
        this.hitbox.style.height = '130px';
        this.hitbox.style.width = '60px';
        this.keydownlistener = function (e) { return _this.onKeyDown(e); };
        this.keyuplistener = function (e) { return _this.onKeyUp(e); };
        window.addEventListener("keydown", this.keydownlistener);
        window.addEventListener("keyup", this.keyuplistener);
        console.log('Created spaceship');
    }
    Spaceship.prototype.onKeyDown = function (e) {
        var event = e;
        console.log("ship keydown called!!!");
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speedLeft = -10;
                break;
            case 39:
            case 68:
                this.speedRight = 10;
                break;
            case 32:
                var laserAmount = document.getElementsByClassName('laser').length;
                if (laserAmount < 4) {
                    var laser = new Laser(this.x + 0.5 * this.width);
                    this.spacegame.addLaser(laser);
                }
                break;
        }
    };
    Spaceship.prototype.onKeyUp = function (e) {
        console.log("ship calls keyup");
        var event = e;
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speedLeft = 0;
                break;
            case 39:
            case 68:
                this.speedRight = 0;
                break;
            case 32:
                break;
        }
    };
    Spaceship.prototype.update = function () {
        this.x += this.speedLeft;
        this.x += this.speedRight;
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= 1280 - this.width) {
            this.x = 1280 - this.width;
        }
        this.spaceship.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Spaceship.prototype.explode = function () {
        this.spaceshipImage.src = 'images/explosion.gif';
    };
    Spaceship.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    Spaceship.prototype.removeSpaceship = function () {
        console.log("removing the spaceship");
        window.removeEventListener("keydown", this.keydownlistener);
        window.removeEventListener("keyup", this.keyuplistener);
    };
    return Spaceship;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.addNumbers(2, 3);
        this.game = g;
        this.startbtn = document.createElement("startbtn");
        this.startmodal = document.createElement("startmodal");
        this.starttext = document.createElement("starttext");
        var container = document.getElementsByTagName("container")[0];
        var background = document.createElement("background");
        container.appendChild(background);
        var foreground = document.createElement("foreground");
        container.appendChild(foreground);
        foreground.appendChild(this.startmodal);
        this.startmodal.appendChild(this.startbtn);
        this.startmodal.appendChild(this.starttext);
        this.startbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    StartScreen.prototype.addNumbers = function (a, b) {
        console.log(a + b);
    };
    StartScreen.prototype.update = function () {
        this.startbtn.innerHTML = "START GAME";
        this.starttext.innerHTML = "Je bent een piraat die de hele wereld al heeft ontdekt. Je hebt gehoord dat er een schat verborgen is op de planeet Neptunes. Ga op reis om de schat te vinden!";
    };
    StartScreen.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map