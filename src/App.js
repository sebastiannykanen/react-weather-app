import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const handleFetch = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=d791dc08a1799937193437cae5da89fd`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setCity("");
        });
    }
  };

  return (
    <div className="App">
      <div className="search-box">
        <input
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleFetch}
          type="text"
          value={city}
          className="search-bar"
          placeholder="Enter city..."
        />
      </div>
      {typeof weather.sys != "undefined" ? (
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
