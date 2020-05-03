import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import WeatherApi from "./weatherApi"

const Weather = () => {
  const weatherData = WeatherApi()
  // const { temperature, clouds, humidity, wind} = weatherData;
  return (
    <>
      <div>
        <div>Weather Information</div>
        <ul>
          <li>Temp: </li>
          <li>Clouds: </li>
          <li>Humidity: </li>
          <li>Wind: </li>
        </ul>
      </div>
    </>
  )
}
export default Weather
