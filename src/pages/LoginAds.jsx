import { Container, Row, Col, Image } from "react-bootstrap";
import LoginAdsForm from "../components/LoginAdsForm";
import images from "../assets/images.png";
function LoginAds() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        color: "white",
      }}
    >
      <Row className="w-100">
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-start ps-5"
        >
          <h1 className="fw-bold" style={{ fontSize: "42px" }}>
            Trung tâm quảng cáo PhotoWar
          </h1>
          <p className="fs-5">
            Đăng nhập để quản lý chiến dịch, theo dõi hiệu suất và tiếp cận
            người dùng tiềm năng.
          </p>
          <Image
            src={images}
            alt="Quản lý quảng cáo"
            fluid
            className="mt-4"
           style={{ width: "70%", height: "70%" }}

          />
        </Col>

        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-white p-5 rounded shadow"
          style={{ minHeight: "500px" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4 text-dark">Đăng nhập Nhà Quảng Cáo</h3>
            <LoginAdsForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAds;

