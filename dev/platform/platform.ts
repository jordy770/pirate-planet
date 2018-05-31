class Platform{

    private div: HTMLElement
    private x: number = 500
    private y: number = 500

    constructor(){
        this.div = document.createElement("platform")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.div)

    }

    public scrollLeft(pos:number){
        this.x+=pos
    }

    public update(): void{
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }

}