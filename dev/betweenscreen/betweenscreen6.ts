/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen6 extends BetweenScreen {

    constructor(game:Game) {
        super(game);
        
        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("neptunebg", "venusbg")

        this.text = "Je merkte dat er geen planeten meer te zien waren, en besloot terug te vliegen om aan de andere kant van de aarde te kijken.<br> Je had gelijk! Je bent aangekomen op Venus. Pak alle zakjes op zodat je straks je buit kan verzamelen!"
    }
}