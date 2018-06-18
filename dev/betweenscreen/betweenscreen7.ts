/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen7 extends BetweenScreen {

    constructor(game:Game) {
        super(game);

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("venusbg", "mercurybg")

        this.text = "Je bent aangekomen op Mercurius. Volg de muntjes om de schat te vinden!"
    }
}