class GameScreen{

    private player:Player

    private ship:Ship
    private platforms:Array<Platform>
    private jerrycans:Array<Jerrycan>
    private textfield: HTMLElement
    private game:Game
    public score:number = 0
    private hitShip:number = 0
    private MAX_JERRY:number = 4
    private interface : Interface
       

    constructor(g:Game){
        this.game = g
        
        this.interface = new Interface(this.game)
        let background = document.getElementsByTagName("background")[0]
        this.textfield = document.createElement("textfield")
        background.appendChild(this.textfield);

        // get container
        let container = document.getElementsByTagName("container")[0]
        console.log("hallo")

        this.ship = new Ship()
        //this.platform = new Platform()

        this.jerrycans = new Array()
        let jerrycanCoordinates = [
            {x: 225, y: 430},
            {x: 590, y: 470},
            {x: 1100, y: 250},
            {x: 1550, y: 500}
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

    //scroll level
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
        this.textfield.innerHTML = this.score + "/" + this.MAX_JERRY 
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;")
        
        //If player hits jerrycan +score & remove this.jerrycan
        for(let jerrycan of this.jerrycans){
            jerrycan.update()

            if (this.checkCollision(this.player.getRectangle(), jerrycan.getRectangle())) {
                this.score++
                console.log(this.score)
                jerrycan.remove()
                }
        }

        //update platforms
        for(let platform of this.platforms){
            platform.update()
        }
        
        //update if player hits platform dont drop!
       this.collisionWithPlat();
        
        //if player had MAX amount jerrycans boat activates
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitShip++
            if(this.hitShip > 0 && this.score == this.MAX_JERRY){
                this.game.emptyScreen()
                this.game.showScreen(new SpaceGame(this.game))
            }
        }
    }

    public removeMe(j:Jerrycan){
        let removeList:number[] = []

        for(let i = 0 ; i < this.MAX_JERRY; i++){
            if (this.jerrycans[i] == j){
                removeList.push(i);
            }
        }

        removeList.reverse()
            for(let i of removeList){
                this.jerrycans.splice(i, 1)
            }
    }
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    public collisionWithPlat(){
        for(let platform of this.platforms){

            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
                this.player.setFalling(false)
                break
             } else {
                 this.player.setFalling(true)
             }
        }
    }
}

