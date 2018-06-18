/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen4 extends BetweenScreen {

    constructor(game:Game) {
        super(game);

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("saturnbg", "uranusbg")

        this.text = "Je bent aangekomen op Uranus. Je schip heeft alleen geen brandstof meer. Ga op zoek naar benzine zodat je weer verder kunt."
    }
}