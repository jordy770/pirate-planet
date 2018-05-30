class Game {

    private currentscreen : StartScreen | GameScreen | SpaceGame | GameOver

    constructor() {
        this.currentscreen = new StartScreen(this)
        this.gameLoop()
    }

    private gameLoop():void{
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public emptyScreen() {
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.innerHTML = ""
    }

    public showScreen(screen : StartScreen | GameScreen| SpaceGame | GameOver ) {
        this.currentscreen = screen
    }
    
} 

window.addEventListener("load", () => new Game())