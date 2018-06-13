class BetweenScreen{

    protected game : Game
    protected betweenbtn : HTMLElement
    protected betweenmodal : HTMLElement
    protected betweentext : HTMLElement
    protected text : string

    constructor(g:Game) {
        this.game = g
        
        let foreground = document.getElementsByTagName("foreground")[0]

        this.betweenbtn = document.createElement("betweenbtn")
        this.betweenmodal = document.createElement("betweenmodal")
        this.betweentext = document.createElement("betweentext")
        
        foreground.appendChild(this.betweenmodal)
        this.betweenmodal.appendChild(this.betweenbtn)
        this.betweenmodal.appendChild(this.betweentext)
        this.betweenbtn.addEventListener("click", ()=> this.switchScreens())
    }

    public switchScreens(){
        this.game.emptyScreen()

        if (this.game.getPreviousLevel == 1){
            this.game.showScreen(new GameScreen2(this.game))
        } else if (this.game.getPreviousLevel == 2){
            this.game.showScreen(new GameScreen3(this.game))
        } else if (this.game.getPreviousLevel == 3){
            this.game.showScreen(new GameScreen4(this.game))
        } else if (this.game.getPreviousLevel == 4){
            this.game.showScreen(new GameScreen5(this.game))
        } else if (this.game.getPreviousLevel == 5){
            this.game.showScreen(new GameScreen6(this.game))
        } else if (this.game.getPreviousLevel == 6){
            this.game.showScreen(new GameScreen7(this.game))
        } else if (this.game.getPreviousLevel == 7){
            this.game.showScreen(new GameScreen8(this.game))
        } 
    }

    public update (){
        this.betweentext.innerHTML = this.text
        this.betweenbtn.innerHTML = "OKE"
    }
}