import { Card, ListGroup, Button, Alert, Image } from "react-bootstrap";
import { FaThumbtack, FaHotjar, FaCamera } from 'react-icons/fa';
import avatar from "../assets/avata.jpg";
import { Link } from 'react-router-dom';
import { PostVoteTopic } from "../services/interaction.services";
import { useEffect, useState } from "react";
import { GetTopic } from "../services/topic.services";
import { GetTopranking } from "../services/topranking.services";
function SidebarLeft() {
  const [topic, setTopic] = useState({});
  const [topranking, setTopranking] = useState([]);
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const handClipVoteTopic = async () => {
    try {
      const response = await PostVoteTopic();
      if (response.data) {
        setAlert({ message: "Vote thành công!", variant: "success" });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  }

  useEffect(() => {
    getTopic();
    getTopranking();
  }, []);

  const getTopic = async () => {
    const listtopic = await GetTopic();
    if (listtopic.length > 0) {
      const latest = listtopic.at(-1);
      setTopic(latest);
    }
  };
  const getTopranking = async () => {
    const listtopic = await GetTopranking();
    const latest = listtopic?.data?.data; // lấy danh sách từ response
    if (Array.isArray(latest) && latest.length > 0) {
      const top5 = latest.slice(0, 5); // lấy 5 người đầu tiên
      setTopranking(top5);
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  return (
    <Card className="mb-3 border-0 bg-transparent shadow-none">
      {/* Thêm nút đăng bài */}
      <Card.Header className="d-flex justify-content-between align-items-center py-3 border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="d-flex align-items-center">
          <FaThumbtack className="text-danger me-2" size={20} />
          <span className="fw-bold">Cùng chinh phục!</span>
        </div>
        <Button variant="outline-primary" className="d-flex align-items-center">
          <Link to="/CreatePost" className="text-dark d-flex align-items-center text-decoration-none">
            <FaCamera className="me-2" size={18} />
            Đăng bài
          </Link>
        </Button>

      </Card.Header>

      <ListGroup variant="flush">
        {/* Chủ đề tuần này */}
        {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <ListGroup.Item className="d-flex align-items-start px-4 py-3 border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <FaHotjar className="text-danger me-3 mt-1" size={20} />
          <div className="w-100">
            <p className="m-0 text-muted">
              <span className="d-block mb-1">
                <strong>Chủ đề tuần này:</strong> {topic.title}
              </span>
              <span className="d-block mb-1">
                <strong>Thời gian bắt đầu:</strong> {formatDate(topic.start_time)}
              </span>
              <span className="d-block">
                <strong>Thời gian kết thúc:</strong> {formatDate(topic.end_time)}
              </span>
            </p>
            <Button variant="outline-danger" size="sm" className="mt-2 py-1 px-3 rounded-pill" onClick={handClipVoteTopic}>
              Vote Chủ đề
            </Button>
          </div>
        </ListGroup.Item>




        {/* Top người chơi */}
        <ListGroup.Item className="px-4 py-3 border-0 bg-transparent">
          <h5 className="mb-3 fw-bold text-dark text-center">Top người chơi</h5>
          {topranking.map((p, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex align-items-center justify-content-between border-0 p-3 mb-3 rounded-3 shadow-sm bg-white"
            >

              <Image
                src={p.avatar || avatar}
                roundedCircle
                width={64}
                height={64}
                className="me-3 border"
              />
              <div>
                <div><strong>{p.user_name}</strong></div>
                <small className="text-muted">Điểm: {p.totalScore}</small>
              </div>

            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default SidebarLeft;
