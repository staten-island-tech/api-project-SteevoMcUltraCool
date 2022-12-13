let promptArray = [];

class p {
  constructor(DOMME, header, query, keybinds) {
    this.element = DOMME;
    this.state = "off";
    this.display = DOMME.style;
    this.display.visibility = "hidden";
    this.element.classList.add("prompt")
    this.headerElement = document.createElement("h1");
    this.textElement = document.createElement("p");
    this.headerElement.innerHTML = header;
    this.element.appendChild(this.headerElement);
    this.element.appendChild(this.textElement);
    this.promptText = query;
    keybinds = keybinds || {}
    this.yesKey = keybinds.Yes || "Y";
    this.noKey = keybinds.No || "N";
    promptArray.push(this);
  }
  setProcedure(typeProcedure, procedure) {
    if (typeProcedure == "initiate") {
      this.initiateProcedure = procedure;
    } else if (typeProcedure == "accepted") {
      this.acceptedProcedure = procedure;
    } else if (typeProcedure == "denied") {
      this.deniedProcedure = procedure;
    } else if (typeProcedure == "reset") {
      this.resetProcedure = procedure;
    } else if (typeProcedure == "setDefault") {
      let values = procedure();
      this.initiateProcedure = function () {
        if (this.state != "disabled" && this.state !="initiated"){
          this.state = "pendingInitiation";
          this.display.visibility = "visible"
          this.displayText(this.promptText, 0.033, true);
          this.state = "initiated";
        }
      };
      this.acceptedProcedure = function () {
        if (!this.state != "disabled") {
          this.state = "pendingAccepted";
          this.displayText(values[0] || values.acceptedText, 0.033, true);
          this.state = "accepted";
        }
      };
      this.deniedProcedure = function () {
        if (this.state != "disabled") {
          this.state = "pendingDenied";
          this.displayText(values[1] || values.deniedText, 0.033, true);
          this.state = "denied";
        }
      };
      this.resetProcedure = function () {
        if (!this.state != "disabled") {
          this.state = "pendingReset";
          this.display.visibility = "hidden";
          this.state = "off";
        }
      };
    }
  }
  displayText(string, speed, erase) {
    speed = speed || 0.133;
    if (erase) {
      this.textElement.innerHTML = "";
    }
    let sum = string.length;
    let count = 0;
    let big = setInterval(function (eta) {
        console.log(count)
        count = count + 1
        if (eta.state != "off") {
          eta.textElement.innerHTML = string.substring(0, count);
        } else {
          count = sum + 100;
        }
        if (count > sum){
         clearInterval(big)
        }
      },  speed * 1000, this);
  }
}
function promptKeydownListener(event) {
  let key = event.Key;
  let activePrompts = promptArray.filter(
    (prompt) => (prompt.state = "initiated")
  );
  activePrompts.forEach((prompt) => {
    if ((key = prompt.yesKey)) {
      prompt.acceptedProcedure("key");
    } else if ((key = prompt.noKey)) {
      prompt.deniedProcedure("key");
    }
  });
}

export let Prompt = p,
  passiveRUN = promptKeydownListener;
