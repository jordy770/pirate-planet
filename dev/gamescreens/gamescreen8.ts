/// <reference path="maingamescreen.ts" />

class GameScreen8 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 8, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("venusbg", "mercurybg")

        //Items
        let itemCoordinates = [
            {x: 180, y: 430},
            {x: 580, y: 430},
            {x: 980, y: 430},
            {x: 1380, y: 430},
            {x: 1580, y: 330},
            {x: 1780, y: 230},
            {x: 1980, y: 130},
            {x: 2180, y: 30}

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/coin.gif"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 100, y: 550},
            {x: 500, y: 550},
            {x: 900, y: 550},
            {x: 1300, y: 550},
            {x: 1500, y: 450},
            {x: 1700, y: 350},
            {x: 1900, y: 250},
            {x: 2100, y: 150},
            {x: 2200, y: 350},
            {x: 2400, y: 350},
            {x: 2600, y: 350}

        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/blocks.png"))
        }

        //Dirty ship to chest fix
        let chest = document.getElementsByTagName("ship")[0]
        chest.id = "chest"


    }
}
