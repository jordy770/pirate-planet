/// <reference path="maingamescreen.ts" />

class GameScreen5 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 5, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("saturnbg", "uranusbg")

        //Items
        let itemCoordinates = [
            {x: 225, y: 430},
            {x: 590, y: 470},
            {x: 1100, y: 250},
            {x: 1550, y: 500}
        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/jerrycan.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 150, y: 500},
            {x: 500, y: 550},
            {x: 1000, y: 300},
            {x: 1500, y: 600}
        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/snow.png"))
        }

    }
}
