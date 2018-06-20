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
    private currentLevel : number
    private planets: Array<string> = ["", "Aarde", "Mars", "Jupiter", "Saturnus", "Uranus", "Neptunus", "Venus", "Mercurius"];
    private planet:string
    private index:number
    private container:Element

    constructor(currentLevel : number, index : number) {
        this.currentLevel = currentLevel
        this.planet = this.planets[index]

        this.container = document.getElementsByTagName("planetscontainer")[0]

        this.planetContainer = document.createElement("planetcontainer")
        this.container.appendChild(this.planetContainer)   

        this.image = document.createElement("planetimg")
        let source =  "../docs/images/"+this.planet.toLowerCase()+".png"
        this.image.style.backgroundImage = "url("+ source +")";

        this.text = document.createElement("planetname")
        this.text.innerHTML = this.planets[index]

        this.index = index

        this.planetContainer.appendChild(this.image)
        this.planetContainer.appendChild(this.text)


        if(this.currentLevel == 8){
            this.planetContainer.addEventListener("click", (e) => this.clickedPlanet(e))
        } else {
            this.planetContainer.style.border = "none"
            this.planetContainer.style.opacity = "0.5"

            if(this.planets[this.currentLevel] == this.planet){
            this.planetContainer.style.opacity = "1.0"
            }          
        }
    }

    private clickedPlanet(e:Event) {
     
        this.container.insertBefore(this.planetContainer, this.container.firstChild)
    }
}