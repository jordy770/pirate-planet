class End {

    private assignmentbtn : HTMLElement
    private assignmentmodal : HTMLElement
    private assignmenttext1 : HTMLElement
    private assignmenttext2 : HTMLElement
    private planetscontainer : HTMLElement
    private planetsright : HTMLElement
    private textcontainer1 : HTMLElement
    private textcontainer2 : HTMLElement
    private rightAnswer : Array<string> = ["Mercurius", "Venus", "Aarde", "Mars", "Jupiter", "Saturnus", "Uranus", "Neptunus"]

    constructor() {
         // get container
        let foreground = document.getElementsByTagName("foreground")[0]

        // Create elements
        this.assignmentmodal = document.createElement("assignmentmodal")
        this.assignmenttext1 = document.createElement("assignmenttext")
        this.assignmenttext2 = document.createElement("assignmenttext")
        this.assignmentbtn = document.createElement("assignmentbtn")
        this.textcontainer1 = document.createElement("textcontainer1")
        this.textcontainer2 = document.createElement("textcontainer2")
        this.planetscontainer = document.createElement("planetscontainer")
  

        // Append elements
        foreground.appendChild(this.assignmentmodal)
        this.assignmentmodal.appendChild(this.assignmentbtn)
        this.assignmentmodal.appendChild(this.planetscontainer)
        this.assignmentmodal.appendChild(this.textcontainer1)
        this.assignmentmodal.appendChild(this.textcontainer2)

        this.textcontainer1.appendChild(this.assignmenttext1)
        this.textcontainer2.appendChild(this.assignmenttext2)

        let aarde = new PlanetContainer(8, 1)
        let jupiter = new PlanetContainer(8,2)
        let mars = new PlanetContainer(8, 3)
        let mercurius = new PlanetContainer(8, 4)
        let neptunus = new PlanetContainer(8, 5)
        let saturnus = new PlanetContainer(8,6)
        let uranus = new PlanetContainer(8,7)
        let venus = new PlanetContainer(8, 8)

        this.assignmentbtn.innerHTML = "CHECK"
        this.assignmenttext1.innerHTML = "Zet de planeten in de juiste volgorde van het zonnestelsel. Door op een planeet te klikken wordt hij vooraan gezet!"

        this.assignmentbtn.addEventListener("click", ()=> this.checkAnswer())
    }

    private checkAnswer(){
        let planets = this.planetscontainer.getElementsByTagName("planetcontainer")       
        let answer : string[] = []   
        for (let i = 0; i<planets.length;i++){

            let name = planets[i].getElementsByTagName("planetname")[0].innerHTML
            answer[i] = name
        }

        let correctplanets : number = 0
        for (let i = 0; i<this.rightAnswer.length;i++){
            if(answer[i] == this.rightAnswer[i]){
                correctplanets++
            }
        }
        console.log("aantal goed is " + correctplanets);
        

        if(correctplanets == 8){
            this.planetscontainer.remove()
            this.assignmentbtn.remove()
            this.assignmenttext1.innerHTML = "GEWELDIG!"
            this.assignmenttext1.id = "donetitle"
            this.assignmentmodal.style.backgroundImage = "url(../docs/images/finalbg.jpg)" 
            this.assignmentmodal.style.backgroundRepeat = "no-repeat" 
            this.assignmentmodal.style.backgroundSize = "cover" 
            this.assignmentmodal.style.backgroundPosition = "center" 


            this.assignmenttext2.innerHTML = "Je hebt de schat gevonden en het slot gekraakt! Je hebt alle planeten goed geplaatst en kent het zonnestelsel nu van buiten! <br><br>Gefeliciteerd!"

        }else{
            this.planetscontainer.style.border = "2px solid red"
            this.assignmenttext2.innerHTML = "Je hebt " + correctplanets + " planeten goed geplaatst in het zonnestelsel!"
        }
        console.log("Userinput: " + answer)
        console.log("Correct answer " + this.rightAnswer)
    }
}