import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [weatherDetais, setWeather] = useState();
  let [trogle, setTrogle] = useState(false);
  let [loading, setLoading] = useState(false);

  let getData = (event) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c82463b34366adfc5ad29bebd87abfdf&units=metric`
    )
      .then((res) => res.json())
      .then((finalres) => {
        if (finalres.cod == "404" || city == "") {
          setWeather(undefined);
        } else setWeather(finalres);

        setLoading(false);
      });
    event.preventDefault();
    setCity("");
    setTrogle(true);
  };
  return (
    <>
      <div className="bg-sky-800 w-[100%] h-[100vh] flex items-center justify-center ">
        <div className="w-[300px] bg-gradient-to-bl from-blue-400 via-blue-200 to-yellow-100 p-3 rounded-lg relative">
          <div className={`absolute left-32 top-32 ${loading ? "" : "hidden"}`}>
            <img
              src="https://i.gifer.com/ZKZg.gif"
              className="h-9 w-9"
              alt=""
            />
          </div>
          <h1 className="text-center text-2xl font-bold p-3">
            Simple Weather App
          </h1>
          <form
            action=""
            className="flex place-content-between"
            onSubmit={getData}
          >
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name=""
              id=""
              className="rounded-lg basis-[80%] w-full p-1"
            />
            <input
              type="submit"
              value="Find"
              className="border-[2px] border-white basis-[20%] w-full rounded-lg"
            />
          </form>
          <div
            className={`${trogle ? "scale-y-1 h-auto" : "scale-y-0 h-0"} m-2`}
          >
            {weatherDetais == undefined ? (
              <>
                <p>No Data Found</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl">
                  {weatherDetais.name} {weatherDetais.sys.country}
                </h1>
                <h1 className="text-2xl">{weatherDetais.main.temp}&deg;C</h1>
                <img
                  src={`https://api.openweathermap.org/img/w/${weatherDetais.weather[0].icon}.png`}
                  alt=""
                />
                <p>{weatherDetais.weather[0].description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
