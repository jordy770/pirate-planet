class Enemy {
    
    private div: HTMLElement
    private x:number
    private y:number
    private speed:number = 10
        
    constructor() {
        
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
        
        let newX = this.x - this.speed 
        if (newX > 0  && newX + 150 < 720) {
            this.x = newX
        } 
        
        this.div.style.transform = `translate(${this.x}px, 720-150px)`
    }

      public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}