import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "./App.css";

const handleFetch = debounce((city, setWeather) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=d791dc08a1799937193437cae5da89fd`
  )
    .then((response) => response.json())
    .then((data) => {
      setWeather(data);
    });
}, 1000);

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        await handleFetch(city, setWeather);
      }
    };
    fetchData();
  }, [city]);

  return (
    <div className="App">
      <div className="search-box">
        <input
          autoFocus
          onChange={(e) => setCity(e.target.value)}
          type="text"
          value={city}
          className="search-bar"
          placeholder="Enter city..."
        />
      </div>
      {typeof weather != "undefined" ? (
        <>
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="temperature">{Math.floor(weather.main.temp)}°C</div>
        </>
      ) : (
        ""
      )}
      <div></div>
    </div>
  );
}

export default App;
