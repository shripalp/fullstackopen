import { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState("");
  //const [icon, setIcon] = useState("");
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`;

  const hook = () => {
    axios.get(url).then(({ data }) => {
      console.log("weather data loaded", data);
      const current = data.current;
      const location = data.location;
      //console.log("Weather data received", response);
      setWeather({
        temperature: current.temperature,
        location: location.name,
        icon: current.weather_icons[0],
        wind: current.wind_speed,
      });
    });
  };

  // eslint-disable-next-line
  useEffect(hook, []);

  return (
    <>
      <h2>Weather in {weather.location}</h2>
      <p> temperature {weather.temperature}</p>
      <img src={weather.icon} alt="icon" width="150px" />
      <p>wind {weather.wind} m/s</p>
    </>
  );
};
export default Weather;
