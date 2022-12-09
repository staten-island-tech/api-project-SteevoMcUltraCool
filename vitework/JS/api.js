
async function gtJoke() {
    try {
        let joke = await fetch("https://icanhazdadjoke.com/",{
            method: 'GET', 
            headers: {
              'Accept': 'application/json ',
            }
        })
        return (await joke.json()).joke
    }catch(er) {
        console.log(er)
    }
}
class Quote {
    constructor(quote,author){
        this.quote = quote
        this.author = author
    }
    toString(){
        return `"${this.quote}" -${this.author}`
    }
}
async function gtCompatability(name,lover) {
    try {
        let compatibility = await fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${lover}&fname=${name}`,{
            method: 'GET', 
            headers: {
                'X-RapidAPI-Key': '82720bd7d6msh2d19c07fd7db3ddp1297f3jsn24bf33fef3b4',
                'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'            }
        })
        let comp = (await compatibility.json())
        return new Quote(comp.result, comp.percentage)
    }catch(er) {
        console.log(er)
    }
}

async function gtQuote() {
    try {
        let compatibility = await fetch("https://api.quotable.io/random")
        let comp = (await compatibility.json())
        return new Quote(comp.content, comp.author)
    }catch(er) {
        console.log(er)
    }
}
console.log("a new beginning")
export let getJoke = gtJoke,  getCompatability = gtCompatability, getQuote = gtQuote 

