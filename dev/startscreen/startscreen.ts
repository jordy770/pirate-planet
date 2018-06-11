class StartScreen {

    // private textfield: HTMLElement
    private game : Game
    private startbtn : HTMLElement
    private startmodal : HTMLElement
    private starttext : HTMLElement

    private addNumbers(a:number, b:number){
        console.log( a + b )
    }

    constructor(g:Game) {
        this.addNumbers(2,3)

        this.game = g
        
        this.startbtn = document.createElement("startbtn")
        this.startmodal = document.createElement("startmodal")
        this.starttext = document.createElement("starttext")

        // get container
        let container = document.getElementsByTagName("container")[0]
        
        // append bg to container
        let background = document.createElement("background")
        background.classList.add("startbg")
        container.appendChild(background)
        
        // append foreground to container
        let foreground = document.createElement("foreground")
        container.appendChild(foreground)

        // append modal to container
        foreground.appendChild(this.startmodal)
        this.startmodal.appendChild(this.startbtn)
        this.startmodal.appendChild(this.starttext)

        this.startbtn.addEventListener("click", ()=> this.switchScreens())
    }

    public update() {
        this.startbtn.innerHTML = "START GAME"
        this.starttext.innerHTML = "Je bent een piraat die de hele wereld al heeft ontdekt. Je hebt gehoord dat er een schat verborgen is op de planeet Neptunus. Ga op reis om de schat te vinden!"
    }

    private switchScreens(){
        console.log('switch to gamescreen')
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen1(this.game))
    }
}