/// <reference path="maingamescreen.ts" />

class GameScreen1 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het nummer van de gamescreen, daarna het aantal items wat verzameld moet worden
        super(game, 1, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("startbg", "earthbg")

        //Items
        let itemCoordinates = [
            {x: 225, y: 420},
            {x: 730, y: 570},
            {x: 1100, y: 220},
            {x: 1550, y: 520},
            {x: 1550, y: 520}

        ]
        for(let icoords of itemCoordinates){
            this.items.push(new Item(icoords.x, icoords.y, "../docs/images/plank.png"))
        }

        //Platforms
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 150, y: 500},
            {x: 700, y: 650},
            {x: 1000, y: 300},
            {x: 1500, y: 600},
            {x: 1800, y: 200}

        ]
        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y, "../docs/images/grass.png"))
        }

    }
}

