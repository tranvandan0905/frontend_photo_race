import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Card } from "react-bootstrap";
import { getmessages, getSocket, postmessages } from "../services/chat.services";

const MessageBox = ({ conversationId, senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = getSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getmessages(conversationId);
        setMessages(res.data);
      } catch (err) {
        console.error("Lỗi lấy tin nhắn:", err.message);
      }
    };

    if (conversationId) fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [conversationId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const messageData = {
      conversationId,
      senderId,
      receiverId,
      text,
    };

    await postmessages({ conversationId, text });
    socket.emit("sendMessage", messageData);
    setText("");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Card className="d-flex flex-column" style={{ height: "80vh" }}>
        <Card.Header>
          <strong>Cuộc trò chuyện</strong>
        </Card.Header>

        <Card.Body
          className="flex-grow-1"
          style={{
            overflowY: "auto",
            paddingBottom: "10px",
          }}
        >
          {messages.length === 0 && <div className="text-muted">Chưa có tin nhắn nào</div>}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${msg.senderId === senderId ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className="p-2 mb-2 rounded"
                style={{
                  backgroundColor: msg.senderId === senderId ? "#aee" : "#ddd",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </Card.Body>

        <Card.Footer style={{ flexShrink: 0 }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nhập tin nhắn..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} variant="primary">
              Gửi
            </Button>
          </InputGroup>
        </Card.Footer>
      </Card>

    </div>
  );
};

export default MessageBox;
