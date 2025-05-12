import { Card, Button, Container, ListGroup, Badge } from 'react-bootstrap';
import { FaThumbsUp, FaClock, FaHistory } from 'react-icons/fa';
import { useState } from 'react';

const topics = [
  { id: 1, title: 'Chủ đề A', time_start: '2024-04-01', time_end: '2024-04-05' },
  { id: 2, title: 'Chủ đề B', time_start: '2024-03-15', time_end: '2024-03-20' },
  // Thêm nhiều topic khác nếu cần
];

const TopicSection = ({ currentTopic = null }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="mt-5">
      {/* Chủ đề hiện tại */}
      {currentTopic ? (
        <Card className="mb-4 shadow-lg border-0 rounded-3" style={{ transition: 'all 0.3s ease-in-out' }}>
          <Card.Body>
            <Card.Title className="fs-3 text-primary fw-bold mb-3">{currentTopic.title}</Card.Title>
            {currentTopic.description && (
              <Card.Text className="text-muted mb-4">{currentTopic.description}</Card.Text>
            )}
            <div className="d-flex align-items-center gap-4 mb-4">
              <span><FaClock className="me-2 text-muted" /> Bắt đầu: {currentTopic.time_start}</span>
              <span><FaClock className="me-2 text-muted" /> Kết thúc: {currentTopic.time_end}</span>
            </div>
            <Button
              variant="outline-primary"
              className="px-4 py-2 rounded-pill"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered ? '#0056b3' : 'transparent',
                color: isHovered ? 'white' : '#0056b3',
                borderColor: '#0056b3',
                transition: 'all 0.3s ease'
              }}
            >
              <FaThumbsUp className="me-2" /> Vote
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="mb-4 text-center text-muted p-5 bg-light rounded-3 shadow-sm">
          <Card.Body>
            <h5>Chưa có chủ đề hiện tại</h5>
            <p className="small">Vui lòng quay lại sau</p>
          </Card.Body>
        </Card>
      )}

      {/* Lịch sử topic */}
      <h5 className="mb-4 d-flex align-items-center">
        <FaHistory className="me-2" size={24} /> Các chủ đề trước đó
      </h5>
      <ListGroup>
        {topics.map(topic => (
          <ListGroup.Item
            key={topic.id}
            className="d-flex justify-content-between align-items-center border-0 rounded-3 mb-3"
            style={{ backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          >
            <div>
              <strong>{topic.title}</strong>
              <div className="small text-muted">
                {topic.time_start} - {topic.time_end}
              </div>
            </div>
            <Badge bg="secondary" pill>Đã kết thúc</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TopicSection;
