let promptArray = []

class p { 
  constructor(DOMME, header, query, keybinds){
    this.element = DOMME
    this.state = "disabled"
    this.display = DOMME.style
    this.display.display = "none"
    this.element.class = "prompt"
    this.headerElement = document.createElement("h1")
    this.textElement = document.createElement("p")
    this.headerElement.innerHTML = header
    this.element.appendChild(this.headerElement)
    this.element.appendChild(this.textElement)
    this.promptText = query
    this.yesKey = keybinds.Yes || "Y"
    this.noKey = keybinds.No || "N"
    promptArray.push(this)
  }
  setProcedure(typeProcedure, procedure){
    if (typeProcedure == "initiate"){
       this.initiateProcedure = procedure
    }else if (typeProcedure=="accepted"){
      this.acceptedProcedure = procedure
    }else if (typeProcedure=="denied"){
      this.deniedProcedure = procedure 
    }else if(typeProcedure=="reset"){
      this.resetProcedure = procedure
    }else if (typeProcedure=="setDefault"){
      let values = procedure()
      this.initiateProcedure = function(){
        if (!this.state="disabled") {
        this.state = "pendingInitiation"
        this.display.display = "inline"
        this.displayText(values[1]|| values.initiateText,0.033, true)
        this.state = "initiated"
        }
      }
      this.acceptedProcedure = function(){
        if (!this.state="disabled") {
        this.state= "pendingAccepted"
        this.displayText(values[2] || values.acceptedText, 0.033, true)
        this.state = "accepted"
        }
      }
      this.deniedProcedure = function(){
        if (!this.state="disabled") {
        this.state= "pendingDenied"
        this.displayText(values[3] || values.deniedText, 0.033, true)
        this.state = "denied"    
        }
      }
      this.resetProcedure = function(){
        if (!this.state="disabled") {
        this.state = "pendingReset"
        this.display.display = "none"
        this.state = "off"
        }
      }
      this.state="off"
    }
  }
  displayText(string, speed, erase){
    speed = speed || 0.033
    if (erase){
      this.textElement.innerHTML = ""
    }
    let sum = string.length
    let count = 0
    do {
      count=count+1
      setTimeout(function(){
        if (this.state !="off"){
          this.textElement.innerHTML = string.sub(0,count)
       }else {
        count = sum + 100
       }
      },count*speed*1000)
    }while(count<sum)
  }
  }
}
function promptKeydownListener(event){
  let key = event.Key
  let activePrompts = promptArray.filter((prompt)=>prompt.state="initiated")
  activePrompts.forEach((prompt)=>{
    if (key=prompt.yesKey){
      prompt.acceptedProcedure()
    }else if (key= prompt.noKey) {
      prompt.deniedProcedure()
    }
  })
}

export let prompt = p, passiveRUN = promptKeydownListener
