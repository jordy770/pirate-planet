/// <reference path="maingamescreen.ts" />

class GameScreen4 extends GameScreen{

    constructor(game:Game){
        //In de super eerst de game doorgeven, daarna het aantal items wat verzameld moet worden
        super(game, 4, 4)

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("jupiterbg", "saturnbg")

        //Items
        let jerrycanCoordinates = [
            {x: 225, y: 430},
            {x: 590, y: 470},
            {x: 1100, y: 250},
            {x: 1550, y: 500}
        ]
        for(let jcoords of jerrycanCoordinates){
            this.items.push(new Item(jcoords.x, jcoords.y, "../docs/images/jerrycan.png"))
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
            this.platforms.push(new Platform(coords.x, coords.y))
        }

    }
}
