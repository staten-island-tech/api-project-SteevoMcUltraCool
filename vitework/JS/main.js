import { getJoke, getCompatability, getQuote } from "./api.js";
import { Vector, Box } from "./vector";

const DOM = {
  root: document.documentElement,
  character: document.getElementById("character"),
  mommy: document.getElementById("mommy"),
  ball: document.getElementById("ball"),
  wiseMan: document.getElementById("wise")
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
let inprompt = false;
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
    console.log(speed);
    DOM.root.style.setProperty("--Xpos", `${M(currentPos.X + deltaX, "X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(currentPos.Y + deltaY, "Y")}px`);
  } else {
    DOM.root.style.setProperty("--Xpos", `${M(mousePos.X, "X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(mousePos.Y, "Y")}px`);
  }
  let charstate = DOM.character.getBoundingClientRect();
  charbox = new Box(new Vector(charstate.left,charstate.top),new Vector(charstate.right,charstate.bottom));
  if (charbox.overlapsBox(wisdombox)){
    await prompt("wisdom")
  
  }else if (charbox.overlapsBox(fortunebox)){
    await prompt("fortune")
  }else{
    unprompt()
  }
}, 100);
async function prompt(query){
  if (!inprompt){
    inprompt = true
    if (query=="wisdom"){
    alert(await getQuote())
    }else if (query=="fortune"){
      alert(await getCompatability("Steve","Stela"))
    }
  }
}
function unprompt(){
  inprompt = false
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
  let wisdomStuff = DOM.wiseMan.getBoundingClientRect()
  wisdombox = new Box(new Vector(wisdomStuff.left,wisdomStuff.top),new Vector(wisdomStuff.right,wisdomStuff.bottom))
  let fortuneStuff = DOM.ball.getBoundingClientRect()
  fortunebox = new Box(new Vector(fortuneStuff.left,fortuneStuff.top),new Vector(fortuneStuff.right,fortuneStuff.bottom))
}
window.addEventListener("resize", newSize);
newSize();
