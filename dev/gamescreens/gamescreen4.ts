/// <reference path="maingamescreen.ts" />

class GameScreen4 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 4, 5)

        //Items
        let itemCoordinates = [
            {x: -230, y: 260},
            {x: 225, y: 410},
            {x: 920, y: 430},
            {x: 1150, y: 110},
            {x: 1960, y: 510},

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/apple.gif"))
        }

        //Platforms
        let platformCoordinates = [
            {x: -250, y: 350},
            {x: 100, y: 200},
            {x: 150, y: 500},
            {x: 600, y: 350},
            {x: 1100, y: 200},
            {x: 1000, y: 600},
            {x: 1400, y: 400},
            {x: 1900, y: 600},
            {x: 2150, y: 300}



        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/purpleplatform.png"))
        }

    }
}
