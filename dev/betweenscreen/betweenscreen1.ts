/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen1 extends BetweenScreen {

    constructor(game:Game) {
        super();
        this.game = game
        

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

    public update() {
        this.betweenbtn.innerHTML = "NEXT LEVEL"
        this.betweentext.innerHTML = "Je bent aangekomen op Mars. Je schip is helaas wel aan reparatie toe. Vind alle schroeven om je schip te repareren."
    }

    private switchScreens(){
        console.log('go to second level')
       // this.game.emptyScreen()
       // this.game.showScreen(new GameScreen(this.game))
    }
}