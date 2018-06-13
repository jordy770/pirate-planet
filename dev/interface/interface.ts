class Interface {
    private game : Game
    private planetscontainer : HTMLElement

    constructor(g:Game, currentPlanet : number) {
        this.game = g

        let foreground = document.getElementsByTagName("foreground")[0]
        this.planetscontainer = document.createElement("planetscontainer")
        foreground.appendChild(this.planetscontainer)

        let mercurius = new PlanetContainer(currentPlanet, "Mercurius", "../docs/images/mercurius.png")
        let venus = new PlanetContainer(currentPlanet, "Venus", "../docs/images/venus.png")       
        let aarde = new PlanetContainer(currentPlanet, "Aarde", "../docs/images/aarde.png")
        let mars = new PlanetContainer(currentPlanet, "Mars", "../docs/images/mars.png")
        let jupiter = new PlanetContainer(currentPlanet, "Jupiter", "../docs/images/jupiter.png")
        let saturnus = new PlanetContainer(currentPlanet, "Saturnus", "../docs/images/saturnus.png")
        let uranus = new PlanetContainer(currentPlanet, "Uranus", "../docs/images/uranus.png") 
        let neptunus = new PlanetContainer(currentPlanet, "Neptunus", "../docs/images/neptunus.png")

        if (currentPlanet != 8){
            this.planetscontainer.style.marginTop = "0px"
            this.planetscontainer.style.left = "320px"
            this.planetscontainer.style.backgroundImage = "none"
        }
    }
}