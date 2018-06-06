class Player  {
    
    private player:HTMLElement
    private levelposition:number = 0
    private y:number = 10
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private gamescreen:GameScreen
    

    public gravity: number
         
    constructor(b:GameScreen) {
        this.gamescreen = b
        this.player = document.createElement("player")  

        //let container = document.getElementsByTagName("container")[0]
  //      let game = document.getElementsByTagName("Back")[0]

        let background = document.getElementsByTagName("background")[0]
        background.appendChild(this.player)

        this.gravity = 10

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10
                break
            case "ArrowRight":
                this.speedRight = 10
                break
            case "ArrowUp":
                this.speedUp = 50
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
            case "ArrowUp":
                this.speedUp = 0
                break
        }
    }



    public update():void 
    {
        // keyboard input verandert alleen de positie van het level
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight
        this.gamescreen.scrollLevel(this.speedLeft - this.speedRight)

        let newY = this.y - this.speedUp + this.gravity
        if (newY > 0 && newY + 150 < 720) this.y = newY
        
        // positie van auto kan je veranderen met x y
        this.player.style.transform = `translate(200px, ${this.y}px)`

        
    }  

    public getRectangle() {
        return this.player.getBoundingClientRect()
    }
}