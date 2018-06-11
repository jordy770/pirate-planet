class End {

    private assignmentbtn : HTMLElement
    private assignmentmodal : HTMLElement
    private assignmenttext1 : HTMLElement
    private assignmenttext2 : HTMLElement
    private planetswrong : HTMLElement
    private planetsright : HTMLElement
    private textcontainer1 : HTMLElement
    private textcontainer2 : HTMLElement

    constructor() {
         // get container
        let foreground = document.getElementsByTagName("foreground")[0]

        // Create elements
        this.assignmentmodal = document.createElement("assignmentmodal")
        this.assignmenttext1 = document.createElement("assignmenttext")
        this.assignmenttext2 = document.createElement("assignmenttext")
        this.assignmentbtn = document.createElement("assignmentbtn")
        this.textcontainer1 = document.createElement("textcontainer1")
        this.planetswrong = document.createElement("planetswrong")
        this.textcontainer2 = document.createElement("textcontainer2")
        this.planetsright = document.createElement("planetsright")
        
        //create empty spaces
        for(let i = 0; i < 8; i++){ 
            let emptySpace = document.createElement("planetcontainer")
            this.planetsright.appendChild(emptySpace)      
        }

        // Append elements
        foreground.appendChild(this.assignmentmodal)
        this.assignmentmodal.appendChild(this.assignmentbtn)
        this.assignmentmodal.appendChild(this.planetswrong)
        this.assignmentmodal.appendChild(this.planetsright)
        this.assignmentmodal.appendChild(this.textcontainer1)
        this.assignmentmodal.appendChild(this.textcontainer2)

        this.textcontainer1.appendChild(this.assignmenttext1)
        this.textcontainer2.appendChild(this.assignmenttext2)

        let aarde = new PlanetContainer("Aarde", "../docs/images/aarde.png")
        let jupiter = new PlanetContainer("Jupiter", "../docs/images/jupiter.png")
        let mars = new PlanetContainer("Mars", "../docs/images/mars.png")
        let mercurius = new PlanetContainer("Mercurius", "../docs/images/mercurius.png")
        let neptunus = new PlanetContainer("Neptunus", "../docs/images/neptunus.png")
        let saturnus = new PlanetContainer("Saturnus", "../docs/images/saturnus.png")
        let uranus = new PlanetContainer("Uranus", "../docs/images/uranus.png")
        let venus = new PlanetContainer("Uranus", "../docs/images/venus.png")

        this.assignmentbtn.innerHTML = "CHECK"
        this.assignmenttext1.innerHTML = "Zet de planeten in de goede volgorde van het zonnestelsel."
        this.assignmenttext2.innerHTML = "Klik op een planeet en verschuif hem naar een vakje."
    }
}