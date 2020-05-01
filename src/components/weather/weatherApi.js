import React, { setState, useEffect } from "react"
import { siteMetadata } from "../../../gatsby-config"
import axios from "axios";
import ReactDOM from "react-dom"

const WeatherApi = () => {
    const [weatherData, setWeatherData] = setState();
    useEffect(() => {
        async function anyNameFunction() {
            const data = await loadContent();
            setWeatherData({ weatherData: data })
        }
        function loadContent() {
            const token = "e7ef38ed82ce41c08a76f3e1063f8f52";
            const options = {
                coordinates: [11.576124, 48.137154],
                location: "Munich",
                units: "metric",
                type: "forecast"
            };
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${options.location}&apikey=${token}`;
            let response;
            try {
                response = axios.get(url);
            } catch (e) {
                console.warn(e);
            }

            return response.weather[0];
        }
        anyNameFunction();
    }, [])
    ReactDOM.render(
    
        //const { description, icon, id, main} = weatherData;
        <>
            <div>
                <div>Weather Information</div>
                <ul>
                    <li>`Temp: ${weatherData.description}`</li>
                    <li>Clouds:  </li>
                    <li>Humidity: </li>
                    <li>Wind: </li>

                </ul>
            </div>
        </>
    
    )
}

export default WeatherApi;