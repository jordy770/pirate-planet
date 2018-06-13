/// <reference path="maingamescreen.ts" />

class GameScreen6 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 6, 5)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("uranusbg", "neptunebg")

        //Items
        let itemCoordinates = [
            {x: 450, y: 340},
            {x: -190, y: 570},
            {x: 900, y: 350},
            {x: 1400, y: 270},
            {x: 2450, y: 170}

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/metal.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 550, y: 200},
            {x: 350, y: 420},
            {x: 100, y: 420},
            {x: -150, y: 420},
            {x: -400, y: 420},
            {x: -750, y: 650},
            {x: -500, y: 650},
            {x: -250, y: 650},
            {x: 1000, y: 550},
            {x: 1300, y: 350},
            {x: 1700, y: 150},
            {x: 1700, y: 450},
            {x: 2000, y: 650},
            {x: 2200, y: 400},
            {x: 2400, y: 250}








        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/snow.png"))
        }

    }
}
