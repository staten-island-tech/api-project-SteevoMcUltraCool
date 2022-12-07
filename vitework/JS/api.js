
async function getJoke() {
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
async function getCompatability(name,lover) {
    try {
        let compatibility = await fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${lover}&fname=${name}`,{
            method: 'GET', 
            headers: {
                'X-RapidAPI-Key': '82720bd7d6msh2d19c07fd7db3ddp1297f3jsn24bf33fef3b4',
                'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'            }
        })
        let comp = (await compatibility.json())
        return [comp.percentage, comp.result]
    }catch(er) {
        console.log(er)
    }
}
async function getQuote() {
    try {
        let compatibility = await fetch("https://api.quotable.io/random")
        let comp = (await compatibility.json())
        return [comp.content, comp.author]
    }catch(er) {
        console.log(er)
    }
}
console.log("a new beginning")


