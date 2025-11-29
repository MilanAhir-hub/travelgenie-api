import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function getWeather(destination){
    try {
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: destination,
                    appid: WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const data = res.data;
        console.log(data);

        return{
            temperature: `${data.main.temp}°C`,
            condition: data.weather[0]?.description || "Not available",
            humidity: `${data.main.humidity}%`,
            season: getSeason(data.main.temp)
        };
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        return null;
    }

    //basic season identification
    function getSeason(temp){
        if(temp <= 5){
            return "Winter";
        }
        if(temp<=18){
            return "Cool";
        }
        if(temp<=28){
            return "Moderate";
        }
        return "Summer";
    }
}