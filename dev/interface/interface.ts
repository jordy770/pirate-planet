class Interface {
    private game : Game
    //private planets : Array


    constructor(g:Game) {
        this.game = g

        // get container
        let container = document.getElementsByTagName("container")[0]
        let foreground = document.getElementsByTagName("foreground")[0]
    }

    public update() {    
       
    }
}