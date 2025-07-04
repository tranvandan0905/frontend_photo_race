import React, { useEffect, useState } from "react";
import {
  ListGroup, Spinner, Card, Button, Badge, Row, Col, Image,
  Modal, Form, Alert
} from "react-bootstrap";
import { GetAdsByAdvertiser, UpdateAds } from "../services/ad.services";

const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN");

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [formData, setFormData] = useState({ start_date: "", end_date: "" });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await GetAdsByAdvertiser();
      setAds(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy quảng cáo:", err);
      setAds([]);
    }
    setLoading(false);
  };

  const handleExtendClick = (ad) => {
    setSelectedAd(ad);
    setFormData({
      start_date: ad.end_date.slice(0, 10), // mặc định start sau end cũ
      end_date: ad.end_date.slice(0, 10),
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
       await UpdateAds(selectedAd._id, {
        start_date: formData.start_date,
        end_date: formData.end_date,
      });
      setAlert({ type: "success", message: "Gia hạn thành công!" });
      setShowModal(false);
      fetchAds();
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Gia hạn thất bại!",
      });
    }
  };

  return (
    <div className="mb-3 mt-5 container">
      {alert && <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>{alert.message}</Alert>}
      {loading && <Spinner animation="border" />}

      {!loading && ads.length > 0 && (
        <ListGroup className="mt-2">
          {ads.map((ad) => (
            <ListGroup.Item key={ad._id} className="mb-3 border rounded shadow-sm">
              <Row>
                <Col md={3}>
                  <Image
                    src={ad.image_url}
                    alt={ad.title}
                    fluid
                    rounded
                    style={{ maxHeight: "120px", objectFit: "cover" }}
                  />
                </Col>

                <Col md={6}>
                  <h5 className="text-primary fw-bold">{ad.title}</h5>
                  <p className="mb-1">{ad.content}</p>
                  <div className="text-muted" style={{ fontSize: "14px" }}>
                    <div><strong>Giá/ngày:</strong> {ad.price_per_day.toLocaleString()}₫</div>
                    <div><strong>Tổng chi phí:</strong> {ad.total_cost.toLocaleString()}₫</div>
                    <div><strong>Thời gian:</strong> {formatDate(ad.start_date)} - {formatDate(ad.end_date)}</div>
                    <div>
                      <strong>Trạng thái:</strong>{" "}
                      <Badge bg={
                        ad.status === "active" ? "success" :
                          ad.status === "pending" ? "warning" :
                            ad.status === "completed" ? "secondary" : "danger"
                      }>
                        {ad.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Col>

                <Col md={3} className="d-flex align-items-center justify-content-end">
                  {ad.is_extendable && ad.status === "completed" ? (
                    <Button variant="outline-primary" size="sm" onClick={() => handleExtendClick(ad)}>
                      Gia hạn
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      Không thể gia hạn
                    </Button>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {!loading && ads.length === 0 && (
        <Card className="mb-3 mt-5">
          <p className="mt-3 text-muted text-center">Không có đơn nào.</p>
        </Card>
      )}

      {/* Modal Gia Hạn */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gia hạn quảng cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Xác nhận gia hạn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdsList;
