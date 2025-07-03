import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../App.css";
import NavbarAds from "../components/NavbarAds";

function MainLayoutAds() {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Navbar dọc bên trái */}
        <Col xs={12} md={3} lg={2} className="bg-light p-0 border-end">
          <NavbarAds />
        </Col>

        {/* Nội dung chính */}
        <Col xs={12} md={9} lg={10} className="p-4 overflow-auto" style={{ maxHeight: "100vh" }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default MainLayoutAds;
