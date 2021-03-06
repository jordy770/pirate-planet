class GameOverPlat {
    private game : Game

    private restartbtn : HTMLElement
    private restartmodal : HTMLElement
    private restarttext : HTMLElement
    protected currentlevel : number

    constructor(g:Game, currentlevel:number) {
        this.game = g
        this.currentlevel = currentlevel
        
        this.restartbtn = document.createElement("startbtn")
        this.restartmodal = document.createElement("startmodal")
        this.restarttext = document.createElement("starttext")

        // get container
        let foreground = document.getElementsByTagName("foreground")[0]

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
        this.restarttext.innerHTML = "OEPS! Je verloor je evenwicht en drijft nu door de ruimte. Probeer het opnieuw."
    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen1(this.game))

        
    }
}