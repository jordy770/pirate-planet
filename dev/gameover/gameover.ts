class GameOver {
    private game : Game

    private restartbtn : HTMLElement
    private restartmodal : HTMLElement
    private restarttext : HTMLElement

    constructor(g:Game) {
        this.game = g
        
        this.restartbtn = document.createElement("startbtn")
        this.restartmodal = document.createElement("startmodal")
        this.restarttext = document.createElement("starttext")

        // get container
        let container = document.getElementsByTagName("container")[0]
        
        // append bg to container
        let background = document.createElement("background")
        container.appendChild(background)
        
        // append foreground to container
        let foreground = document.createElement("foreground")
        container.appendChild(foreground)

        // append modal to container
        foreground.appendChild(this.restartmodal)
        this.restartmodal.appendChild(this.restartbtn)
        this.restartmodal.appendChild(this.restarttext)


         // this.textfield = document.createElement("textfield")
        // foreground.appendChild(this.textfield)
        this.restartbtn.addEventListener("click", ()=> this.switchScreens())


    }
    public update() {    
        this.restartbtn.innerHTML = "RESTART GAME"
        this.restarttext.innerHTML = "OEPS! Je schip heeft te veel schade gehad. Probeer het opnieuw."
    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new SpaceGame(this.game))
    }
}