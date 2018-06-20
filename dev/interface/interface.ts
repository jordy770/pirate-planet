class Interface {
    private game : Game
    private planetscontainer : HTMLElement

    constructor(g:Game, currentPlanet : number) {
        this.game = g

        let foreground = document.getElementsByTagName("foreground")[0]
        this.planetscontainer = document.createElement("planetscontainer")
        foreground.appendChild(this.planetscontainer)

        let mercurius = new PlanetContainer(currentPlanet, 8)
        let venus = new PlanetContainer(currentPlanet, 7)       
        let aarde = new PlanetContainer(currentPlanet, 1)
        let mars = new PlanetContainer(currentPlanet, 2)
        let jupiter = new PlanetContainer(currentPlanet, 3)
        let saturnus = new PlanetContainer(currentPlanet, 4)
        let uranus = new PlanetContainer(currentPlanet, 5) 
        let neptunus = new PlanetContainer(currentPlanet, 6)

        if (currentPlanet != 8){
            this.planetscontainer.style.marginTop = "0px"
            this.planetscontainer.style.left = "320px"
            this.planetscontainer.style.backgroundImage = "none"
        }
    }
}