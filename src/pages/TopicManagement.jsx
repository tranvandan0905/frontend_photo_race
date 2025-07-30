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
  Alert,
  Card,
} from 'react-bootstrap';
import { GetTopic, FindTopic, createtopic, updatetopic } from '../services/topic.services';
import { toast } from 'react-toastify';
import { FindTopic_sub, sumtotalscore, topranking } from '../services/topranking.services';
import { sumvoteSub, sumvotetopic } from '../services/interaction.services';

const TopicManagement = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showtoprankModal, setShowtoprankModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [showDoanhthu, setShowDoanhthu] = useState(false);
  const [sumsub, setsumssub] = useState(null);
    const [sumtoprank, setsumtoprank] = useState(null);
  const [sumtopic, setsumtopic] = useState(null);
  const [Showtop3Modal, setShowtop3Modal] = useState(false);
  const [listtoprank, setListTopranking] = useState([]);
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);
  const [vote, setVote] = useState(0);
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
  const handleGetTop = async () => {
    try {
      const response = await topranking(like, comment, vote);
      fetchAllTopics();
      if (response.errorCode !== 0) {
        setAlert({
          message: response.message || "Có lỗi xảy ra!",
          variant: "danger",
        });
        return;
      }


    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi hệ thống!";
      setAlert({ message: errorMessage, variant: "danger" });
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
      await updatetopic(editingTopic._id, editingTopic);
      setShowEditModal(false);
      fetchAllTopics();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };
  const handletop3Topic = async (topic_id) => {
    try {
      const res = await FindTopic_sub(topic_id);
      setListTopranking(res);
      setShowtop3Modal(true)
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };
  const isEnded = (endTime) => {
    if (!endTime) return false;
    return new Date(endTime) < new Date();
  };
  const sumtopranking = async (topic_id) => {
    try {
      const sub = await sumvoteSub(topic_id);
      const topic = await sumvotetopic(topic_id);
       const toprank = await sumtotalscore(topic_id);
      setsumtoprank(toprank.data)
      setsumssub(sub.data);
      setsumtopic(topic.data);

      setShowDoanhthu(true)
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };


  useEffect(() => {
    fetchAllTopics();
  }, []);

  return (
    <>
      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
      < Container className="mt-5" >
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

        {
          loading ? (
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
                        <td className="d-flex flex-column gap-2">
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

                          {ended && (
                            <Button variant="warning" size="sm"
                             onClick={() => {
                                sumtopranking(topic._id);
                              }}>
                              Xem doanh thu
                            </Button>
                          )}

                          {topic.check ? (
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => {
                                handletop3Topic(topic._id);
                               
                              }}
                            >
                              Xem top hạng
                            </Button>
                          ) : (
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => {
                                setEditingTopic(topic);
                                setShowtoprankModal(true);
                              }}
                            >
                              Xét hạng
                            </Button>

                          )}
                        </td>
                      </tr>
                    );
                  })


                )}
              </tbody>
            </Table>
          )
        }
        {/*Xet rank  */}
        <Modal className="mb-3 shadow-sm"
          dialogClassName="modal-xl" show={showtoprankModal} onHide={() => setShowtoprankModal(false)} centered>
          <Modal.Body>
            <h4 className="mb-3 text-center">Xét Xếp Hạng Người Chơi (Mặc Định tỉ lệ 1_2_5 )</h4>
            <Row>
              <Col md={3}>
                <Form.Group controlId="like">
                  <Form.Label>Like</Form.Label>
                  <Form.Control
                    type="number"
                    value={like}
                    onChange={(e) => setLike(e.target.value)}
                    placeholder="Số lượt like"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="number"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Số lượt comment"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="vote">
                  <Form.Label>Vote</Form.Label>
                  <Form.Control
                    type="number"
                    value={vote}
                    onChange={(e) => setVote(e.target.value)}
                    placeholder="Số lượt vote"
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button onClick={handleGetTop} className="w-100" variant="primary">
                  Xét top hạng
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        {/*Tạo topic */}
        < Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
        {/*Edit topic  */}
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
        {/*toprank topic  */}
        <Modal
          show={Showtop3Modal}
          onHide={() => setShowtop3Modal(false)}
          centered
          dialogClassName="modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold text-primary">TOP 3 Bài Viết Xuất Sắc</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row xs={1} md={3} className="g-4">
              {listtoprank.map((item, index) => (
                <Col key={index}>
                  <Card className="p-3 shadow-sm rounded-4 h-100">


                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-semibold">Tiêu đề</Form.Label>
                        <Form.Control
                          type="text"
                          value={item.submission.title}
                          readOnly
                          size="sm"
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="fw-semibold">Tổng điểm</Form.Label>
                        <Form.Control
                          type="number"
                          value={item.topranking.total_score}
                          readOnly
                          size="sm"
                        />
                      </Form.Group>

                      <div className="text-center mt-2">
                        <img
                          src={item.submission.image}
                          alt={item.submission.title}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </Form>
                  </Card>
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
        {/*Doanh thu  */}

       <Modal
  show={showDoanhthu}
  onHide={() => setShowDoanhthu(false)}
  centered
  dialogClassName="modal-lg"
>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold text-primary">
      💰 Thống kê doanh thu
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="px-4 py-3">
    <div className="d-flex flex-column gap-3 fs-5">
      <div className="d-flex justify-content-between">
        <span className="fw-semibold text-secondary">Tổng chi (Trao thưởng):</span>
        <span className="text-danger fw-bold">{(sumtoprank*1000).toLocaleString()} đ</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="fw-semibold text-secondary">Tổng thu (Lượt Vote):</span>
        <span className="text-success fw-bold">{((sumsub * 5 + sumtopic * 5)*1000).toLocaleString()} đ</span>
      </div>

      <div className="border-top pt-3 d-flex justify-content-between">
        <span className="fw-semibold text-dark">Doanh thu:</span>
        <span className="fw-bold text-primary">
          {((sumsub * 5 + sumtopic * 5 - sumtoprank)*1000).toLocaleString()} đ
        </span>
      </div>
    </div>
  </Modal.Body>
</Modal>

      </Container >
    </>);
};

export default TopicManagement;
