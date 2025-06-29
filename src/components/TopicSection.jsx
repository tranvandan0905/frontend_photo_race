import { Card, Button, Container, ListGroup, Badge, Alert, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaClock, FaHistory, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { GetTopic, FindTopic } from '../services/topic.services';
import { PostVoteTopic } from '../services/interaction.services';
import { Link } from 'react-router-dom';

const TopicSection = () => {
  const [topic, setTopic] = useState({});
  const [alltopic, setAllTopic] = useState([]);
  const [findtopic, setFindTopic] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [alert, setAlert] = useState({ message: null, variant: "danger" });

  useEffect(() => {
    getTopic();
  }, []);

  const getTopic = async () => {
    const listtopic = await GetTopic();
    if (listtopic.length > 0) {
      const latest = listtopic.at(-1);
      setTopic(latest);
      setAllTopic(listtopic.slice(0, -1));
    }
  };

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
  const handleSearchTopic = async () => {
    try {
      const response = await FindTopic(keyword);
      setFindTopic(response);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  }
  const topicsToDisplay = () => {
    if (keyword.trim() && findtopic.length > 0) return findtopic;
    return alltopic;
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '700px' }}>
      {/* Alert message */}
      {alert.message && (
        <Alert variant={alert.variant} className="mb-4 text-center rounded-4 shadow-sm">
          {alert.message}
        </Alert>
      )}

      {/* Chủ đề hiện tại */}
      <Card className="mb-4 shadow-sm border-0 rounded-4 p-3">
        <Card.Body className="d-flex flex-column align-items-center text-center">
          <Card.Title className="fs-4 fw-bold text-primary mb-2">
            {topic.title || "Chủ đề hiện tại"}
          </Card.Title>

          <div className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
            <FaClock className="me-1" /> {new Date(topic.start_time).toLocaleString()}
            <FaClock className="me-1" />  {new Date(topic.end_time).toLocaleString()}
          </div>

          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-1 fw-medium"
            onClick={handClipVoteTopic}
          >
            Vote Chủ đề
          </Button>
        </Card.Body>
      </Card>

      {/* Lịch sử chủ đề */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Tiêu đề lịch sử chủ đề */}
        <div className="d-flex align-items-center text-dark fw-semibold fs-5">
          <FaHistory className="me-2" />
          Các chủ đề trước đó
        </div>

        {/* Form tìm kiếm */}
        <Form>
          <InputGroup size="sm">
            <FormControl
              type="search"
              placeholder="Tìm kiếm..."
              className="rounded-start-pill"
              style={{ borderRight: 'none' }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="primary" className="rounded-end-pill" onClick={handleSearchTopic}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
      </div>

      <ListGroup variant="flush">
        {topicsToDisplay().map((item) => (
          <ListGroup.Item
            key={item._id}
            className="d-flex justify-content-between align-items-center border-0 mb-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: '#f0f2f5',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <Link
                to={`/ToprankingList?idtopic=${encodeURIComponent(item._id)}`}
                className="fw-bold"
              >
                {item.title}
              </Link>

              <div className="text-muted small">{new Date(item.start_time).toLocaleString()} - {new Date(item.end_time).toLocaleString()}</div>
            </div>
            <Badge bg="light" text="dark" className="rounded-pill px-3 py-1">
              Đã kết thúc
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TopicSection;
