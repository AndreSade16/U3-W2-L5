import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const WeatherHome = (props) => {
  const [fetched, setFetched] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const getWeatherEmoji = (weather) => {
    if (weather === "Clouds") {
      return "☁️";
    } else if (weather === "Clear") {
      return "☀️";
    } else if (weather === "Rain") {
      return "🌧️";
    }
  };

  useEffect(() => {
    if (!props.userCity || !props.userCountry) return;
    const apiKey = "4581ed4a75ffef0475104ebe50dad4bb";
    const getCurrentWeather = (city) => {
      setFetched([]);
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
          setFetched((prev) => [...prev, data]);
          setisLoading(false);
        })
        .catch((err) => {
          alert("Something went wrong... ", err);
          navigate("/error");
        });
    };
    const cities = [
      props.userCity && props.userCountry
        ? `${props.userCity},${props.userCountry}`
        : "Madrid,ES",
      "Tokyo,JP",
      "Paris,FR",
      "Washington,US",
      "Rome,IT",
    ];
    cities.forEach((city) => {
      getCurrentWeather(city);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    console.log(fetched);
  }, [fetched]);
  return (
    <Container
      fluid={true}
      className="d-flex flex-column flex-grow-1 justify-content-evenly"
    >
      <Row className="mt-4">
        <Form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/details/" + inputValue);
          }}
        >
          <Row className="justify-content-center align-items-center">
            <Col xs={12} sm={6}>
              <Form.Control
                type="text"
                placeholder="Search your city"
                className=" mr-sm-2 fs-3"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </Col>
            <Col xs="auto">
              <Button
                type="submit"
                className="fs-3 bg-info border-0 mt-3 mt-sm-0"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="mt-4 justify-content-center">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          fetched.map((place, i) => {
            return (
              <Col xs={12} sm={6} md={4} lg={2} key={i} className="mb-3 d-flex">
                <Card
                  className="bg-info shadow-lg w-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      "/details/" + place.city.name + "," + place.city.country,
                    );
                  }}
                >
                  <Card.Body>
                    <Card.Title className="text-decoration-underline fw-bold text-white">
                      {place.city.name}
                    </Card.Title>
                    <Card.Text
                      className="text-center"
                      style={{ fontSize: "5rem" }}
                    >
                      {getWeatherEmoji(place.list[0].weather[0].main)}
                    </Card.Text>
                    <Card.Text className="m-0">
                      <span className="fw-semibold">Temp:</span>{" "}
                      {place.list[0].main.temp.toFixed(1)}°
                    </Card.Text>
                    <Card.Text className="m-0">
                      <span className="fw-semibold">Min:</span>{" "}
                      {place.list[0].main.temp_min.toFixed(1)}°
                    </Card.Text>
                    <Card.Text className="m-0">
                      <span className="fw-semibold">Max:</span>{" "}
                      {place.list[0].main.temp_max.toFixed(1)}°
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default WeatherHome;
