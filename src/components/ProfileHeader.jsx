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
} from "react-icons/fa";
import { getAllUser, deleteUser } from "../services/user.services";
import avatar from "../assets/avata.jpg";
import Post from "../pages/Post";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

function ProfileHeader() {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get("name");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser(user_id);
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
  }, [user_id]);

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
      <Card className="mb-4 shadow-sm rounded-3">
        {!alert.message && user && (
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">
                <Image
                  src={user.image || avatar}
                  roundedCircle
                  width={64}
                  height={64}
                  className="me-3 border"
                />
              </Col>
              <Col>
                <h5 className="mb-1">
                  <FaUser className="me-2 text-primary" />
                  {user.name}
                </h5>
                {!user_id && (
                  <p className="mb-1 text-muted">
                    <FaEnvelope className="me-2 text-secondary" />
                    {user.email}
                  </p>
                )}
                <p className="mb-0 text-warning fw-semibold">
                  <FaCoins className="me-2" />
                  {user.xu} xu
                </p>
              </Col>
              <Col xs={12} className="d-flex justify-content-center mt-3">
                {!user_id && (
                  <ButtonGroup>
                    <Button variant="outline-primary">
                      <Link
                        to="/EditUserForm"
                        className="text-dark d-flex align-items-center text-decoration-none"
                      >
                        <FaUserEdit className="me-1" /> Sửa
                      </Link>
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={handleDisableUser}
                    >
                      <FaBan className="me-1" /> Vô hiệu hóa
                    </Button>
                  </ButtonGroup>
                )}
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>

      {user ? (
        <Post user_id={user._id} />
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </>
  );
}

export default ProfileHeader;
