class Jerrycan {
    
    private div: HTMLElement
    private speed:number
    private x:number
    private y:number
        
    constructor() {
        this.div = document.createElement("jerrycan")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.div)
        this.speed = 4 + Math.random() * 8
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -400 - (Math.random() * 450) 
    }

    public update():void {
        this.y += this.speed
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}