class BetweenScreen{
    private game : Game
    background: HTMLImageElement;
    private betweenbtn : HTMLElement
    private betweenmodal : HTMLElement
    private betweentext : HTMLElement
    width: number = 1280;
    height: number = 720;

    constructor(g:Game) {
        this.game = g
        
        this.betweenbtn = document.createElement("betweenbtn")
        this.betweenmodal = document.createElement("betweenmodal")
        this.betweentext = document.createElement("betweentext")

        // get container
        let container = document.getElementsByTagName("container")[0]
        
        // append bg to container
        let background = document.createElement("background")
        container.appendChild(background)
        
        // append foreground to container
        let foreground = document.createElement("foreground")
        container.appendChild(foreground)

        this.background = new Image(this.width, this.height);
        this.background.setAttribute("class","between-background")

        // append modal to container
        foreground.appendChild(this.betweenbtn)
        
        this.betweenbtn.addEventListener("click", ()=> this.switchScreens())
    }

    private switchScreens(){
        console.log('go to second level')
       // this.game.emptyScreen()
       // this.game.showScreen(new GameScreen(this.game))
    }



}