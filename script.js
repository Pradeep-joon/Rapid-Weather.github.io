

// state
let currCity ="New Delhi";
let units = "metric";

//Sselectors 
let city  = document.querySelector(".Weather_city")

function getWeather(){
    const API_KEY  = '04a367aeeeac31dc49e99e002c0a16d8'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=New DELHI&appid=${API_KEY}&units=${units}`).then
    (response=>response.json()).then(data=>city.innerHTML = `${data.name},${data.sys.country}`)
}

document.body.addEventListener('load',getWeather())


