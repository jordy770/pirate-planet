class GameScreen{

    protected player:Player
    protected ship:Ship
    protected textfield: HTMLElement
    protected game:Game
    protected score:number = 0
    protected hitShip:number = 0
    protected interface : Interface
    protected items:Array<Item>
    protected totalItems : number
    protected platforms:Array<Platform>
    protected currentlevel : number

    constructor(game:Game, currentlevel:number, totalItems : number){
        this.game = game
        this.currentlevel = currentlevel
        this.totalItems = totalItems

        this.items = new Array()
        this.platforms = new Array()
        
        if(currentlevel < 8){
            this.interface = new Interface(this.game, this.currentlevel) 
        }
       

        let background = document.getElementsByTagName("background")[0]
        this.textfield = document.createElement("textfield")
        background.appendChild(this.textfield);

        this.ship = new Ship()
        this.player = new Player(this)
    }

    //scroll level
    public scrollLevel(pos:number){

        for(let item of this.items){
            item.scrollLeft(pos)
        }
        for(let platform of this.platforms){
            platform.scrollLeft(pos)
        }
        this.ship.scrollLeft(pos)
    }   

    public update():void {

        this.player.update()
     
        this.ship.update()
        this.textfield.innerHTML = this.score + "/" + this.totalItems 
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;")
        
        //If player hits item +score & remove this.item
        for(let item of this.items){
            item.update()

            if (this.checkCollision(this.player.getRectangle(), item.getRectangle())) {
                this.score++
                console.log(this.score)
                item.remove()
                }
        }

        //update platforms
        for(let platform of this.platforms){
            platform.update()
        }
        
        //update if player hits platform dont drop!
       //this.collisionWithPlat();
        
        //if player had MAX amount items boat activates
        if (this.checkCollision(this.player.getRectangle(), this.ship.getRectangle())) {
            this.hitShip++
            if(this.hitShip > 0 && this.score == this.totalItems){
                if(this.currentlevel == 8) {
                    let end = new End()
                    let chest = document.getElementsByTagName("ship")[0]
                    chest.id = "openchest"
                    this.player.removeInput()
                    this.currentlevel = 9
                } else if(this.currentlevel < 8) {
                    this.game.emptyScreen()
                    this.game.setPreviousLevel = this.currentlevel
                    this.game.showScreen(new SpaceGame(this.game))
                }
            }
        }
    }

    public removeMe(i:Item){
        let removeList:number[] = []

        for(let x = 0 ; x < this.totalItems; x++){
            if (this.items[x] == i){
                removeList.push(x);
            }
        }

        removeList.reverse()
            for(let i of removeList){
                this.items.splice(i, 1)
            }
    }
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    // aangeroepen door player
    // player moet setfalling doen als false
    public collisionWithPlat() : boolean {
        let falling = false
        for(let platform of this.platforms){

            if (this.checkCollision(this.player.getRectangle(), platform.getRectangle())) {
               falling = true
               break
             }
        }

        return falling
    }
}

