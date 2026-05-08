import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router";

const WeatherNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid={true}>
        <Link to="/" className="navbar-brand">
          <span className="fw-bold text-info fst-italic fs-3 text-decoration-underline">
            Mega
          </span>
          <span className="fw-bold text-white">Meteo</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
            <Nav.Link href="https://openweathermap.org/" className="text-white">
              Api Credits
            </Nav.Link>
          </Nav>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("details/" + searchValue);
            }}
          >
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </Col>
              <Col xs="auto" className="ps-0">
                <Button type="submit" className="bg-info border-0">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherNav;
