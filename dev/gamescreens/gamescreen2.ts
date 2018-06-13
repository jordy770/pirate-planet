/// <reference path="maingamescreen.ts" />

class GameScreen2 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 2, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("earthbg", "marsbg")

        //Items
        let itemCoordinates = [
            {x: 570, y: 220},
            {x: 1100, y: 220},
            {x: 1550, y: 520},
            {x: 2250, y: 80}

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/schroeven.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 500, y: 300},
            {x: 700, y: 550},
            {x: 1000, y: 300},
            {x: 1500, y: 600},
            {x: 2000, y: 400},
            {x: 2200, y: 150}


        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/lava.png"))
        }

    }
}
