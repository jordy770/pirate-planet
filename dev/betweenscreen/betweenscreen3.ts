/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen3 extends BetweenScreen {

    constructor(game:Game) {
        super(game);

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("jupiterbg", "saturnbg")

        this.text = "Je bent aangekomen op Saturnus. Om deze planeet zit een ring! Verzamel alle ringen om naar de volgende planeet te gaan."
    }
}