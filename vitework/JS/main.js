import { getJoke, getCompatability, getQuote } from "./api.js";
const DOM = {
  root: document.documentElement,
  character: document.getElementById("character"),
  mommy: document.getElementById("mommy"),
};
let mousePos = { X: 0, Y: 0 };
let time = new Date().getTime();
let mommySize = { X: 200, Y: 0 };
let charsize = 0
let speed = mommySize.X / 3.5;
function M(n,d) {
  return Math.max(0, Math.min(mommySize[d] - charsize,n))
}
setInterval(function () {
  let newTime = new Date().getTime();
  let deltaTime = (newTime - time) / 1000;
  time = newTime;
  let sty = getComputedStyle(DOM.root);
  let x = sty.getPropertyValue("--Xpos");
  let y = sty.getPropertyValue("--Ypos");
  let currentPos = {
    X: Number(x.substring(0, x.length - 2)) || 0,
    Y: Number(y.substring(0, y.length - 2)) || 0,
  };
  let deltaX = mousePos.X - currentPos.X;
  let deltaY = mousePos.Y - currentPos.Y;
  if (Math.sqrt(deltaX**2 + deltaY**2) >= speed / 65) {
    let data = Math.atan(deltaY / deltaX);
    deltaX = Math.cos(data) * speed * Math.sign(deltaX) * deltaTime;
    deltaY = Math.sin(data) * speed * Math.sign(deltaX) * deltaTime;
    console.log(speed);
    DOM.root.style.setProperty("--Xpos", `${M(currentPos.X + deltaX,"X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(currentPos.Y + deltaY,"Y")}px`);
  } else {
    DOM.root.style.setProperty("--Xpos", `${M(mousePos.X,"X")}px`);
    DOM.root.style.setProperty("--Ypos", `${M(mousePos.Y,"Y")}px`);
  }
}, 33);

window.addEventListener("mousemove", function (event) {
  let X = event.clientX;
  let Y = event.clientY;
  let mamaStuff = DOM.mommy.getBoundingClientRect();
  mousePos.X = Number(X) - Number(mamaStuff.left);
  mousePos.Y = Number(Y) - Number(mamaStuff.top);
});

function newSize() {
  let mamaStuff = DOM.mommy.getBoundingClientRect();
  mommySize = {
    X: Number(mamaStuff.right) - Number(mamaStuff.left),
    Y: Number(mamaStuff.bottom) - Number(mamaStuff.top),
  };
  charsize = mommySize.X/20
  speed = mommySize.X / 3.5;
}
window.addEventListener("resize", newSize);
newSize();
