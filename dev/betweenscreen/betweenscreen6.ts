/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen6 extends BetweenScreen {

    constructor(game:Game) {
        super(game);
        
        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("neptunebg", "venusbg")

        this.text = "Je bent aangekomen op Venus. Pak alle zakjes op zodat je straks je buit kan verzamelen!"
    }
}