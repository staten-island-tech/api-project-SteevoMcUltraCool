import { getRadioButtonValue, getJoke, objectToString } from "./functions.js";
const DOM = {
<<<<<<< HEAD
    getJokeBu: document.getElementById("getJokeBu"),
    setup: document.getElementById("setup"),
    punchline: document.getElementById("punchline"),
    left: document.getElementById("left"),
    right: document.getElementById("right"),
=======
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
  return Math.max(0, Math.min(mommySize[d] - charsize + mommySize.X / 40, n));
>>>>>>> b7582fa7c98c481cf72a169146109f12e605a5c4
}
let flags = {}
let jokes = [] // {type:"single, twopart" joke:[setup/joke,delivery]}
let atJoke = 0
function displayJoke(joke,hidden){
    if (joke.type == "single"){
        DOM.setup.innerHTML = joke.joke[0]
        DOM.punchline.innerHTML = ""
    }else {
        DOM.setup.innerHTML = joke.joke[0]
        DOM.punchline.innerHTML = ""
            if (hidden) {
                let button = document.createElement("button")
                button.innerHTML = "Reveal Punchline"
                button.addEventListener("click",function(){
                    DOM.punchline.innerHTML = joke.joke[1] 
                })
                DOM.punchline.appendChild(button)
            }else {
                DOM.punchline.innerHTML = joke.joke[1]
            }
    }
}
<<<<<<< HEAD
=======
function spawnCoin() {
  new Coin(DOM.mommy);
}
function startGame() {
  DOM.jokstbb.style.bottom = `-100%`;
  DOM.wiseManbb.style.left = `-100%`;
  DOM.playBubb.style.top = `-100%`;
  DOM.ballbb.style.right = `-100%`;
  let x = new Promise((resolve) => {
    let fireball = setInterval(function () {
      let f = Math.random() > 0.499 && spawnFireball();
      let ca = Math.random() > 0.888 && spawnCoin();
    }, 400);
    setTimeout(function () {
      clearInterval(fireball);
      let coins = document.querySelectorAll(".coin");
      let fireballs = document.querySelectorAll(".fireball");
      coins.forEach((coin) => coin.remove());
      fireballs.forEach((fb) => fb.remove());
    }, 30000);
    setTimeout(resolve, 30066);
  });
  x.then(endGame);
}
function endGame() {
  DOM.jokstbb.style.bottom = `0px`;
  DOM.wiseManbb.style.left = `0px`;
  DOM.playBubb.style.top = `0px`;
  DOM.ballbb.style.right = `0px`;
  unprompt();
}
PlayPrompt.setProcedure("accepted", async function (eta) {
  if (eta.state == "initiated") {
    eta.state = "pendingAccepted";
    startGame();
    await new Promise((x) => setTimeout(x, 1000));
    if (eta.state == "pendingAccepted") {
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
  if (Math.sqrt(deltaX ** 2 + deltaY ** 2) >= speed / 20) {
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
  } else {
    unprompt();
  }
  let fireballs = document.querySelectorAll(".fireball");
  fireballs.forEach((fb) => {
    let fbs = fb.getBoundingClientRect();
    let fbBox = new Box(new Vector(fbs.left, fbs.top),new Vector(fbs.right, fbs.bottom));
    console.log("2")
    if (charbox.overlapsBox(fbBox)){
      console.log("die")
      die()
    }
  });
}, 100);
function die() {
  location.reload();
}
>>>>>>> b7582fa7c98c481cf72a169146109f12e605a5c4

getJokeBu.addEventListener("click",async function(){
    let joke = await getJoke()
    jokes.push(joke)
    atJoke = jokes.length - 1
    displayJoke(joke,true)
})

DOM.left.addEventListener("click",function(){
    atJoke = Math.max(atJoke-1, 0)
    displayJoke(jokes[atJoke],false)
})
DOM.right.addEventListener("click",async function(){
    atJoke = atJoke+1
    if (atJoke >jokes.length - 1){
        let joke = await getJoke()
        jokes.push(joke)
        atJoke = jokes.length - 1
        displayJoke(joke,true)
    }else{
        displayJoke(jokes[atJoke],false)
    }
})