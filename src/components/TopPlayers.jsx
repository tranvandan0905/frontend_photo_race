
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaTrophy } from 'react-icons/fa';

const TopPlayers = () => {
  // Sample data for top players with 3 cups and total score
  const players = [
    { rank: 1, name: 'Người chơi 1', score: 1500, cup1: 500, cup2: 400, cup3: 600, avatar: 'https://www.example.com/avatar1.jpg' },
    { rank: 2, name: 'Người chơi 2', score: 1400, cup1: 450, cup2: 350, cup3: 600, avatar: 'https://www.example.com/avatar2.jpg' },
    { rank: 3, name: 'Người chơi 3', score: 1300, cup1: 400, cup2: 300, cup3: 600, avatar: 'https://www.example.com/avatar3.jpg' },
  ];

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
      <Card.Body>
        <Card.Title className="fs-4 fw-bold text-center mb-4">Bảng xếp hạng Top người chơi</Card.Title>

        {/* Flex container for layout */}
        <Row className="d-flex justify-content-center">
          {/* Top 2 and 3 players */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            <Card className="shadow-sm border-0 rounded-4 p-3 text-center">
              <Card.Img
                variant="top"
                src={players[1].avatar}
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <Card.Title className="fs-5 fw-semibold">{players[1].name}</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-secondary" /> {players[1].cup1} điểm (Cúp 1)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-secondary" /> {players[1].cup2} điểm (Cúp 2)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-secondary" /> {players[1].cup3} điểm (Cúp 3)
                </div>
                <Badge bg="secondary" className="mb-2">#2</Badge>
                <div>Tổng điểm: {players[1].score}</div>
              </Card.Text>
            </Card>
          </Col>

          {/* Top 1 player in the center, higher than others */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            <Card className="shadow-sm border-0 rounded-4 p-3 text-center" style={{ position: 'relative', top: '-20px' }}>
              <Card.Img
                variant="top"
                src={players[0].avatar}
                className="rounded-circle mb-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <Card.Title className="fs-4 fw-bold">{players[0].name}</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-warning" /> {players[0].cup1} điểm (Cúp 1)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-warning" /> {players[0].cup2} điểm (Cúp 2)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-warning" /> {players[0].cup3} điểm (Cúp 3)
                </div>
                <Badge bg="gold" className="mb-2">#1</Badge>
                <div>Tổng điểm: {players[0].score}</div>
              </Card.Text>
            </Card>
          </Col>

          {/* Top 3 player */}
          <Col xs={6} md={4} className="d-flex justify-content-center mb-4 mb-md-0">
            <Card className="shadow-sm border-0 rounded-4 p-3 text-center">
              <Card.Img
                variant="top"
                src={players[2].avatar}
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <Card.Title className="fs-5 fw-semibold">{players[2].name}</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-bronze" /> {players[2].cup1} điểm (Cúp 1)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-bronze" /> {players[2].cup2} điểm (Cúp 2)
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <FaTrophy className="me-1 text-bronze" /> {players[2].cup3} điểm (Cúp 3)
                </div>
                <Badge bg="bronze" className="mb-2">#3</Badge>
                <div>Tổng điểm: {players[2].score}</div>
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TopPlayers;
