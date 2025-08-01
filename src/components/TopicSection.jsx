import {
  Card, Button, Container, ListGroup, Badge,
  Form, FormControl, InputGroup, Toast, ToastContainer
} from 'react-bootstrap';
import { FaClock, FaHistory, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { GetTopic, FindTopic } from '../services/topic.services';
import { PostVoteTopic } from '../services/interaction.services';
import { Link } from 'react-router-dom';
import AlertToast from './AlertToast';

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

    if (listtopic) {
      const latest = listtopic.at(0);
      setTopic(latest);
      setAllTopic(listtopic.slice(1));
    }
  };

  const handClipVoteTopic = async () => {
    try {
      const response = await PostVoteTopic();
      if (response.data) {
        setAlert({ message: "✅ Vote thành công!", variant: "success" });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  };

  const handleSearchTopic = async () => {
    try {
      const response = await FindTopic(keyword);
      setFindTopic(response);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi tìm kiếm!",
        variant: "danger",
      });
    }
  };

  const topicsToDisplay = () => {
    if (keyword.trim() && findtopic.trim()) return findtopic;
    return alltopic;
  };

  return (
    <Container className="container-xl mt-5">
      {/* Chủ đề hiện tại */}
      <Card
        className="mb-5 shadow-sm border-0 rounded-4 px-4 py-4"
        style={{
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          borderLeft: "6px solid #0d6efd",
        }}
      >
        <Card.Body className="d-flex flex-column align-items-center text-center">
          <Card.Title
            className="fs-3 fw-bold text-primary mb-3"
            style={{ letterSpacing: "0.5px" }}
          >
            🎯 Chủ đề tuần này:{" "}
            <span className="text-dark">
              {topic.title || "Chưa có chủ đề"}
            </span>
          </Card.Title>

          <div className="text-secondary mb-4 fs-5">
            <div className="mb-2">
              <FaClock className="me-2 text-success" />
              Bắt đầu:{" "}
              <strong className="text-dark">
                {new Date(topic.start_time).toLocaleString()}
              </strong>
            </div>
            <div>
              <FaClock className="me-2 text-danger" />
              Kết thúc:{" "}
              <strong className="text-dark">
                {new Date(topic.end_time).toLocaleString()}
              </strong>
            </div>
          </div>

          <Button
            variant="primary"
            className="rounded-pill px-4 py-2 fw-semibold shadow fs-5"
            onClick={handClipVoteTopic}
          >
            🚀 Vote chủ đề này
          </Button>
        </Card.Body>
      </Card>


      {/* Header + form tìm kiếm */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center text-dark fw-semibold fs-4">
          <FaHistory className="me-2" />
          Các chủ đề trước đó
        </div>

        <Form>
          <InputGroup size="lg">
            <FormControl
              type="search"
              placeholder="Tìm kiếm chủ đề..."
              className="rounded-start-pill shadow-sm"
              style={{ borderRight: 'none', minWidth: '200px' }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              variant="outline-primary"
              className="rounded-end-pill fw-bold shadow-sm px-4"
              onClick={handleSearchTopic}
            >
              <FaSearch className="me-2" /> Tìm
            </Button>
          </InputGroup>
        </Form>
      </div>

      {/* Danh sách chủ đề cũ */}
      <ListGroup variant="flush">
        {topicsToDisplay().map((item) => (
          <ListGroup.Item
            key={item._id}
            className="d-flex justify-content-between align-items-center border-0 mb-3 px-4 py-3 rounded-4"
            style={{
              backgroundColor: '#f0f2f5',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e2e6ea"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f0f2f5"}
          >
            <div>
              <Link
                to={`/ToprankingList?idtopic=${encodeURIComponent(item._id)}`}
                className="fw-bold d-flex align-items-center gap-2 text-dark fs-5"
                style={{ textDecoration: 'none' }}
              >
                📝 {item.title}
              </Link>
              <div className="text-muted small fs-6">
                {new Date(item.start_time).toLocaleString()} - {new Date(item.end_time).toLocaleString()}
              </div>
            </div>

            {item.check ? (
              <span className="badge bg-danger">Đã kết thúc</span>
            ) : (
              <span className="badge bg-success">Chưa kết thúc</span>
            )}


          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Thông báo nổi (toast) */}
      <AlertToast alert={alert} setAlert={setAlert} />
    </Container>
  );
};

export default TopicSection;
