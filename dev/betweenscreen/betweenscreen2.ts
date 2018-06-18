/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen2 extends BetweenScreen {

    constructor(game:Game) {
        super(game);
        
        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("marsbg", "jupiterbg")

        this.text = "Je bent aangekomen op Jupiter. Jupiter is een gasreus! Verzamel alle gasbubbels om naar het volgende level te gaan."
    }
}