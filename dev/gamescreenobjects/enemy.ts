class Enemy {
    
    private div: HTMLElement
    private x:number
    private y:number
    private orientate:number
    private speed:number
        
    constructor(speed:number) {
        
        this.x = 10
        this.y = 10
        this.speed = 20
        
        this.div = document.createElement("enemy")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.div)  
    }
    
    public scrollLeft(pos:number){
        this.x+=pos
    }

    public remove(){
        this.div.remove()
    }

    public update():void {
        
        if (this.x > window.innerWidth - this.div.offsetWidth){
            this.orientate = -1
            console.log('turn')
            console.log(window.innerWidth)
            console.log(window.innerHeight)

        }

        else if (this.x < 0){
            this.orientate = 1
        }
        
            let nextPosition = this.x + (this.speed * this.orientate)
            this.x = nextPosition
            this.div.style.transform = `translate(${this.x}px, ${this.y}px`
    }

      public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}