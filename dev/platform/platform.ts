class Platform{

    private div: HTMLElement
    private x: number
    private y: number

    constructor(x:number, y:number){
        this.x = x
        this.y = y

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