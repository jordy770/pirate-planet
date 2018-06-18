/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen4 extends BetweenScreen {

    constructor(game:Game) {
        super(game);

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("saturnbg", "uranusbg")

        this.text = "Je bent aangekomen op Mars. Je schip is helaas wel aan reparatie toe. Vind alle schroeven om je schip te repareren."
    }
}