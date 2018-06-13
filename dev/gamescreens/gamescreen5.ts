/// <reference path="maingamescreen.ts" />

class GameScreen5 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 5, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("saturnbg", "uranusbg")

        //Items
        let itemCoordinates = [
            {x: 600, y: 120},
            {x: 1100, y: 320},
            {x: 210, y: 460},
            {x: 1900, y: 270},

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/jerrycan.png"))
        }

        //Platforms
        let platformCoordinates = 
        [
            {x: -150, y: 200},
            {x: 100, y: 200},
            {x: 350, y: 200},
            {x: 600, y: 200},
            {x: 150, y: 550},
            {x: 400, y: 550},
            {x: 650, y: 550},
            {x: 1000, y: 400},
            {x: 1300, y: 250},
            {x: 1600, y: 500},
            {x: 1900, y: 100},
            {x: 1900, y: 350},
            {x: 2200, y: 600}
        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/snow.png"))
        }

    }
}
