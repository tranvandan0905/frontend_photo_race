import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../App.css";
import AppNavbar from "../components/Navbar";
import ProfileHeader from "../pages/ProfileHeader";

function MainLayoutUser() {
    return (
        <>
            <AppNavbar />
            <Container fluid className="mt-5">
                <Row className="min-vh-100">
                    {/* Thanh bên trái chứa thông tin hồ sơ */}
                    <Col xs={12} md={4} lg={3} className="bg-light border-end px-3 py-4">
                        <ProfileHeader />
                    </Col>

                    {/* Khu vực nội dung chính */}
                    <Col xs={12} md={8} lg={9} className="p-4 overflow-auto bg-light"  style={{ maxHeight: "100vh" }}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MainLayoutUser;
