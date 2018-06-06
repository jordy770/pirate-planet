class Ship {
    
    private ship: HTMLElement
    private x:number
    private y:number
        
    constructor() {
        

        this.ship = document.createElement("ship")
        let foreground = document.getElementsByTagName("foreground")[0]

        foreground.appendChild(this.ship)

        this.x = 3000 - this.getRectangle().width
        this.y = 720 - this.getRectangle().height
    }

    public scrollLeft(pos:number){
        this.x+=pos
    }

    public update():void {
        // als de bom zelf beweegt moet je dat hier updaten

        // tekenen
        this.ship.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.ship.getBoundingClientRect()
    }

}