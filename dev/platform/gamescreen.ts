class GameScreen{

    private player:Player
    private ship:Ship
    private platforms:Array<Platform>
    // private foreground:HTMLElement
    private game:Game
    private hitByBomb:number = 0
    private interface : Interface
    

    constructor(g:Game){
        this.game = g
        
        this.interface = new Interface(this.game)

        // get container
        let container = document.getElementsByTagName("container")[0]
        console.log("hallo")

        

    
        this.ship = new Ship()
        //this.platform = new Platform()

        this.platforms = new Array()
        let platformCoordinates = [
            {x: 100, y: 200},
            {x: 150, y: 500},
            {x: 500, y: 550},
            {x: 1000, y: 300},
            {x: 1500, y: 600},
        ]

        for(let coords of platformCoordinates){
            this.platforms.push(new Platform(coords.x, coords.y))
        }

        this.player = new Player(this)
    }

    public scrollLevel(pos:number){
        //this.foreground.style.transform = `translateX(${pos}px)`
        // dirty fix
        this.ship.scrollLeft(pos)
        
        for(let platform of this.platforms){
            platform.scrollLeft(pos)
        }
    }   

    public update():void {

        this.player.update()
        this.ship.update() // doet op zich niks
        
        for(let platform of this.platforms){
            platform.update()

            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.hitPlat()
             } else {
                 this.player.gravity = 10
             }
        }

        
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitByBomb++
            if(this.hitByBomb > 0){
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

