import '../scss/styles.scss'
import { getWeather, getWeekWeather } from './weather'
import { getBackground } from './background'

const searchBar = document.querySelector("#search-city")

async function displayWeather(city) {
    const div = document.querySelector("#weather-today")
    const temp = document.querySelector("#current-temp")
    const minmax = document.querySelector("#minmax")
    const conditions = document.querySelector("#conditions")

    div.style.display = "block"

    const todaysForecast = await getWeather(city)
    console.log(todaysForecast)

    temp.innerText = todaysForecast.currentTemp
    minmax.innerText = todaysForecast.todayMin + ' / ' + todaysForecast.todayMax
    conditions.innerText = todaysForecast.conditions
    const video = await getBackground(todaysForecast.icon)
    getIcon(todaysForecast.icon)
    populateDayInfo(todaysForecast)
    populateWeek(city)
    
    // Remove any existing background video before adding new one
    const existingVideo = document.querySelector("#myvideo")
    if (existingVideo) {
        existingVideo.remove()
    }
    document.querySelector("body").prepend(video)
}
async function getIcon(icon) {
    try {
        const response = await import(`../assets/WeatherIcons-main/WeatherIcons-main/SVG/2nd Set - Monochrome/${icon}.svg`);
        const svgURL = response.default; // This gives you the URL of the SVG
        const weatherIcon = document.querySelector("#weather-icon")
        weatherIcon.src = svgURL;
    } catch (error) {
        console.error(`Error loading weather icon: ${icon}`, error);
        return null;
    }
}

searchBar.addEventListener("submit", (event) => {
    const search = document.querySelector("#search-bar")
    displayWeather(search.value)
    getWeekWeather(search.value)
    search.value = "";
    event.preventDefault()
})

async function populateDayInfo(city) {
    const row = document.querySelector("#daily-info")
    row.innerHTML =""

    const wind = document.createElement("div")
    wind.innerHTML= `<p>Wind Speed</p><p>${city.windSpeed}</p>`
    wind.classList.add("col-2") 
    wind.classList.add("day-quality")

    const humidity = document.createElement("div")
    humidity.innerHTML= `<p>Humidity</p><p>${city.humidity}</p>`
    humidity.classList.add("col-2") 
    humidity.classList.add("day-quality")

    const precipitation = document.createElement("div")
    precipitation.innerHTML= `<p>Precipitation</p><p>${city.precipitation}</p>`
    precipitation.classList.add("col-2") 
    precipitation.classList.add("day-quality")

    const feel = document.createElement("div")
    feel.innerHTML= `<p>Feels Like</p><p>${city.feelsLike}</p>`
    feel.classList.add("col-2") 
    feel.classList.add("day-quality")

    row.appendChild(wind)
    row.appendChild(humidity)
    row.appendChild(precipitation)
    row.appendChild(feel)
}

async function populateWeek(city) {
    const week = await getWeekWeather(city)
    const weekOverview = document.querySelector("#week-overview")
    weekOverview.innerHTML = ""
    for (let i = 0; i<week.length; i++) {
        const day = document.createElement("div") 
        day.classList.add("day")
        day.classList.add("col-2")

        const icon = document.createElement("img")
        const temps = document.createElement("p")
        const date = document.createElement("p")

        const response = await import(`../assets/WeatherIcons-main/WeatherIcons-main/SVG/2nd Set - Monochrome/${week[i].icon}.svg`);
        const svgURL = response.default; // This gives you the URL of the SVG
        icon.src = svgURL

        temps.innerText = week[i].tempmin + ' / ' + week[i].tempmax

        const calenderDate =week[i].datetime
        date.innerText = calenderDate.substring(5)

        day.appendChild(date)
        day.appendChild(icon)
        day.appendChild(temps)

        weekOverview.appendChild(day)
    }
}