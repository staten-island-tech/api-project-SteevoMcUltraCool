import { getJoke, getFortune, getQuote } from "./api.js";
import { Vector, Box } from "./vector.js";
import { Prompt, passiveRUN } from "./prompt.js";
window.addEventListener("keydown", passiveRUN);
const DOM = {
  root: document.documentElement,
  character: document.getElementById("character"),
  mommy: document.getElementById("mommy"),
  ball: document.getElementById("ball"),
  wiseMan: document.getElementById("wise"),
  jokst: document.getElementById("jokst"),
  playBu: document.getElementById("playBu"),
  wiseText: document.getElementById("wiseText"),
  ballText: document.getElementById("ballText"),
  jokeText: document.getElementById("jokeText"),
  playText: document.getElementById("playText"),
  ballbb: document.getElementById("fortune"),
  wiseManbb: document.getElementById("wisdom"),
  jokstbb: document.getElementById("joker"),
  playBubb: document.getElementById("play"),
};
let mousePos = new Vector(0, 0);
let time = new Date().getTime();
let mommySize = new Vector(200, 200);
let charsize = 0;
let speed = mommySize.X / 3.5;
function M(n, d) {
  return Math.max(0, Math.min(mommySize[d] - charsize, n));
}
let charbox = {};
let wisdombox = {};
let fortunebox = {};
let jokstbox = {};
let playbox = {};
let inprompt = false;
let WisePrompt = new Prompt( DOM.wiseText,"Wise Man","Would you like a quote of immense knowledge? (y/n)");
WisePrompt.setProcedure("setDefault", function () {
  return ["Awesome!", "Awwh"];
});
WisePrompt.setProcedure("accepted", async function (eta) {
  if (eta.state == "initiated") {
    console.log(eta.state)
    eta.state = "pendingAccepted";
    eta.displayText("Awesome!", 0.033, true);
    await new Promise((x) => setTimeout(x, 200));
    let quote = await getQuote()
    await new Promise((x) => setTimeout(x,eta.displayText((quote).toString(), 0.033)));
    if (eta.state=="pendingAccepted"){
      eta.state = "accepted";
    }
  }
});
let BallPrompt = new Prompt(DOM.ballText,"Fortune Ball","Care to venture into the unknown? (y/n)");
BallPrompt.setProcedure("setDefault", function () {
  return ["Hmm...", "Awwh"];
});
BallPrompt.setProcedure("accepted", async function (eta) {
  if (eta.state == "initiated") {
    eta.state = "pendingAccepted";
    eta.displayText("Hmm...", 0.033, true);
    await new Promise((x) => setTimeout(x, 200));
    let quote = await getFortune()
    await new Promise((x) => setTimeout(x,eta.displayText((quote).toString(), 0.033)));
    if (eta.state=="pendingAccepted"){
      eta.state = "accepted";
    }
  }
});
let JokePrompt = new Prompt(DOM.jokeText,"The Jester","Bet i can turn that frown around... care for a joke? (y/n)");
JokePrompt.setProcedure("setDefault", function () {
  return ["Mwehehe", "The real joke's on you!"];
});
JokePrompt.setProcedure("accepted", async function (eta) {
  if (eta.state == "initiated") {
    eta.state = "pendingAccepted";
    eta.displayText("Mwehehe", 0.033, true);
    await new Promise((x) => setTimeout(x, 200));
    let quote = await getJoke()
    await new Promise((x) => setTimeout(x,eta.displayText(quote, 0.033)));
    if (eta.state=="pendingAccepted"){
      eta.state = "accepted";
    }
  }
});
let PlayPrompt = new Prompt(DOM.playText,"Game On!","Ready to play a game? (y/n)");
PlayPrompt.setProcedure("setDefault", function () {
  return ["let's go!", "The real joke's on you!"];
});
function startGame(){
  console.log("shi")
  DOM.jokstbb.style.bottom = `-100%`
  DOM.wiseManbb.style.left = `-100%`
  DOM.playBubb.style.top = `-100%`
  DOM.ballbb.style.right = `-100%`
}
PlayPrompt.setProcedure("accepted", async function (eta) {
  if (eta.state == "initiated") {
    eta.state = "pendingAccepted";
    startGame()
    await new Promise((x) => setTimeout(x,1));
    if (eta.state=="pendingAccepted"){
      eta.state = "accepted";
    }
  }
});
setInterval(async function () {
  let newTime = new Date().getTime();
  let deltaTime = (newTime - time) / 1000;
  time = newTime;
  let sty = getComputedStyle(DOM.root);
  let x = sty.getPropertyValue("--Xpos");
  let y = sty.getPropertyValue("--Ypos");
  let currentPos = new Vector(
    Number(x.substring(0, x.length - 2)) || 0,
    Number(y.substring(0, y.length - 2)) || 0
  );
  let deltaX = mousePos.X - currentPos.X;
  let deltaY = mousePos.Y - currentPos.Y;
  if (Math.sqrt(deltaX ** 2 + deltaY ** 2) >= speed / 11) {
    let data = Math.atan(deltaY / deltaX);
    deltaX = Math.cos(data) * speed * Math.sign(deltaX) * deltaTime;
    deltaY = Math.sin(data) * speed * Math.sign(deltaX) * deltaTime;
    DOM.root.style.setProperty("--Xpos", `${M(currentPos.X + deltaX, "X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(currentPos.Y + deltaY, "Y")}px`);
  } else {
    DOM.root.style.setProperty("--Xpos", `${M(mousePos.X, "X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(mousePos.Y, "Y")}px`);
  }
  let charstate = DOM.character.getBoundingClientRect();
  charbox = new Box(
    new Vector(charstate.left, charstate.top),
    new Vector(charstate.right, charstate.bottom)
  );
  if (charbox.overlapsBox(wisdombox)) {
    if (!inprompt) {
      inprompt = true;
      WisePrompt.initiateProcedure();
    }
  } else if (charbox.overlapsBox(fortunebox)) {
    if (!inprompt) {
      inprompt = true;
      BallPrompt.initiateProcedure();
    }
  } else if (charbox.overlapsBox(jokstbox)) {
    if (!inprompt) {
      inprompt = true;
      JokePrompt.initiateProcedure();
    }
  } else if (charbox.overlapsBox(playbox)) {
    if (!inprompt) {
      inprompt = true;
      PlayPrompt.initiateProcedure();
    }
  }else {
    unprompt();
  }
}, 100);

function unprompt() {
  inprompt = false;
  WisePrompt.resetProcedure();
  BallPrompt.resetProcedure();
  JokePrompt.resetProcedure();
  PlayPrompt.resetProcedure()

  
}
window.addEventListener("mousemove", function (event) {
  let X = event.clientX;
  let Y = event.clientY;
  let mamaStuff = DOM.mommy.getBoundingClientRect();
  mousePos.X = Number(X) - Number(mamaStuff.left);
  mousePos.Y = Number(Y) - Number(mamaStuff.top);
});

function newSize() {
  let mamaStuff = DOM.mommy.getBoundingClientRect();
  mommySize = new Vector(
    Number(mamaStuff.right) - Number(mamaStuff.left),
    Number(mamaStuff.bottom) - Number(mamaStuff.top)
  );
  charsize = mommySize.X / 20;
  speed = mommySize.X / 3.5;
  let wisdomStuff = DOM.wiseMan.getBoundingClientRect();
  wisdombox = new Box(
    new Vector(wisdomStuff.left, wisdomStuff.top),
    new Vector(wisdomStuff.right, wisdomStuff.bottom)
  );
  let fortuneStuff = DOM.ball.getBoundingClientRect();
  fortunebox = new Box(
    new Vector(fortuneStuff.left, fortuneStuff.top),
    new Vector(fortuneStuff.right, fortuneStuff.bottom)
  );
  let jokststuff = DOM.jokst.getBoundingClientRect();
  jokstbox = new Box(
    new Vector(jokststuff.left, jokststuff.top),
    new Vector(jokststuff.right, jokststuff.bottom)
  );
  let playStuff = DOM.playBu.getBoundingClientRect();
  playbox = new Box(
    new Vector(playStuff.left, playStuff.top),
    new Vector(playStuff.right, playStuff.bottom)
  );
}
window.addEventListener("resize", newSize);
newSize();
