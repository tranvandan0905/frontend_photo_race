import { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { GetTopranking, new_user_topranking } from '../services/topranking.services';
import avatar from "../assets/avata.jpg";

const TopPlayers = () => {
  const [topranking, setTopranking] = useState([]);
  const [alltopranking, setAllTopranking] = useState([]);
  const [user_newtoprank, setUser_newtoprank] = useState([]);
  useEffect(() => {
    getTopranking();
  }, []);

  const getTopranking = async () => {
    const listtopic = await GetTopranking();
    const newtoprank = await new_user_topranking();
    const latest = listtopic.data;
    setAllTopranking(latest);
    setUser_newtoprank(newtoprank.data);
    if (Array.isArray(latest) && latest.length > 0) {
      const top3 = latest.slice(0, 3);
      setTopranking(top3);
    }
  };

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4 p-4">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold text-center mb-4">Bảng xếp hạng Top người chơi</Card.Title>

        {/* Top 3 layout */}
        <Row className="d-flex justify-content-center mb-5">
          {/* Top 2 */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            {topranking[1] && (
              <Card className="shadow-sm border-0 rounded-4 p-3 text-center">
                <Card.Img
                  variant="top"
                  src={topranking[1].avatar || avatar}
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <Badge className="mb-2 bg-secondary">Top 2</Badge>
                <Card.Title className="fs-5 fw-semibold">{topranking[1].user_name}</Card.Title>
                <Card.Text>Tổng điểm: {topranking[1].totalScore}</Card.Text>
              </Card>
            )}
          </Col>

          {/* Top 1 */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            {topranking[0] && (
              <Card className="shadow-sm border-0 rounded-4 p-3 text-center" style={{ position: 'relative', top: '-20px' }}>
                <Card.Img
                  variant="top"
                  src={topranking[0].avatar || avatar}
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <Badge className="mb-2 bg-warning text-dark">Top 1</Badge>
                <Card.Title className="fs-4 fw-bold">{topranking[0].user_name}</Card.Title>
                <Card.Text>
                  <Badge bg="gold" className="mb-2">#1</Badge>
                  <span >Tổng điểm: {topranking[0].totalScore}</span>
                </Card.Text>
              </Card>
            )}
          </Col>

          {/* Top 3 */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            {topranking[2] && (
              <Card className="shadow-sm border-0 rounded-4 p-3 text-center">
                <Card.Img
                  variant="top"
                  src={topranking[2].avatar || avatar}
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <Badge className="mb-2 bg-info">Top 3</Badge>
                <Card.Title className="fs-5 fw-semibold">{topranking[2].user_name}</Card.Title>
                <Card.Text>Tổng điểm: {topranking[2].totalScore}</Card.Text>
              </Card>
            )}
          </Col>
        </Row>

        {/* New layout: bên trái và phải */}
        <Row>
          {/* Bên trái - Top người đạt giải topic mới nhất */}
          <Col md={6}>
            <h5 className="fw-bold mb-3">🏆 Người đạt giải topic mới nhất</h5>
            {user_newtoprank.length > 0 ? (
              <ListGroup variant="flush">
                {user_newtoprank.map((user, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center gap-3">
                    <img src={user.avatar || avatar} alt="avatar" width="40" height="40" className="rounded-circle" />
                    <div>
                      <strong>{user.user_name}</strong><br />
                      <small>Tổng điểm: {user.total_score}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="fst-italic text-secondary">🎉 Người chiến thắng cho chủ đề lần này là ai đây?</p>
            )}
          </Col>

          {/* Bên phải - Danh sách xếp hạng đầy đủ */}
          <Col md={6}>
            <h5 className="fw-bold mb-3">📋 Danh sách xếp hạng đầy đủ</h5>
            {alltopranking.length > 0 ? (
              <ListGroup variant="flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {alltopranking.map((user, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center gap-3">
                    <span className="fw-bold text-primary">#{index + 1}</span>
                    <img src={user.avatar || avatar} alt="avatar" width="40" height="40" className="rounded-circle" />
                    <div>
                      <strong>{user.user_name}</strong><br />
                      <small>Tổng điểm: {user.totalScore}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>Chưa có dữ liệu xếp hạng.</p>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TopPlayers;
