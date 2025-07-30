import React, { useEffect, useState } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { getAllUser } from "../services/user.services";
import Post from "./Post";

function PostProfile() {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        setuser(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          {user ? (
            <Post user_id={user._id} />
          ) : (
            <p>Đang tải thông tin người dùng...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostProfile;
