import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import avatar from "../assets/avata.jpg";
import { getfriendship, updatefriendship } from "../services/user.services";

const FriendList = () => {
  const [view, setView] = useState("isReceiver");
  const [friends, setFriends] = useState([]);

  const handleViewChange = async (type) => {
    setView(type);
    try {
      const res = await getfriendship(type);
    
      const list = Array.isArray(res.data) ? res.data : [];
        console.log(list)
      setFriends(list);
    } catch (err) {
      setFriends([]);
    }
  };

  useEffect(() => {
    handleViewChange(view);
  }, []);

  const handleupdate = async (_id, user_id_2, status) => {
    await updatefriendship(_id, { user_id_2, status });
    handleViewChange(view);
  };

  const renderActionButtons = (friend) => {
 
      if (view === "isReceiver") {
        return (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2"
              onClick={() =>
                handleupdate(friend._id, friend.user._id, "accepted")
              }
            >
              Xác nhận
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                handleupdate(friend._id, friend.user._id, "rejected")
              }
            >
              Xóa
            </Button>
          </>
        );
      }
      if (view === "isSender") {
        return (
          <Button
            variant="warning"
            size="sm"
            onClick={() =>
              handleupdate(friend._id, friend.user._id, "rejected")
            }
          >
            Hủy lời mời
          </Button>
        );
      }
    
    return null;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm rounded-3">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <Button
                  variant={
                    view === "isReceiver" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleViewChange("isReceiver")}
                >
                  Lời mời đến
                </Button>
                <Button
                  variant={
                    view === "isSender" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleViewChange("isSender")}
                >
                  Lời mời đã gửi
                </Button>
                <Button
                  variant={
                    view === "accepted" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleViewChange("accepted")}
                >
                  Bạn bè
                </Button>
              </div>

              <ListGroup>
                {friends.length === 0 ? (
                  <ListGroup.Item>Không có người nào.</ListGroup.Item>
                ) : (
                  friends.map((friend) => {
                    const userToShow =friend.user
                     

                    return (
                      <ListGroup.Item
                        key={friend._id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={userToShow?.image || avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-3"
                          />
                          <strong>{userToShow?.name || "Không rõ"}</strong>
                        </div>
                        <div>{renderActionButtons(friend)}</div>
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendList;
