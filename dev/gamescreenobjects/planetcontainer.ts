class PlanetContainer {

    private image : HTMLElement
    private text : HTMLElement
    private planetContainer : HTMLElement
    private moveBind : EventListener
    private offSetX : number
    private offSetY : number
    private x : number
    private y: number
    private scale : number


    constructor(planet : string, source : string) {

        let container = document.getElementsByTagName("planetswrong")[0]

        this.planetContainer = document.createElement("planetcontainer")
        container.appendChild(this.planetContainer)   

        this.image = document.createElement("planetimg")
        this.image.style.backgroundImage = "url("+ source +")";

        this.text = document.createElement("planetname")
        this.text.innerHTML = planet

        this.planetContainer.appendChild(this.image)
        this.planetContainer.appendChild(this.text)

        this.moveBind = (e: Event) => this.update(e)

        this.planetContainer.addEventListener("mousedown", (e) => this.initDrag(e))
        this.planetContainer.addEventListener("mouseup"  , (e) => this.stopDrag(e))  
    }

    private initDrag(e: Event) : void {
        e.preventDefault()
        
        // HET ITEM HIER BOVENIN DE DOM ORDER ZETTEN, ANDERS KAN JE ONDER ANDERE ELEMENTEN SLEPEN - DAN WERKT DROP NIET
        this.planetContainer.parentElement.appendChild(this.planetContainer)     
    
        // offset verandert na elke klik op dit object
        this.offSetX = e.clientX - this.x
        this.offSetY = e.clientY - this.y  
        
        window.addEventListener("mousemove", this.moveBind)
    }

    private stopDrag(e: Event) : void {
        window.removeEventListener("mousemove", this.moveBind)
        e.preventDefault()
    }

    private update(e: Event): void {
            
        e.preventDefault()
    
        this.x = e.clientX - this.offSetX
        this.y = e.clientY - this.offSetY
    
        this.planetContainer.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")"
    }
}