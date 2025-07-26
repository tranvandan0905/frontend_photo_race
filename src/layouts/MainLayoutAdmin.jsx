import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../App.css";
import NavbarAdmin from "../components/NavbarAdmin";

function MainLayoutAdmin() {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Navbar dọc bên trái */}
        <Col xs={12} md={5} lg={2} className="bg-light p-0 border-end">
          <NavbarAdmin />
        </Col>

        {/* Nội dung chính */}
        <Col xs={12} md={7} lg={10} className="p-4 overflow-auto" style={{ maxHeight: "100vh" }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default MainLayoutAdmin;
