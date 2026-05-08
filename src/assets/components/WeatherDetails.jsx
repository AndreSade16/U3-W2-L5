import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const WeatherDetails = () => {
  const [fetched, setFetched] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useParams().location;
  const apiKey = "4581ed4a75ffef0475104ebe50dad4bb";
  const navigate = useNavigate();
  const getWeatherEmoji = (weather) => {
    if (weather === "Clouds") {
      return "☁️";
    } else if (weather === "Clear") {
      return "☀️";
    } else if (weather === "Rain") {
      return "🌧️";
    } else {
      return "Weather not found";
    }
  };

  useEffect(() => {
    const getCityForecast = (city) => {
      return fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          apiKey +
          "&units=metric",
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("Response not ok: ", res.status);
          }
        })
        .then((data) => {
          setFetched(data);
          setIsLoading(false);
          console.log(fetched);
        })
        .catch(() => {
          navigate("/error");
        });
    };
    getCityForecast(location);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <div className="mt-4 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <Container fluid={true} className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} className="d-flex flex-column align-items-center">
          <h1 className="text-center text-white">
            {fetched.city.name}, {fetched.city.country}
          </h1>
          <p className="text-center text-white">
            Last update at: {fetched.list[0].dt_txt}
          </p>
          <div
            className="text-center px-4 rounded-3  mb-4"
            style={{ fontSize: "8rem", width: "fit-content" }}
          >
            {getWeatherEmoji(fetched.list[0].weather[0].main)}
          </div>
          <Container>
            <Row className="border-1 border-black bg-white text-black py-2 rounded-2">
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold">Weather: </span>
                  {fetched.list[0].weather[0].main}
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold">Temp: </span>
                  {fetched.list[0].main.temp}°C
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold">Feels Like: </span>
                  {fetched.list[0].main.feels_like}°C
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold">Min: </span>
                  {fetched.list[0].main.temp_min}°C
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold">Max: </span>
                  {fetched.list[0].main.temp_max}°C
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <p className="text-center m-0">
                  <span className="fw-semibold text-nowrap">Wind: </span>
                  {fetched.list[0].wind.speed}Km/H
                </p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="g-2 justify-content-center mb-4 mt-3">
        <h3 className="text-center mb-3 text-white">Hourly Weather</h3>
        {fetched.list.slice(0, 5).map((forecast, i) => {
          return (
            <Col
              xs={10}
              sm={4}
              md={3}
              lg={2}
              key={"hourly-card-" + i}
              className="d-flex justify-content-center"
            >
              <Card className="w-100 overflow-hidden shadow">
                <Card.Text
                  className="text-center m-0 bg-white"
                  style={{ fontSize: "5rem" }}
                >
                  {getWeatherEmoji(forecast.weather[0].main)}
                </Card.Text>
                <Card.Body className="pt-0">
                  <Card.Title className="text-center">
                    {forecast.dt_txt.slice(-8, -3)}
                  </Card.Title>
                  <Card.Text className="d-flex flex-md-column justify-content-around align-items-center">
                    <span>
                      <span className="fw-semibold">Min:</span>{" "}
                      {forecast.main.temp_min.toFixed(1)}°C
                    </span>
                    <span>
                      <span className="fw-semibold">Max:</span>{" "}
                      {forecast.main.temp_max.toFixed(1)}°C
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default WeatherDetails;
