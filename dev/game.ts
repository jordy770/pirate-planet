class Game {

    private currentscreen : StartScreen | GameScreen | SpaceGame | BetweenScreen | GameOver
    private previouslevel : number

    public get getPreviousLevel() : number {
        return this.previouslevel
    }
    
    public set setPreviousLevel(level : number){
        this.previouslevel = level 
    }

    constructor() {
       // let container = document.getElementsByTagName("container")[0]

        this.currentscreen = new StartScreen(this)
        this.gameLoop()
    }

    private gameLoop():void{
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public emptyScreen() {
        let foreground = document.getElementsByTagName("foreground")[0]
        let background = document.getElementsByTagName("background")[0]
        foreground.innerHTML = ""
        background.innerHTML = ""
    }

    public showScreen(screen : StartScreen | GameScreen | SpaceGame | BetweenScreen | GameOver ) {
        this.currentscreen = screen
    }
    
} 

window.addEventListener("load", () => new Game())