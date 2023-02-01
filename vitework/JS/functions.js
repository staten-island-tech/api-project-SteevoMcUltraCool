function GetRadioButtonValue(name){
        var radioButtons = document.getElementsByName(name);
        console.log(radioButtons)        
        for(let i = 0; i < radioButtons.length; i++) {  
            if(radioButtons[i].checked){
                return radioButtons[i].value
            }
        }
    return false
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '82720bd7d6msh2d19c07fd7db3ddp1297f3jsn24bf33fef3b4',
		'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
	}
};

function ObjectToString(obj){
    let string = ""
    Object.keys(obj).forEach(key=>{
        if (obj[key]==true){
            string= string + key + "%2C20"
        }
    })
    return string
}
async function GetJoke(flags){
    try {
        let rawData = await fetch(`https://jokeapi-v2.p.rapidapi.com/joke/${GetRadioButtonValue("category") || "Any"}?format=json&blacklistFlags=nsfw`, options)
	    let response = await rawData.json()
        return {"type":response.type, "joke":[response.setup||response.joke, response.delivery]}
    }catch(error) {
        console.error("Error getting data:"+ error)
    }
    return false
}
export let getRadioButtonValue = GetRadioButtonValue, getJoke = GetJoke, objectToString =ObjectToString