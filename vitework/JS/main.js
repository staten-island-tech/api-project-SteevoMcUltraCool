import {getJoke, getCompatability, getQuote} from "./api.js"
const DOM = {
 root: document.documentElement,
 character: document.getElementById("character"),
 mommy: document.getElementById("mommy")
}
let mousePos = {X:0, Y:0}
let time = (new Date()).getTime()
let speed = 20
setInterval(function() {
    let newTime = (new Date()).getTime()
    let deltaTime = (newTime - time)/1000
    time = newTime
    let sty = getComputedStyle(DOM.root)
    let x = sty.getPropertyValue("--Xpos")
    let y = sty.getPropertyValue("--Ypos")
    let currentPos = {X:(Number(x.substring(0,x.length-3))||0) , Y:(Number(y.substring(0,y.length-3))||0)}
    let deltaX =  (mousePos.X - currentPos.X)
    let deltaY = (mousePos.Y - currentPos.Y)
    let data = Math.atan(deltaY/deltaX)
    deltaX = Math.cos(data) * speed
    deltaY = Math.sin(data) * speed
    console.log(deltaY)
    DOM.root.style.setProperty("--Xpos", `${currentPos.X + deltaX*deltaTime}px`)
    DOM.root.style.setProperty("--Ypos", `${currentPos.Y + deltaY*deltaTime}px`)
}
, 33)

window.addEventListener("mousemove", function(event) {
    let X = event.clientX
    let Y = event.clientY
    let mamaStuff = DOM.mommy.getBoundingClientRect()
    mousePos.X =  Number(X) - Number(mamaStuff.left)
    mousePos.Y = Number(Y) - Number(mamaStuff.top)
})

