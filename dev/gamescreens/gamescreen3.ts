/// <reference path="maingamescreen.ts" />

class GameScreen3 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 3, 5)

        //Items
        let itemcanCoordinates = [
            {x: -150, y: 500},
            {x: 590, y: 450},
            {x: 1100, y: 210},
            {x: 1550, y: 500},
            {x: 2300, y: 500}

        ]
        for(let icoords of itemcanCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/bubble.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: -500, y: 400},
            {x: -200, y: 600},
            {x: 100, y: 200},
            {x: 500, y: 550},
            {x: 1000, y: 300},
            {x: 1500, y: 600},
            {x: 1600, y: 200},
            {x: 1900, y: 400},
            {x: 2200, y: 600},

        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/stone.png"))
        }

    }
}
