class SpaceGame {
    
    private asteroids: Asteroid[] //array for asteroids
    private spaceship: Spaceship
    private background: Background
    private lasers : Laser[]
    private textfield : HTMLElement
    private levens:number = 3   
    private time:number = 0
    private game:Game
    private foreground:Element
    private afstand:number = 2452800
    private bgmusic : HTMLAudioElement
    

    

    public get Time() : number {
        return this.time
    }

    constructor(g:Game){
        this.game = g
        this.background = new Background() //create background
        this.spaceship = new Spaceship(this) //create spaceship

        this.foreground = document.getElementsByTagName("foreground")[0]
        this.textfield = document.createElement("textfield")
        this.foreground.appendChild(this.textfield);

        this.asteroids = []
        this.lasers = []

        /// music
        this.bgmusic = document.createElement("audio");
        this.bgmusic.src = "../docs/music/game-space-music.wav"
        this.bgmusic.setAttribute("preload", "auto");
        this.bgmusic.setAttribute("controls", "none");
        this.bgmusic.style.display = "none";
        document.body.appendChild(this.bgmusic);
        this.bgmusic.play();


        for(let i = 0; i < 6; i++){ //create asteroids
            let asteroid = new Asteroid(this)            
            this.asteroids.push(asteroid)
            asteroid.update()
        }
    }  

    public update():void{
        this.spaceship.update()
        this.textfield.innerHTML = "LEVENS: " +this.levens + " -  AFSTAND: " +this.afstand + "km"
        this.textfield.setAttribute("style", "font-size:30px;width:1000px;")
        for(let l of this.lasers) { // loop door alle asteroids in de array - roep update aan
            l.update()
        }

        for(let asteroid of this.asteroids) { // loop door alle asteroids in de array - roep update aan
            asteroid.update()

           
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset()
                if(this.levens > 0) {
                    this.levens--
                }
                console.log("ship hits asteroid")
            }

            for(let las of this.lasers) { // loop door alle asteroids in de array - roep update aan
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers")
                    asteroid.reset()
                    las.remove()
                }
            }
        }

        if (this.levens == 0){    
            this.spaceship.removeSpaceship()
            this.bgmusic.pause();
            this.game.emptyScreen()
            this.game.showScreen(new GameOver(this.game))
        }
<<<<<<< HEAD
  
        if (this.time == 1400){

=======
<<<<<<< HEAD

        if (this.time == 1400){
=======
  
        if (this.time == 1400){

>>>>>>> d27bd6e1fd5125c88d7770a0ec7881c634dc081c
>>>>>>> 662acc168741adf3ca403b79eb08f02f93aebea4
            this.spaceship.removeSpaceship()
            this.game.emptyScreen()
            this.bgmusic.pause();
            if (this.game.getPreviousLevel == 1){
                this.game.showScreen(new BetweenScreen1(this.game))
            } else if (this.game.getPreviousLevel == 2){
                this.game.showScreen(new BetweenScreen2(this.game))
            } else if (this.game.getPreviousLevel == 3){
                this.game.showScreen(new BetweenScreen3(this.game))
            } else if (this.game.getPreviousLevel == 4){
                this.game.showScreen(new BetweenScreen4(this.game))
            } else if (this.game.getPreviousLevel == 5){
                this.game.showScreen(new BetweenScreen5(this.game))
            } else if (this.game.getPreviousLevel == 6){
                this.game.showScreen(new BetweenScreen6(this.game))
            } else if (this.game.getPreviousLevel == 7){
                this.game.showScreen(new BetweenScreen7(this.game))
            } 
        }

        this.time++
        this.afstand = this.afstand - 1752
        console.log(this.time)
        console.log(this.afstand)

        this.background.loop()      
    }

    public addLaser(l:Laser){
        this.lasers.push(l)
    }


    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }    
}  