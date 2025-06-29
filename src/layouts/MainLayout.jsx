import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import "../App.css";
function MainLayout() {
    return (
        <>
            <AppNavbar />
            <Container fluid className="custom-top">

                <Row className="justify-content-center">
                    {/* Sidebar trái */}
                    <Col lg={3} className="d-none d-lg-block p-0">
                        <SidebarLeft />
                    </Col>

                    {/* Khoảng trắng trái */}
                    <Col className="d-none d-lg-block p-0" style={{ width: '4.166%' }} />

                    {/* Nội dung chính */}
                    <Col xs={12} lg={5} className="scrollable-content px-2">
                        <Outlet />
                    </Col>

                    {/* Khoảng trắng phải */}
                    <Col  className="d-none d-lg-block p-0" style={{ width: '4.166%' }} />

                    {/* Sidebar phải */}
                    <Col lg={3} className="d-none d-lg-block p-0">
                        <SidebarRight />
                    </Col>
                </Row>


            </Container>
        </>
    );
}

export default MainLayout;
