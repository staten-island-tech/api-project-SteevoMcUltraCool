
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

let fortunes = [
    "I can only see sadness in your future.", "Now is the time to act on your strongest desire.", "It might be best to take a break.", "You will lead a happy life.", "A great truth will be revealed to you.",
    "Sometimes things don't work out... and that's okay. Keep trying!", "You will have a lucky experience at a great cost.", "Everything in your life may not be as it seems.", "I sense trauma in your near future."
]
async function gtFortune() {
    //try {
     //   let leFortune = await fetch(`https:/fortuneapi.heroku.com`)
       // let fortune = (await leFortune.json())
       // return fortune
    //}catch(er) {
      //  console.log(er)
    //}
    return fortunes[Math.floor(fortunes.length * Math.random())]
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
export let getJoke = gtJoke,  getFortune = gtFortune, getQuote = gtQuote 

