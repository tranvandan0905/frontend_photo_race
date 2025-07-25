import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Spinner,
  Badge,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import { GetTopic, FindTopic, createtopic,updatetopic} from '../services/topic.services';
import { toast } from 'react-toastify';

const TopicManagement = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [newTopic, setNewTopic] = useState({
    title: '',
    start_time: '',
    end_time: '',
  });

  const fetchAllTopics = async () => {
    setLoading(true);
    try {
      const res = await GetTopic();
      setTopics(res || []);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách topic:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTitle.trim()) {
      fetchAllTopics();
      return;
    }
    try {
      const res = await FindTopic(searchTitle);
      setTopics(res || []);
    } catch (err) {
      console.error('Lỗi khi tìm topic:', err);
    }
  };

  const handleCreateTopic = async () => {
    try {
      setShowModal(false);
      await createtopic(newTopic);
      toast.success('Tạo chủ đề thành công!');
      setNewTopic({ title: '', start_time: '', end_time: '' });
      fetchAllTopics();
    } catch (err) {
      toast.error('Tạo chủ đề thất bại!');
      console.error(err);
    }
  };
const handleUpdateTopic = async () => {
  try {
    await updatetopic(editingTopic._id, editingTopic); // Gọi API update
    setShowEditModal(false);
    fetchAllTopics(); // Refresh danh sách
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
  }
};

  const isEnded = (endTime) => {
    if (!endTime) return false;
    return new Date(endTime) < new Date();
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Tạo chủ đề
        </Button>
      </div>

      <Form className="mb-4">
        <Row className="g-2">
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập tên chủ đề để tìm..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleSearch} className="w-100">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {topics.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  Không có chủ đề nào.
                </td>
              </tr>
            ) : (
              topics.map((topic) => {
                const ended = isEnded(topic.end_time);
                return (
                  <tr key={topic._id}>
                    <td>{topic.title}</td>
                    <td>
                      {topic.start_time
                        ? new Date(topic.start_time).toLocaleString('vi-VN')
                        : 'Chưa đặt'}
                    </td>
                    <td>
                      {topic.end_time
                        ? new Date(topic.end_time).toLocaleString('vi-VN')
                        : 'Chưa đặt'}
                    </td>
                    <td>
                      <Badge bg={ended ? 'secondary' : 'success'}>
                        {ended ? 'Đã kết thúc' : 'Đang diễn ra'}
                      </Badge>
                    </td>
                    <td>
                      <td>
                        {!ended && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => {
                              setEditingTopic(topic);
                              setShowEditModal(true);
                            }}
                          >
                            Chỉnh sửa
                          </Button>
                        )}
                      </td>

                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}

      {/* Modal tạo chủ đề */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Chủ Đề Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề..."
                value={newTopic.title}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="start_time" className="mb-3">
              <Form.Label>Thời gian bắt đầu</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newTopic.start_time}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, start_time: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="end_time" className="mb-3">
              <Form.Label>Thời gian kết thúc</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newTopic.end_time}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, end_time: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCreateTopic}>
            Tạo chủ đề
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Chỉnh sửa chủ đề</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {editingTopic && (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            value={editingTopic.title}
            onChange={(e) =>
              setEditingTopic({ ...editingTopic, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Thời gian bắt đầu</Form.Label>
          <Form.Control
            type="datetime-local"
            value={
              editingTopic.start_time
                ? new Date(editingTopic.start_time).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setEditingTopic({ ...editingTopic, start_time: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Thời gian kết thúc</Form.Label>
          <Form.Control
            type="datetime-local"
            value={
              editingTopic.end_time
                ? new Date(editingTopic.end_time).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setEditingTopic({ ...editingTopic, end_time: e.target.value })
            }
          />
        </Form.Group>
      </Form>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
      Hủy
    </Button>
    <Button variant="primary" onClick={handleUpdateTopic}>
      Lưu thay đổi
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default TopicManagement;
