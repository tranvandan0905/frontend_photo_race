import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Row,
  Col,
  Button,
  ButtonGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaCoins,
  FaUserEdit,
  FaBan,
  FaUser,
  FaImages,
  FaUserFriends,
} from "react-icons/fa";
import { getAllUser, deleteUser } from "../services/user.services";
import avatar from "../assets/avata.jpg";
import { Link, useNavigate } from "react-router-dom";

function ProfileHeader() {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        setuser(res.data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra!";
        setAlert({ message: errorMessage, variant: "danger" });
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDisableUser = async () => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn vô hiệu hóa tài khoản không?\n\nSau khi vô hiệu hóa, bạn chỉ cần đăng nhập lại để mở khóa tài khoản."
    );
    if (!confirm) return;

    try {
      await deleteUser();
      setAlert({
        message: "Vô hiệu hóa tài khoản thành công! Đang chuyển hướng...",
        variant: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message || "Không thể vô hiệu hóa tài khoản!",
        variant: "danger",
      });
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <>
      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Card className="mb-4 shadow-sm rounded-4 p-3">
        {!alert.message && user && (
          <Card.Body>
            <Row className="justify-content-center text-center align-items-center">
              <Col xs={12} md="auto" className="mb-3 mb-md-0">
                <Image
                  src={user.image || avatar}
                  roundedCircle
                  width={100}
                  height={100}
                  className="border shadow-sm"
                />
              </Col>
              <Col xs={12} md={8}>
                <h4 className="fw-bold text-primary text-capitalize">
                  <FaUser className="me-2" />
                  {user.name}
                </h4>
                <p className="mb-1 text-muted">
                  <FaEnvelope className="me-2" />
                  {user.email}
                </p>
                <p className="text-warning fw-semibold">
                  <FaCoins className="me-2" />
                  {user.xu} xu
                </p>

                <ButtonGroup className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                  <Button
                    variant="outline-success"
                    as={Link}
                    to="/profile"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaImages /> Bài đăng
                  </Button>
                  <Button
                    variant="outline-info"
                    as={Link}
                    to="/EditUserForm"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaUserEdit /> Chỉnh sửa
                  </Button>
                  <Button
                    variant="outline-secondary"
                    as={Link}
                    to="/STK"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaUserEdit /> Liên kết STK
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleDisableUser}
                    className="d-flex align-items-center gap-2"
                  >
                    <FaBan /> Vô hiệu hóa
                  </Button>
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/FriendList"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaUserFriends /> Bạn bè
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default ProfileHeader;
