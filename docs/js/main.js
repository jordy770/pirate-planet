"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Object.defineProperty(Game.prototype, "getPreviousLevel", {
        get: function () {
            return this.previouslevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "setPreviousLevel", {
        set: function (level) {
            this.previouslevel = level;
        },
        enumerable: true,
        configurable: true
    });
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
var BetweenScreen = (function () {
    function BetweenScreen(g) {
        var _this = this;
        this.width = 1280;
        this.height = 720;
        this.game = g;
        this.betweenbtn = document.createElement("betweenbtn");
        var container = document.getElementsByTagName("container")[0];
        var background = document.createElement("background");
        container.appendChild(background);
        var foreground = document.createElement("foreground");
        container.appendChild(foreground);
        this.background = new Image(this.width, this.height);
        this.background.setAttribute("class", "between-background");
        foreground.appendChild(this.betweenbtn);
        this.betweenbtn.addEventListener("click", function () { return _this.switchScreens(); });
    }
    BetweenScreen.prototype.update = function () {
        this.betweenbtn.innerHTML = "NEXT LEVEL";
    };
    BetweenScreen.prototype.switchScreens = function () {
        console.log('go to second level');
    };
    return BetweenScreen;
}());
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
var End = (function () {
    function End() {
        var foreground = document.getElementsByTagName("foreground")[0];
        this.assignmentmodal = document.createElement("assignmentmodal");
        this.assignmenttext1 = document.createElement("assignmenttext");
        this.assignmenttext2 = document.createElement("assignmenttext");
        this.assignmentbtn = document.createElement("assignmentbtn");
        this.textcontainer1 = document.createElement("textcontainer1");
        this.planetscontainer = document.createElement("planetscontainer");
        this.textcontainer2 = document.createElement("textcontainer2");
        this.planetsright = document.createElement("planetsright");
        for (var i = 0; i < 8; i++) {
            var emptySpace = document.createElement("planetcontainer");
            this.planetsright.appendChild(emptySpace);
        }
        foreground.appendChild(this.assignmentmodal);
        this.assignmentmodal.appendChild(this.assignmentbtn);
        this.assignmentmodal.appendChild(this.planetscontainer);
        this.assignmentmodal.appendChild(this.planetsright);
        this.assignmentmodal.appendChild(this.textcontainer1);
        this.assignmentmodal.appendChild(this.textcontainer2);
        this.textcontainer1.appendChild(this.assignmenttext1);
        this.textcontainer2.appendChild(this.assignmenttext2);
        var aarde = new PlanetContainer(8, "Aarde", "../docs/images/aarde.png");
        var jupiter = new PlanetContainer(8, "Jupiter", "../docs/images/jupiter.png");
        var mars = new PlanetContainer(8, "Mars", "../docs/images/mars.png");
        var mercurius = new PlanetContainer(8, "Mercurius", "../docs/images/mercurius.png");
        var neptunus = new PlanetContainer(8, "Neptunus", "../docs/images/neptunus.png");
        var saturnus = new PlanetContainer(8, "Saturnus", "../docs/images/saturnus.png");
        var uranus = new PlanetContainer(8, "Uranus", "../docs/images/uranus.png");
        var venus = new PlanetContainer(8, "Venus", "../docs/images/venus.png");
        this.assignmentbtn.innerHTML = "CHECK";
        this.assignmenttext1.innerHTML = "Zet de planeten in de goede volgorde van het zonnestelsel.";
        this.assignmenttext2.innerHTML = "Klik op een planeet en verschuif hem naar een vakje.";
    }
    return End;
}());
var Enemy = (function () {
    function Enemy() {
        this.speed = 10;
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
        var newX = this.x - this.speed;
        if (newX > 0 && newX + 150 < 720) {
            this.x = newX;
        }
        this.div.style.transform = "translate(" + this.x + "px, 720-150px)";
    };
    Enemy.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Enemy;
}());
var Item = (function () {
    function Item(x, y, image) {
        this.x = x;
        this.y = y;
        this.div = document.createElement("item");
        this.div.style.backgroundImage = "url('" + image + "')";
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Item.prototype.scrollLeft = function (pos) {
        this.x += pos;
    };
    Item.prototype.remove = function () {
        this.div.remove();
    };
    Item.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Item.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Item;
}());
var PlanetContainer = (function () {
    function PlanetContainer(currentLevel, planet, source) {
        var _this = this;
        this.planets = ["", "Aarde", "Mars", "Jupiter", "Saturnus", "Uranus", "Neptunus", "Mercurius", "Venus"];
        this.currentLevel = currentLevel;
        var container = document.getElementsByTagName("planetscontainer")[0];
        this.planetContainer = document.createElement("planetcontainer");
        container.appendChild(this.planetContainer);
        this.image = document.createElement("planetimg");
        this.image.style.backgroundImage = "url(" + source + ")";
        this.text = document.createElement("planetname");
        this.text.innerHTML = planet;
        this.planetContainer.appendChild(this.image);
        this.planetContainer.appendChild(this.text);
        this.moveBind = function (e) { return _this.update(e); };
        if (this.currentLevel == 8) {
            this.planetContainer.addEventListener("mousedown", function (e) { return _this.initDrag(e); });
            this.planetContainer.addEventListener("mouseup", function (e) { return _this.stopDrag(e); });
        }
        else {
            this.planetContainer.style.border = "none";
            this.planetContainer.style.opacity = "0.5";
            console.log(this.planets[this.currentLevel]);
            if (this.planets[this.currentLevel] == planet) {
                this.planetContainer.style.opacity = "1.0";
            }
        }
    }
    PlanetContainer.prototype.initDrag = function (e) {
        e.preventDefault();
        this.planetContainer.parentElement.appendChild(this.planetContainer);
        this.offSetX = e.clientX - this.x;
        this.offSetY = e.clientY - this.y;
        window.addEventListener("mousemove", this.moveBind);
    };
    PlanetContainer.prototype.stopDrag = function (e) {
        window.removeEventListener("mousemove", this.moveBind);
        e.preventDefault();
    };
    PlanetContainer.prototype.update = function (e) {
        e.preventDefault();
        this.x = e.clientX - this.offSetX;
        this.y = e.clientY - this.offSetY;
        this.planetContainer.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
    };
    return PlanetContainer;
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
        this.frames = 4;
        this.frame = 0;
        this.framewidth = 105;
        this.speedcounter = 0;
        this.falling = true;
        this.jump = true;
        this.gamescreen = b;
        this.player = document.createElement("player");
        this.frame = 0;
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
                this.walkLeft();
                break;
            case "ArrowRight":
            case "d":
                this.speedRight = 10;
                this.walkRight();
                break;
            case "ArrowUp":
            case "w":
                if (this.jump == false) {
                    this.speedUp = 50;
                    this.jump = true;
                }
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
        if (this.y > 720 - 200 || this.gamescreen.collisionWithPlat()) {
            this.jump = false;
        }
        console.log(this.jump);
        var newY = this.y - this.speedUp + this.gravity;
        if (newY > 0 && newY + 150 < 720) {
            this.y = newY;
        }
        this.player.style.transform = "translate(200px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    Player.prototype.walkRight = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px 0px';
    };
    Player.prototype.walkLeft = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -150px';
    };
    Player.prototype.removeInput = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.removeEventListener("keyup", function (e) { return _this.onKeyUp(e); });
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
var GameScreen = (function () {
    function GameScreen(game, currentlevel, totalItems) {
        this.score = 0;
        this.hitShip = 0;
        this.game = game;
        this.currentlevel = currentlevel;
        this.totalItems = totalItems;
        this.items = new Array();
        this.platforms = new Array();
        if (currentlevel < 8) {
            this.interface = new Interface(this.game, this.currentlevel);
        }
        var background = document.getElementsByTagName("background")[0];
        this.textfield = document.createElement("textfield");
        background.appendChild(this.textfield);
        this.ship = new Ship();
        this.player = new Player(this);
    }
    GameScreen.prototype.scrollLevel = function (pos) {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.scrollLeft(pos);
        }
        for (var _b = 0, _c = this.platforms; _b < _c.length; _b++) {
            var platform = _c[_b];
            platform.scrollLeft(pos);
        }
        this.ship.scrollLeft(pos);
    };
    GameScreen.prototype.update = function () {
        this.player.update();
        this.ship.update();
        this.textfield.innerHTML = this.score + "/" + this.totalItems;
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;");
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.update();
            if (this.checkCollision(this.player.getRectangle(), item.getRectangle())) {
                this.score++;
                console.log(this.score);
                item.remove();
            }
        }
        for (var _b = 0, _c = this.platforms; _b < _c.length; _b++) {
            var platform = _c[_b];
            platform.update();
        }
        this.collisionWithPlat();
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitShip++;
            if (this.hitShip > 0 && this.score == this.totalItems) {
                if (this.currentlevel == 8) {
                    var end = new End();
                    var chest = document.getElementsByTagName("ship")[0];
                    chest.id = "openchest";
                    this.player.removeInput();
                    this.currentlevel = 9;
                }
                else if (this.currentlevel < 8) {
                    this.game.emptyScreen();
                    this.game.setPreviousLevel = this.currentlevel;
                    this.game.showScreen(new SpaceGame(this.game));
                }
            }
        }
    };
    GameScreen.prototype.removeMe = function (i) {
        var removeList = [];
        for (var x = 0; x < this.totalItems; x++) {
            if (this.items[x] == i) {
                removeList.push(x);
            }
        }
        removeList.reverse();
        for (var _i = 0, removeList_1 = removeList; _i < removeList_1.length; _i++) {
            var i_1 = removeList_1[_i];
            this.items.splice(i_1, 1);
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    GameScreen.prototype.collisionWithPlat = function () {
        for (var _i = 0, _a = this.platforms; _i < _a.length; _i++) {
            var platform = _a[_i];
            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.setFalling(false);
                break;
            }
            else {
                this.player.setFalling(true);
            }
        }
    };
    return GameScreen;
}());
var GameScreen1 = (function (_super) {
    __extends(GameScreen1, _super);
    function GameScreen1(game) {
        var _this = _super.call(this, game, 1, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("startbg", "earthbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_1 = jerrycanCoordinates; _i < jerrycanCoordinates_1.length; _i++) {
            var jcoords = jerrycanCoordinates_1[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_1 = platformCoordinates; _a < platformCoordinates_1.length; _a++) {
            var coords = platformCoordinates_1[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen1;
}(GameScreen));
var GameScreen2 = (function (_super) {
    __extends(GameScreen2, _super);
    function GameScreen2(game) {
        var _this = _super.call(this, game, 2, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("earthbg", "marsbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_2 = jerrycanCoordinates; _i < jerrycanCoordinates_2.length; _i++) {
            var jcoords = jerrycanCoordinates_2[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_2 = platformCoordinates; _a < platformCoordinates_2.length; _a++) {
            var coords = platformCoordinates_2[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen2;
}(GameScreen));
var GameScreen3 = (function (_super) {
    __extends(GameScreen3, _super);
    function GameScreen3(game) {
        var _this = _super.call(this, game, 3, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("marsbg", "jupiterbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_3 = jerrycanCoordinates; _i < jerrycanCoordinates_3.length; _i++) {
            var jcoords = jerrycanCoordinates_3[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_3 = platformCoordinates; _a < platformCoordinates_3.length; _a++) {
            var coords = platformCoordinates_3[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen3;
}(GameScreen));
var GameScreen4 = (function (_super) {
    __extends(GameScreen4, _super);
    function GameScreen4(game) {
        var _this = _super.call(this, game, 4, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("jupiterbg", "saturnbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_4 = jerrycanCoordinates; _i < jerrycanCoordinates_4.length; _i++) {
            var jcoords = jerrycanCoordinates_4[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_4 = platformCoordinates; _a < platformCoordinates_4.length; _a++) {
            var coords = platformCoordinates_4[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen4;
}(GameScreen));
var GameScreen5 = (function (_super) {
    __extends(GameScreen5, _super);
    function GameScreen5(game) {
        var _this = _super.call(this, game, 5, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("saturnbg", "uranusbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_5 = jerrycanCoordinates; _i < jerrycanCoordinates_5.length; _i++) {
            var jcoords = jerrycanCoordinates_5[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_5 = platformCoordinates; _a < platformCoordinates_5.length; _a++) {
            var coords = platformCoordinates_5[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen5;
}(GameScreen));
var GameScreen6 = (function (_super) {
    __extends(GameScreen6, _super);
    function GameScreen6(game) {
        var _this = _super.call(this, game, 6, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("uranusbg", "neptunebg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_6 = jerrycanCoordinates; _i < jerrycanCoordinates_6.length; _i++) {
            var jcoords = jerrycanCoordinates_6[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_6 = platformCoordinates; _a < platformCoordinates_6.length; _a++) {
            var coords = platformCoordinates_6[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen6;
}(GameScreen));
var GameScreen7 = (function (_super) {
    __extends(GameScreen7, _super);
    function GameScreen7(game) {
        var _this = _super.call(this, game, 7, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("neptunebg", "mercurybg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_7 = jerrycanCoordinates; _i < jerrycanCoordinates_7.length; _i++) {
            var jcoords = jerrycanCoordinates_7[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_7 = platformCoordinates; _a < platformCoordinates_7.length; _a++) {
            var coords = platformCoordinates_7[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        return _this;
    }
    return GameScreen7;
}(GameScreen));
var GameScreen8 = (function (_super) {
    __extends(GameScreen8, _super);
    function GameScreen8(game) {
        var _this = _super.call(this, game, 8, 4) || this;
        var background = document.getElementsByTagName("background")[0];
        background.classList.replace("mercurybg", "venusbg");
        var jerrycanCoordinates = [
            { x: 225, y: 430 },
            { x: 590, y: 470 },
            { x: 1100, y: 250 },
            { x: 1550, y: 500 }
        ];
        for (var _i = 0, jerrycanCoordinates_8 = jerrycanCoordinates; _i < jerrycanCoordinates_8.length; _i++) {
            var jcoords = jerrycanCoordinates_8[_i];
            _this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"));
        }
        var platformCoordinates = [
            { x: 100, y: 200 },
            { x: 150, y: 500 },
            { x: 500, y: 550 },
            { x: 1000, y: 300 },
            { x: 1500, y: 600 }
        ];
        for (var _a = 0, platformCoordinates_8 = platformCoordinates; _a < platformCoordinates_8.length; _a++) {
            var coords = platformCoordinates_8[_a];
            _this.platforms.push(new Platform(coords.x, coords.y));
        }
        var chest = document.getElementsByTagName("ship")[0];
        chest.id = "chest";
        return _this;
    }
    return GameScreen8;
}(GameScreen));
var Interface = (function () {
    function Interface(g, currentPlanet) {
        this.game = g;
        var foreground = document.getElementsByTagName("foreground")[0];
        this.planetscontainer = document.createElement("planetscontainer");
        foreground.appendChild(this.planetscontainer);
        var mercurius = new PlanetContainer(currentPlanet, "Mercurius", "../docs/images/mercurius.png");
        var venus = new PlanetContainer(currentPlanet, "Venus", "../docs/images/venus.png");
        var aarde = new PlanetContainer(currentPlanet, "Aarde", "../docs/images/aarde.png");
        var mars = new PlanetContainer(currentPlanet, "Mars", "../docs/images/mars.png");
        var jupiter = new PlanetContainer(currentPlanet, "Jupiter", "../docs/images/jupiter.png");
        var saturnus = new PlanetContainer(currentPlanet, "Saturnus", "../docs/images/saturnus.png");
        var uranus = new PlanetContainer(currentPlanet, "Uranus", "../docs/images/uranus.png");
        var neptunus = new PlanetContainer(currentPlanet, "Neptunus", "../docs/images/neptunus.png");
        if (currentPlanet != 8) {
            this.planetscontainer.style.marginTop = "0px";
            this.planetscontainer.style.left = "320px";
            this.planetscontainer.style.backgroundImage = "none";
        }
    }
    return Interface;
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
        if (this.time == 100) {
            this.spaceship.removeSpaceship();
            this.game.emptyScreen();
            if (this.game.getPreviousLevel == 1) {
                this.game.showScreen(new GameScreen2(this.game));
            }
            else if (this.game.getPreviousLevel == 2) {
                this.game.showScreen(new GameScreen3(this.game));
            }
            else if (this.game.getPreviousLevel == 3) {
                this.game.showScreen(new GameScreen4(this.game));
            }
            else if (this.game.getPreviousLevel == 4) {
                this.game.showScreen(new GameScreen5(this.game));
            }
            else if (this.game.getPreviousLevel == 5) {
                this.game.showScreen(new GameScreen6(this.game));
            }
            else if (this.game.getPreviousLevel == 6) {
                this.game.showScreen(new GameScreen7(this.game));
            }
            else if (this.game.getPreviousLevel == 7) {
                this.game.showScreen(new GameScreen8(this.game));
            }
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
        background.classList.add("startbg");
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
        this.starttext.innerHTML = "Je bent een piraat die de hele wereld al heeft ontdekt. Je hebt gehoord dat er een schat verborgen is op de planeet Venus. Ga op reis om de schat te vinden!";
    };
    StartScreen.prototype.switchScreens = function () {
        console.log('switch to gamescreen');
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen1(this.game));
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map