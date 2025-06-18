import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={6} className="d-none d-md-flex flex-column justify-content-center align-items-start ps-5">
          <h1 className="text-primary fw-bold" style={{ fontSize: "48px" }}>PhotoWar – Chiến ảnh đoạt giải!</h1>
          <p className="fs-4">PhotoWar giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</p>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;