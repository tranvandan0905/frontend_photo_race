import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Image, Spinner, Alert } from "react-bootstrap";
import { getconversation } from "../services/chat.services";
import MessageBox from "../components/MessageBox";
import avatar from "../assets/avata.jpg";

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getconversation();
        if (Array.isArray(res.data)) {
          setConversations(res.data);
        }
      } catch (err) {
        console.error("Error fetching conversations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <Container fluid className="py-3" style={{ height: "90vh" }}>
      <Row className="h-100 border rounded shadow-sm overflow-hidden">
        {/* Sidebar */}
        <Col md={4} className="border-end h-100 overflow-auto p-0">
          <div className="bg-light px-3 py-2 border-bottom">
            <h5 className="mb-0 text-center">Chat</h5>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center p-3">
              <Spinner animation="border" />
            </div>
          ) : conversations.length === 0 ? (
            <Alert variant="info" className="m-3">
              Bạn chưa có tin nhắn nào
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {conversations.map((conv) => (
                <ListGroup.Item
                  key={conv._id}
                  action
                  onClick={() => setSelectedConv(conv)}
                  active={selectedConv?._id === conv._id}
                  className="d-flex align-items-center gap-3"
                >
                  <Image
                    src={conv.avatar || avatar}
                    roundedCircle
                    width={45}
                    height={45}
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="fw-bold">{conv.name || "Không rõ tên"}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {conv.lastMessage || ""}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        {/* Content */}
        <Col md={8} className="p-0 d-flex flex-column">
          {selectedConv ? (
            <MessageBox
              conversationId={selectedConv._id}
              senderId={selectedConv.senderId}
              receiverId={selectedConv.otherUserId}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <h5 className="text-muted">Chọn cuộc trò chuyện để bắt đầu</h5>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
