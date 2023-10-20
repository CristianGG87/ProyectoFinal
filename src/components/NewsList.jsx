import { useContext, useEffect, useState } from "react";
import NavBar from "./Navbar";
import { News } from "./News";
import "./NewsList.css";
import { AuthContext } from "../context/AuthContext";
import { CreateNews } from "./CreateNews";
import Acordeon from "./Acordeon";
export const NewsList = ({
  news,
  setNews,
  removeNews,
  addNews,
  topicNews,
  hotNews,
  showAllNews,
}) => {
  const { user } = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "q5Yq4qqaqX4t2ls"; // Tu clave de API
        const apiUrl = `https://api.tutiempo.net/json/?lan=es&apid=${apiKey}&ll=${latitude},${longitude}`;

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("No se pudo cargar los datos del clima");
            }
            return response.json();
          })
          .then((data) => {
            setWeatherData(data);
          })
          .catch((err) => {
            setError(err);
          });
      });
    } else {
      setError(
        new Error("La geolocalización no es compatible con este navegador.")
      );
    }
  }, []);
  const getWeatherIconURL = (iconValue) => {
    return `https://v5i.tutiempo.net/wi/01/30/${iconValue}.png`;
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(weatherData);
  return (
    <main className="news-container">
      <section className="nav-bar-normal">
        {windowWidth > 1024 ? (
          <NavBar
            topicNews={topicNews}
            hotNews={hotNews}
            onShowAllNews={showAllNews}
            className="hidden-on-mobile"
          />
        ) : null}
      </section>
      <section className="news-list">
        <div className="mobile-buttons">
          <section className="nav-bar-mobile">
            {windowWidth < 1025 ? (
              <section>
                <Acordeon>
                  <NavBar
                    topicNews={topicNews}
                    hotNews={hotNews}
                    onShowAllNews={showAllNews}
                  />
                </Acordeon>
              </section>
            ) : null}

            {user ? <CreateNews addNews={addNews} /> : null}
          </section>
        </div>
        {news.news.length > 0 ? (
          <ul>
            {news.news.map((newsItem) => (
              <li key={newsItem.id} className="news-item">
                <News
                  news={newsItem}
                  setNews={setNews}
                  removeNews={removeNews}
                  showAllNews={showAllNews}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>
              {showAllNews
                ? "Aun no hay noticias."
                : "No hay noticias para este tema."}
            </p>
          </>
        )}
      </section>
      <section className="weather">
        {error && <p>Error: {error.message}</p>}
        {weatherData && (
          <div className="weather-container">
            {windowWidth > 768 ? (
              <>
                <p>{weatherData.locality.name}</p>
                <p>{weatherData.day1.date}</p>
                <p>Temperatura mínima: {weatherData.day1.temperature_min}°C</p>
                <p>Temperatura máxima: {weatherData.day1.temperature_max}°C</p>
              </>
            ) : (
              <>
                <p>min: {weatherData.day1.temperature_min}°C</p>
                <p>max: {weatherData.day1.temperature_max}°C</p>
              </>
            )}
            <img
              src={getWeatherIconURL(weatherData.day1.icon)}
              alt="Icono del clima"
            />
          </div>
        )}
      </section>
    </main>
  );
};
//////////
