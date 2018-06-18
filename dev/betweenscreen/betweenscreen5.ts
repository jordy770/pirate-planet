/// <reference path="mainbetweenscreen.ts" />

class BetweenScreen5 extends BetweenScreen {

    constructor(game:Game) {
        super(game);

        let background = document.getElementsByTagName("background")[0]
        background.classList.replace("uranusbg", "neptunebg")

        this.text = "Je bent aangekomen op Neptunus. De kern van deze planeet bestaat uit gesmolten metaal. Vind alle blokken metaal om verder te gaan."
    }
}