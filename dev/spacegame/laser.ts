class Laser{
    laser: HTMLImageElement
    laserWidth: number = 15
    laserHeight: number = 32
    y: number = 520
    x: number
    private lasersound : HTMLAudioElement

    constructor(x : number){
        this.x = x - 0.5 * this.laserWidth
        this.laser = new Image(this.laserWidth, this.laserHeight);       
        this.laser.setAttribute('style', 'left:'+this.x+'px;top:0px;');
        this.laser.classList.add('laser');

        this.laser.src = 'images/laser.png';
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.laser);

         // add shooting sound
         this.lasersound = document.createElement("audio");
         this.lasersound.src = "../docs/music/laser.wav"
         this.lasersound.setAttribute("preload", "auto");
         this.lasersound.setAttribute("controls", "none");
         this.lasersound.style.display = "none";
         document.body.appendChild(this.lasersound);
         this.lasersound.play();

        this.update()

         
    
        console.log('Created laser')
    }

    update(){
        this.y = this.y -5;
        this.laser.style.transform = "translate(0px,"+this.y+"px)"

        if(this.y < 0 - this.laserHeight) {
            this.laser.remove();
        }     

    }

    remove(){
        this.laser.remove()
    }
    
    public getRectangle() {
        return this.laser.getBoundingClientRect()
    }
}
