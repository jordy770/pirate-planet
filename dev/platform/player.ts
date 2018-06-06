class Player  {
    
    private player:HTMLElement
    private levelposition:number = 0
    private y:number = 10
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private gamescreen:GameScreen
    // private frames = 4
    // private frame = 0
    // private framewidth = 255
    // private speedcounter = 0

    

    public gravity: number
         
    constructor(b:GameScreen) {
        this.gamescreen = b
        this.player = document.createElement("player")  

        // this.frame = 0

        let background = document.getElementsByTagName("background")[0]
        background.appendChild(this.player)

        this.gravity = 10

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
            case "a":
                this.speedLeft = 10
                break
            case "ArrowRight":
            case "d":
                this.speedRight = 10
                break
            case "ArrowUp":
            case "w":
                this.speedUp = 50
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
            case "a":
                this.speedLeft = 0
                break
            case "ArrowRight":
            case "d":
                this.speedRight = 0
                break
            case "ArrowUp":
            case "w":
                this.speedUp = 0
                break
        }
    }

    public hitPlat(){
        // this.downSpeed = 0
        // this.speedUp = 0
         this.gravity = 0
     }

    public update():void 
    {

        // // go to the next drawing after X animationframes (the FPS)
        // this.speedcounter++
        // if(this.speedcounter%4 == 0) this.frame++
        // // check if this frame exists or go to frame 0
        // if(this.frame >= this.frames) this.frame = 0
        // // position of the spritesheet image
        // let pos = 0 - (this.frame*this.framewidth)
        // this.player.style.backgroundPosition = pos + 'px 0px'

        // update 60 times per second
       // requestAnimationFrame(()=>this.update())
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