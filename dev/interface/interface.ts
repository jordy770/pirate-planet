class Interface {
    private game : Game
    private interface : HTMLElement
    private planetImage: HTMLImageElement;
    planetWidth: number = 400
    planetHeight: number = 100


    constructor(g:Game) {
        this.game = g
        console.log('ik ben de interface bitches')

        // get container
        //let container = document.getElementsByTagName("container")[0]
        let foreground = document.getElementsByTagName("foreground")[0]
        //let planet = document.getElementsByTagName("interface")

        this.interface = document.createElement("interface")
        foreground.appendChild(this.interface)

       

        this.updateInterface()
    }

    public update() {    
       
    }

    private updateInterface() {
       
        this.planetImage = new Image(this.planetWidth, this.planetHeight)
        this.planetImage.setAttribute('style', 'left:400px;top:20px;')
        this.planetImage.src = 'images/planet1.png';
        this.interface.appendChild(this.planetImage)
        console.log('updating interface')
    }
}