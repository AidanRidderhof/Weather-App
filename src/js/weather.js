const API_KEY = "7DTJQZ7D5P7Z38JG84KD6SNL9"

export async function getWeather(city) {

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`)
    const weatherData = await response.json()
    //console.log(weatherData)

    const cityInfo = {
        currentTemp: weatherData.currentConditions.temp,
        todayMin: weatherData.days[0].tempmin,
        todayMax: weatherData.days[0].tempmax,
        conditions: weatherData.currentConditions.conditions,
        humidity: weatherData.currentConditions.humidity,
        feelsLike: weatherData.currentConditions.feelslike,
        windSpeed: weatherData.currentConditions.windspeed,
        precipitation: weatherData.currentConditions.precip,
        icon: weatherData.currentConditions.icon
    }

    //console.log(cityInfo)
    return cityInfo
}

export async function getWeekWeather(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`)
    const weatherData = await response.json()
    const week = []
    for (let i = 1; i<=7; i++) {
        const dayWeather = {
            datetime: weatherData.days[i].datetime,
            tempmax: weatherData.days[i].tempmax,
            tempmin: weatherData.days[i].tempmin,
            icon: weatherData.days[i].icon
        }
        week.push(dayWeather)
    }
    return week
}