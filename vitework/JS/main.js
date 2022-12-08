import { getJoke, getCompatability, getQuote } from "./api.js";
const DOM = {
  root: document.documentElement,
  character: document.getElementById("character"),
  mommy: document.getElementById("mommy"),
};
let mousePos = { X: 0, Y: 0 };
let time = new Date().getTime();
let mommySize = { X: 200, Y: 0 };
let speed = mommySize.X / 3.5;
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
  if (Math.abs(deltaX + deltaY) >= speed / 32) {
    let data = Math.atan(deltaY / deltaX);
    deltaX = Math.cos(data) * speed * Math.sign(deltaX) * deltaTime;
    deltaY = Math.sin(data) * speed * Math.sign(deltaX) * deltaTime;
    console.log(speed);
    DOM.root.style.setProperty("--Xpos", `${currentPos.X + deltaX}px`);
    DOM.root.style.setProperty("--Ypos", `${currentPos.Y + deltaY}px`);
  } else {
    DOM.root.style.setProperty("--Xpos", `${mousePos.X}px`);
    DOM.root.style.setProperty("--Ypos", `${mousePos.Y}px`);
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
  speed = mommySize.X / 3.5;
}
window.addEventListener("resize", newSize);
newSize();
