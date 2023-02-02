import { getRadioButtonValue, getJoke, objectToString } from "./functions.js";
const DOM = {
    getJokeBu: document.getElementById("getJokeBu"),
    setup: document.getElementById("setup"),
    punchline: document.getElementById("punchline"),
    left: document.getElementById("left"),
    right: document.getElementById("right"),
    flagbus: document.querySelectorAll(".flag"),
    submitBu: document.getElementById("submit"),
    miniSetup: document.getElementById("miniSetup"),
    miniPunchline: document.getElementById("miniPunchline")
}
let flags = {
    nsfw: false,
    religious: false,
    political: false,
    racist:false,
    sexist:false
}
let jokes = [] // {type:"single, twopart" joke:[setup/joke,delivery]}
let atJoke = 0
DOM.flagbus.forEach(button => {
    button.addEventListener("click",function(){
        flags[button.id] = ! flags[button.id]
        console.log(flags)
    })
})
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

getJokeBu.addEventListener("click",async function(){
    let joke = await getJoke()
    jokes.push(joke)
    atJoke = jokes.length - 1
    displayJoke(joke,true)
})

DOM.left.addEventListener("click",function(){
    atJoke = Math.max(atJoke-1, 0)
    displayJoke(jokes[atJoke],true)
})
DOM.right.addEventListener("click",async function(){
    atJoke = atJoke+1
    if (atJoke >jokes.length - 1){
        let joke = await getJoke()
        jokes.push(joke)
        atJoke = jokes.length - 1
        displayJoke(joke,true)
    }else{
        displayJoke(jokes[atJoke],true)
    }
})
DOM.submitBu.addEventListener("click", function(){
    let setup = DOM.miniSetup.value
    let punchline = DOM.miniPunchline.value
})
