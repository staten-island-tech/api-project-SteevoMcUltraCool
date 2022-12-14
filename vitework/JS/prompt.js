let promptArray = [];

class p {
  constructor(DOMME, header, query, keybinds) {
    this.element = DOMME;
    this.state = "off";
    this.display = DOMME.style;
    this.display.visibility = "hidden";
    this.element.classList.add("prompt");
    this.headerElement = document.createElement("h1");
    this.textElement = document.createElement("p");
    this.headerElement.innerHTML = header;
    this.element.appendChild(this.headerElement);
    this.element.appendChild(this.textElement);
    this.promptText = query;
    keybinds = keybinds || {};
    this.yesKey = keybinds.Yes || "y";
    this.noKey = keybinds.No || "n";
    this.resetKey = keybinds.Reset || "unbinded";
    this.doubleYesReset = true;
    promptArray.push(this);
  }
  setProcedure(typeProcedure, procedure) {
    if (typeProcedure == "initiate") {
      this.initiateProcedure = function() {procedure(this)};
    } else if (typeProcedure == "accepted") {
      this.acceptedProcedure = function() {procedure(this)};
    } else if (typeProcedure == "denied") {
      this.deniedProcedure = function() {procedure(this)};
    } else if (typeProcedure == "reset") {
      this.resetProcedure = function() {procedure(this)};
    } else if (typeProcedure == "setDefault") {
      let values = procedure();
      this.initiateProcedure = async function () {
        if (this.state != "disabled" && this.state != "initiated") {
          this.state = "pendingInitiation";
          this.display.visibility = "visible";
          await new Promise(r => setTimeout(r, this.displayText(this.promptText, 0.033, true)));
          if (this.state == "pendingInitiation"){
            this.state = "initiated";
          }
          console.log(this.state)
        }
      };
      this.acceptedProcedure = async function (reason) {
        if (this.state == "initiated") {
          this.state = "pendingAccepted";
          await new Promise(r => setTimeout(r, this.displayText(reason || values[0] || values.acceptedText, 0.033, true)));
          this.state = "accepted";
        }
      };
      this.deniedProcedure = async function (reason) {
        if (this.state == "initiated") {
          this.state = "pendingDenied";
          await new Promise(r => setTimeout(r, this.displayText(reason || values[1] || values.deniedText, 0.033, true)));
          this.state = "denied";
        }
      };
      this.resetProcedure = function () {
        if (this.state != "disabled") {
          this.state = "pendingReset";
          this.display.visibility = "hidden";
          this.state = "off";
        }
      };
    }
  }
  displayText(string, speed, erase) {
    speed = speed || 0.033;
    if (erase) {
      this.textElement.innerHTML = "";
    }
    let sum = string.length;
    let count = 0;
    let IS = this.state
    let big = setInterval(
      function (eta) {
        count = count + 1;
        if (eta.state == IS) {
          eta.textElement.innerHTML = string.substring(0, count);
        } else {
          count = sum + 100;
        }
        if (count > sum) {
          clearInterval(big);
        }
      },
      speed * 1000,
      this
    );
    return (speed * 1000 * sum)
  }
}
function promptKeydownListener(event) {
  let key = event.key;
  let activePrompts = promptArray.filter(
    (prompt) => (prompt.state == "initiated")
  );
  activePrompts.forEach((prompt) => {
    if ((key == prompt.yesKey)) {
      prompt.acceptedProcedure(false);
    } else if ((key == prompt.noKey)) {
      console.log(prompt.deniedProcedure);
      prompt.deniedProcedure(false);
    }
  });
  let acceptedPrompts = promptArray.filter(
    (prompt) => (prompt.state == "accepted" && prompt.doubleYesReset)
  );
  acceptedPrompts.forEach((prompt) => {
    if ((key == prompt.yesKey)) {
      prompt.initiateProcedure();
    } 
  });
}

export let Prompt = p,
  passiveRUN = promptKeydownListener;
