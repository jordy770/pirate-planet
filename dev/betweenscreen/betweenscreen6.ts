/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen6 extends BetweenScreen {

    constructor(game:Game) {
        super(game);
        
        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("neptunebg", "venusbg")

        this.text = "Je bent aangekomen op Mars. Je schip is helaas wel aan reparatie toe. Vind alle schroeven om je schip te repareren."
    }
}