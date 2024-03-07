import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/LoadingScreen";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "252b608d3133201a9bbc36fb9ca43064";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(1);
          setTemp({
            celsius,
            fahrenheit,
          });
        })

        .catch((eer) => console.log(eer))
        .finally(() => setIsLoading(false))
    }
  }, [coords]);

  return (
    <div className="app">
    {
      isLoading 
      ? <Loading />
      : (
        <WeatherCard 
      weather={weather} 
      temp={temp}
       />
       )
    }
    </div>
  );
}

export default App;
