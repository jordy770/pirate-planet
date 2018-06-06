class Asteroid{

    private spacegame : SpaceGame
    private asteroidImage: HTMLImageElement;
    private hitbox: HTMLElement
    private asteroid : HTMLElement
    private asteroidSize: number
    private speed:number
    private y: number
    private x: number

    constructor(g:SpaceGame){
        this.spacegame = g
        let foreground = document.getElementsByTagName("foreground")[0]
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);       
        this.asteroidImage.src = 'images/asteroid.png';
        this.asteroid = document.createElement("asteroid")

        this.hitbox = document.createElement("hitbox")
   
        foreground.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage)
        this.asteroid.appendChild(this.hitbox)

        this.reset()

        console.log('Created asteroid')
    }

    public update(){
        this.y += this.speed
        this.asteroid.style.transform = `translate(${this.x}px,${this.y}px)`

        if(this.y > 720 + this.asteroidSize) {
            this.reset()
        }
    }

    public reset(){
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.x = Math.floor((Math.random() * 1280 - this.asteroidSize) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize
        this.asteroidImage.width = this.asteroidSize
        this.asteroidImage.height = this.asteroidSize

        this.hitbox.style.height = this.asteroidSize + "px"
        this.hitbox.style.width = this.asteroidSize + "px"

        if(this.asteroidSize > 40){
            this.hitbox.style.left = "-20px"
            this.hitbox.style.top = "-15px"
        }

        if(this.asteroidSize > 100){
            this.hitbox.style.left = "-15px"
            this.hitbox.style.top = "-15px"
        }

        if(this.asteroidSize > 160){
            this.hitbox.style.left = "-15px"
            this.hitbox.style.top = "-15px"
        }
    }    

    public getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }
}
