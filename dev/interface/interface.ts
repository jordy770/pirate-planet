class Interface {
    private game : Game
    private interface : HTMLElement

    constructor(g:Game, currentPlanet : number) {
        this.game = g

        let foreground = document.getElementsByTagName("foreground")[0]
        this.interface = document.createElement("interface")
        foreground.appendChild(this.interface)

        let mercurius = new PlanetContainer("interface", currentPlanet, "Mercurius", "../docs/images/mercurius.png")
        let venus = new PlanetContainer("interface", currentPlanet, "Venus", "../docs/images/venus.png")       
        let aarde = new PlanetContainer("interface", currentPlanet, "Aarde", "../docs/images/aarde.png")
        let mars = new PlanetContainer("interface", currentPlanet, "Mars", "../docs/images/mars.png")
        let jupiter = new PlanetContainer("interface", currentPlanet, "Jupiter", "../docs/images/jupiter.png")
        let saturnus = new PlanetContainer("interface", currentPlanet, "Saturnus", "../docs/images/saturnus.png")
        let uranus = new PlanetContainer("interface", currentPlanet, "Uranus", "../docs/images/uranus.png") 
        let neptunus = new PlanetContainer("interface", currentPlanet, "Neptunus", "../docs/images/neptunus.png")

    }
}