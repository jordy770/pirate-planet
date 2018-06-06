class Spaceship {
    
    spaceshipImage : HTMLImageElement;
    hitbox: HTMLElement
    spaceship : HTMLElement
    spacegame : SpaceGame
    width : number = 100;
    height : number = 150;
    x : number = 0.5 * 1280 - 0.5 * this.width;
    y : number = 720 - this.height - 50;
    speedLeft : number = 0;
    speedRight : number = 0;
    keydownlistener:EventListener
    keyuplistener:EventListener
    
    constructor(g:SpaceGame){
        this.spacegame = g
        this.spaceshipImage = new Image(this.width, this.height);  
        this.spaceshipImage.src = 'images/ship.png';
        this.spaceshipImage.setAttribute("id","spaceship")
        this.hitbox = document.createElement("hitbox")
        this.spaceship = document.createElement("spaceship")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.spaceship);
        this.spaceship.appendChild(this.spaceshipImage)
        this.spaceship.appendChild(this.hitbox)

        this.hitbox.style.height = '130px'
        this.hitbox.style.width = '60px'

        this.keydownlistener =  (e:Event) => this.onKeyDown(e)
        this.keyuplistener = (e:Event) => this.onKeyUp(e)

        window.addEventListener("keydown", this.keydownlistener)
        window.addEventListener("keyup", this.keyuplistener)
        
        console.log('Created spaceship')
    }

    onKeyDown(e:Event):void {
        let event = e as KeyboardEvent
        console.log("ship keydown called!!!")
        switch(event.keyCode){
        case 37: // LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speedLeft = -10
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speedRight = 10
            break
        case 32: // SPACEBAR KEY
            let laserAmount = document.getElementsByClassName('laser').length;
            if(laserAmount < 4){
                let laser : Laser = new Laser(this.x + 0.5 * this.width)
                this.spacegame.addLaser(laser)
            }
            break
        }
    }
    
    onKeyUp(e:Event):void {
        console.log("ship calls keyup")
        let event = e as KeyboardEvent
        switch(event.keyCode){
        case 37:// LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speedLeft = 0
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speedRight = 0
            break
        case 32: // SPACEBAR KEY
            //
            break
        }
    }

    update(){ 
        this.x += this.speedLeft
        this.x += this.speedRight
        if(this.x <= 0){
            this.x = 0
        }else if(this.x >= 1280 - this.width) {
            this.x = 1280 - this.width
        }    
        this.spaceship.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    explode() {
        this.spaceshipImage.src = 'images/explosion.gif';
    }


    public getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }

    public removeSpaceship(){
        console.log("removing the spaceship");
        window.removeEventListener("keydown", this.keydownlistener)
        window.removeEventListener("keyup", this.keyuplistener)
        
    }
}