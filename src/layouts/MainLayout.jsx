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
            <Container fluid  className="mt-5">
                <Row>
                    {/* Cột 1: Sidebar trái */}
                    <Col xs={12} lg={3} className="d-none d-lg-block p-0">
                        <SidebarLeft />
                    </Col>

                    {/* Cột 2: khoảng trắng */}
                    <Col lg={1} className="d-none d-lg-block" />

                    {/* Cột 3: Nội dung chính */}
                    {/* Cột 3: Nội dung chính có thể cuộn */}
                    <Col xs={12} lg={4} className="scrollable-content">
                        <Outlet />
                    </Col>


                    {/* Cột 4: khoảng trắng */}
                    <Col lg={1} className="d-none d-lg-block" />

                    {/* Cột 5: Sidebar phải */}
                    <Col xs={12} lg={3} className="d-none d-lg-block p-0">
                        <SidebarRight />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MainLayout;
