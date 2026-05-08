import { BrowserRouter, Route, Routes } from "react-router";
import WeatherHome from "./assets/components/WeatherHome";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherNav from "./assets/components/WeatherNav";
import WeatherFooter from "./assets/components/WeatherFooter";
import WeatherDetails from "./assets/components/WeatherDetails";
import Error from "./assets/components/Error";
import { useEffect, useState } from "react";

function App() {
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Geolocation response not ok.");
            }
          })
          .then((data) => {
            setUserCity(data.address.city);
            setUserCountry(data.address.country_code);
          })
          .catch((err) => alert("Geolocation failed: ", err));
      },
      (error) => {
        console.log("Errore geolocalizzazione: ", error.message);
      },
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        <header>
          <WeatherNav />
        </header>
        <main
          className="flex-grow-1 d-flex flex-column"
          style={{ backgroundColor: "rgb(50 95 136)" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <WeatherHome userCity={userCity} userCountry={userCountry} />
              }
            ></Route>
            <Route
              path="/details/:location"
              element={<WeatherDetails />}
            ></Route>
            <Route path="/error" element={<Error />}></Route>
            <Route path="/*"></Route>
          </Routes>
        </main>
        <footer>
          <WeatherFooter />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
