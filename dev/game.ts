class Game {

    private currentscreen : StartScreen | GameScreen | SpaceGame | GameOver
    // width: number = 1280;
    // height: number = 720;

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
        let container = document.getElementsByTagName("container")[0]
        container.innerHTML = ""
    }

    public showScreen(screen : StartScreen | GameScreen| SpaceGame | GameOver ) {
        this.currentscreen = screen
    }
    
} 

window.addEventListener("load", () => new Game())