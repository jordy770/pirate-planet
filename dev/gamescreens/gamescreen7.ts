/// <reference path="maingamescreen.ts" />

class GameScreen7 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 7, 5)

        //Items
        let itemCoordinates = [
            {x: 225, y: 510},
            {x: -350, y: 410},
            {x: 1100, y: 360},
            {x: 1900, y: 360},
            {x: 2350, y: 560}

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/bag.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 320, y: 200},
            {x: 500, y: 450},
            {x: 150, y: 600},
            {x: -80, y: 600},
            {x: -400, y: 500},
            {x: 1000, y: 450},
            {x: 1500, y: 250},
            {x: 1730, y: 250},
            {x: 1900, y: 450},
            {x: 2200, y: 650},
            {x: 2350, y: 350},




        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/metalplatform.png"))
        }

    }
}
