
import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import {

  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { getAllUser, postfriendship } from "../services/user.services";
import avatar from "../assets/avata.jpg";
import Post from "../pages/Post";
import { useSearchParams } from "react-router-dom";
import AlertToast from "../components/AlertToast";

function SearchUserPage() {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get("name");

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

  const handepostfriendship = async (id) => {
    try {
      const data = await postfriendship(id);
      if (data.errorCode === 1)
        setAlert({ message: data.message, variant: "danger" });
      else
        setAlert({ message: "Gửi kết bạn thành công", variant: "success" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra!";
      setAlert({ message: errorMessage, variant: "danger" });
    }
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <>
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
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-1">
                    <FaUser className="me-2 text-primary" />
                    {user.name}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm d-flex align-items-center"
                    title="Thêm bạn bè"
                    onClick={() => handepostfriendship(user._id)}
                  >
                    <FaUserPlus className="me-1" />
                    Thêm bạn
                  </button>

                </div>
              </Col>
            </Row>
          </Card.Body>
        )}
        <AlertToast alert={alert} setAlert={setAlert} />
      </Card>


      {user ? (
        <Post user_id={user._id} />
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </>
  );
}

export default SearchUserPage;
