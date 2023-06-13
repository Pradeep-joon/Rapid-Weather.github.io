

// State
let currCity ="London";
let units = "metric";

//Selectors 
let city  = document.querySelector(".Weather_city");
let datetime = document.querySelector(".Weather_datetime");
let weatherForecast  = document.querySelector(".Weather_forecast")
let weatherTemperature = document.querySelector(".Weather_temperature")
let weatherIcon = document.querySelector(".Weather_icons")
let weatherMinmax = document.querySelector(".Weather_minmax")
let weatherRealfeel = document.querySelector(".Weather_realfeel")
let weatherHumidity = document.querySelector(".Weather_humidity")
let weatherWind  = document.querySelector(".Weather_wind")
let weatherPressure = document.querySelector(".Weather_pressure")

//Search 
 document.querySelector(".Weather_search").addEventListener('submit',e =>{
    let search = document.querySelector(".Weather_searchform");

    // prevent the reload
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weatherforecast
    getWeather();
 })


function convertTimeStamp (timestamp,timezone){
    const convertTimeZONE = timezone/3600;
    const date = new Date(timestamp*1000);
    const options = {
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        timezone:`Etc/GMT${convertTimeZONE>=0?"-":"+"}${Math.abs(convertTimeZONE)}`,
        hour12:true,
    }
    return date.toLocaleString("en-US",options)
}

// Converting country code to full name
function convertCountryCode(country){
    let regionName = new Intl.DisplayNames
    (["en"],{type:"region"});
    return regionName.of(country)
}

function getWeather(){
    const API_KEY  = '04a367aeeeac31dc49e99e002c0a16d8'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then
    (response=>response.json()).then(data=>{city.innerHTML = `${data.name},${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt,data.timezone);
    weatherForecast.innerHTML = `<p>${data.weather[0].main}`
    weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"> `
    weatherMinmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176</p><p> Max:${data.main.temp_max.toFixed()}&#176</p>`
    weatherRealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weatherHumidity.innerHTML = `${data.main.humidity}%`
    weatherWind.innerHTML = `${data.wind.speed}m/s`
    weatherPressure.innerHTML = `${data.main.pressure}hPa`

})
}

document.body.addEventListener('load',getWeather())


