class GameScreen{

    private player:Player
    private ship:Ship
    private platforms:Array<Platform>
    private jerrycans:Array<Jerrycan>
    // private foreground:HTMLElement
    private game:Game
    private score:number = 0
    private hitShip:number = 0
    private interface : Interface
    

    constructor(g:Game){
        this.game = g
        
        this.interface = new Interface(this.game)

        // get container
        let container = document.getElementsByTagName("container")[0]
        console.log("hallo")

        this.ship = new Ship()
        //this.platform = new Platform()

        this.jerrycans = new Array()
        let jerrycanCoordinates = [
            {x: 300, y: 550},
            {x: 400, y: 500},
            {x: 300, y: 500},
            {x: 300, y: 500}
        ]

        this.platforms = new Array()
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 150, y: 500},
            {x: 500, y: 550},
            {x: 1000, y: 300},
            {x: 1500, y: 600}
        ]

        for(let jcoords of jerrycanCoordinates){
            this.jerrycans.push(new Jerrycan(jcoords.x, jcoords.y))
        }

        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y))
        }

        this.player = new Player(this)
    }

    public scrollLevel(pos:number){
        //this.foreground.style.transform = `translateX(${pos}px)`
        // dirty fix
        this.ship.scrollLeft(pos)

        for(let jerrycan of this.jerrycans){
            jerrycan.scrollLeft(pos)
        }
        
        for(let platform of this.platforms){
            platform.scrollLeft(pos)
        }
    }   

   

               

    public update():void {

        this.player.update()
     
        this.ship.update()

        for(let jerrycan of this.jerrycans){
            jerrycan.update()

            // if (this.checkCollision(this.player.getRectangle(), jerrycan.getRectangle())) {
            //     this.score++
            //     if(this.score > 4){
            //     }
            // }
        }

        
        for(let platform of this.platforms){
            platform.update()
        }
        
        for(let platform of this.platforms){

            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.setFalling(false)
                break
             } else {
                 this.player.setFalling(true)
             }
        }

        
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitShip++
            if(this.hitShip > 0){
                this.game.emptyScreen()
                this.game.showScreen(new SpaceGame(this.game))
            }
        }
    }
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

