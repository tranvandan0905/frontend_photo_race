
import { useEffect, useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { GetTopranking } from '../services/topranking.services';
import avatar from "../assets/avata.jpg";
const TopPlayers = () => {
const [topranking, setTopranking] = useState([]);

  
    useEffect(() => {
      getTopranking();
      
    }, []);
     const getTopranking = async () => {
    const listtopic = await GetTopranking();
    const latest = listtopic?.data?.data; // lấy danh sách từ response
      console.log(latest);
    if (Array.isArray(latest) && latest.length > 0) {
      const top5 = latest.slice(0, 3); // lấy 5 người đầu tiên
      setTopranking(top5);
    }
      
  };
  return (
  <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
    <Card.Body>
      <Card.Title className="fs-4 fw-bold text-center mb-4">Bảng xếp hạng Top người chơi</Card.Title>

      <Row className="d-flex justify-content-center">
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
               <Badge  className="mb-2">Top 2</Badge>
              <Card.Title className="fs-5 fw-semibold">{topranking[1].user_name}</Card.Title>
              <Card.Text>
                  <span className="d-block">Tổng điểm: {topranking[1].totalScore}</span>
              </Card.Text>
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
               <Badge  className="mb-2">Top 1</Badge>
              <Card.Title className="fs-4 fw-bold">{topranking[0].user_name}</Card.Title>
              <Card.Text>
                <Badge bg="gold" className="mb-2">#1</Badge>
                  <span className="d-block">Tổng điểm: {topranking[0].totalScore}</span>
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
               <Badge  className="mb-2">Top 3</Badge>
              <Card.Title className="fs-5 fw-semibold">{topranking[2].user_name}</Card.Title>
              <Card.Text>
                 <span className="d-block">Tổng điểm: {topranking[2].totalScore}</span>
              </Card.Text>
            </Card>
          )}
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
}

export default TopPlayers;
