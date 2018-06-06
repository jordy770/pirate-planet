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
var GameScreen = (function () {
    function GameScreen(g) {
        this.hitByBomb = 0;
        this.game = g;
        this.interface = new Interface(this.game);
        var container = document.getElementsByTagName("container")[0];
        console.log("hallo");
        this.ship = new Ship();
        this.platforms = new Array();
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 },
        ];
        for (var _i = 0, platformCoordinates_1 = platformCoordinates; _i < platformCoordinates_1.length; _i++) {
            var coords = platformCoordinates_1[_i];
            this.platforms.push(new Platform(coords.x, coords.y));
        }
        this.player = new Player(this);
    }
    GameScreen.prototype.scrollLevel = function (pos) {
        this.ship.scrollLeft(pos);
        for (var _i = 0, _a = this.platforms; _i < _a.length; _i++) {
            var platform = _a[_i];
            platform.scrollLeft(pos);
        }
    };
    GameScreen.prototype.update = function () {
        this.player.update();
        this.ship.update();
        for (var _i = 0, _a = this.platforms; _i < _a.length; _i++) {
            var platform = _a[_i];
            platform.update();
            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.hitPlat();
            }
            else {
                this.player.gravity = 10;
            }
        }
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitByBomb++;
            if (this.hitByBomb > 0) {
                this.game.emptyScreen();
                this.game.showScreen(new SpaceGame(this.game));
            }
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
    function Jerrycan() {
        this.div = document.createElement("jerrycan");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
        this.speed = 4 + Math.random() * 8;
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    }
    Jerrycan.prototype.update = function () {
        this.y += this.speed;
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
    Player.prototype.hitPlat = function () {
        this.gravity = 0;
    };
    Player.prototype.update = function () {
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight;
        this.gamescreen.scrollLevel(this.speedLeft - this.speedRight);
        var newY = this.y - this.speedUp + this.gravity;
        if (newY > 0 && newY + 150 < 720)
            this.y = newY;
        this.player.style.transform = "translate(200px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player;
}());
var Ship = (function () {
    function Ship() {
        this.ship = document.createElement("ship");
        var foreground = document.getElementsByTagName("foreground")[0];
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
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);
        this.asteroidImage.src = 'images/asteroid.png';
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.y = 0 - this.asteroidSize;
        this.hitbox = document.createElement("hitbox");
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
        this.asteroid = document.createElement("asteroid");
        foreground.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage);
        this.asteroid.appendChild(this.hitbox);
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
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize;
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
        this.afstand = 200000000;
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
            this.game.emptyScreen();
            this.game.showScreen(new GameOver(this.game));
        }
        if (this.time == 2000) {
            this.textfield.innerHTML = "GEHAALD";
            this.textfield.setAttribute("style", "font-size:30px");
        }
        this.time++;
        this.afstand = this.afstand - 20000;
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
        this.speed = 0;
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
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log('Created spaceship');
    }
    Spaceship.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = -10;
                break;
            case 39:
            case 68:
                this.speed = 10;
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
    Spaceship.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = 0;
                break;
            case 39:
            case 68:
                this.speed = 0;
                break;
            case 32:
                break;
        }
    };
    Spaceship.prototype.update = function () {
        this.x += this.speed;
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