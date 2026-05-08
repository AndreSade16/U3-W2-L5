import { Col, Container, Row } from "react-bootstrap";

const Error = () => {
  return (
    <Container
      fluid={true}
      className="d-flex flex-column justify-content-center align-items-center mt-4"
    >
      <Row className="justify-content-center">
        <h1 className="fs-1 text-center fw-bold">
          Ooops... Something went wrong
        </h1>
        <Col xs={12} sm={6} md={4}>
          <img
            src="https://img.freepik.com/premium-vector/cartoon-illustration-sad-duck-with-sad-expression_1187092-63401.jpg"
            alt="sad-duck"
            className="rounded-3 my-4 img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
