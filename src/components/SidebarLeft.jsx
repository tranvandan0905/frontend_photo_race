import { Card, ListGroup, Button, Alert } from "react-bootstrap";
import { FaThumbtack, FaHotjar, FaCamera } from 'react-icons/fa';
import { MdMilitaryTech } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PostVoteTopic } from "../services/interaction.services";
import { useState } from "react";
const players = [
  { name: "Lala Beo", score: 1500, avatar: "/lala.png" },
  { name: "Minh Cute", score: 1450, avatar: "/minh.png" },
];

function SidebarLeft() {
    const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const handClipVoteTopic=async()=>{
    try {
      const response = await PostVoteTopic() ;
      if(response.data)
      {
      setAlert({ message: "Vote thành công!", variant: "success" });
      }
  } catch (error) {
    setAlert({
     message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
      variant: "danger",
    });
  }
  }
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
        <ListGroup.Item className="d-flex align-items-center px-4 py-3 border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <FaHotjar className="text-danger me-3" size={20} />
          <div className="w-100">
            <p className="m-0 text-muted">
              Chủ đề tuần này là: <strong>Hoàng hôn</strong>
            </p>
            <Button variant="outline-danger" size="sm" className="mt-2 py-1 px-2 rounded-pill"  onClick={handClipVoteTopic}>
              Vote Chủ đề
            </Button>
          </div>
        </ListGroup.Item>


        {/* Top người chơi */}
        <ListGroup.Item className="px-4 py-3 border-0 bg-transparent">
          <h5 className="mb-3 fw-bold text-dark text-center">Top người chơi</h5>
          {players.map((p, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex align-items-center justify-content-between border-0 p-3 mb-3 rounded-3 shadow-sm bg-white"
            >
              <div>
                <div><strong>{p.name}</strong></div>
                <small className="text-muted">Điểm: {p.score}</small>
              </div>
              <div className="d-flex gap-2">
                <MdMilitaryTech size={30} className="text-warning" />
                <MdMilitaryTech size={30} className="text-secondary" />
                <MdMilitaryTech size={30} className="text-muted" />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default SidebarLeft;
