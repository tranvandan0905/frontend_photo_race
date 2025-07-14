import React, { useEffect, useState } from "react";
import {
  ListGroup, Spinner, Card, Button, Badge, Row, Col, Image,
  Modal, Form, Alert
} from "react-bootstrap";
import { GetAdsByAdvertiser, UpdateAds, GetPaymentADS } from "../services/ad.services";

const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN");

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [visibleAdId, setVisibleAdId] = useState(null);

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
  const handGetByIDBayment = async (id) => {
    if (visibleAdId === id) {
      setVisibleAdId(null);
      setPayments([]);
      return;
    }

    try {
      const res = await GetPaymentADS(id);
      setPayments(res.data || []);
      setVisibleAdId(id);
    } catch (error) {
      setPayments([]);
      setVisibleAdId(id);
    }
  };


  const handleUpdate = async () => {
    try {
      const result = await UpdateAds(selectedAd._id, {
        start_date: formData.start_date,
        end_date: formData.end_date,
      });
      if (result?.payUrl) {
        window.location.href = result.payUrl;
      } else {

        setAlert({ variant: 'danger', message: 'Không nhận được liên kết thanh toán!' });
      }
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
                  <h5 className="fw-bold text-primary mb-2">{ad.title}</h5>

                  <p className="mb-2 text-dark">{ad.content}</p>

                  <Row className="mb-2">
                    <Col xs={12} sm={6}>
                      <small className="text-muted">
                        <strong>Thời gian:</strong><br />
                        {formatDate(ad.start_date)} - {formatDate(ad.end_date)}
                      </small>
                    </Col>
                    <Col xs={12} sm={6}>
                      <small className="text-muted">
                        <strong>Trạng thái:</strong><br />
                        <Badge bg={
                          ad.status === "completed" ? "secondary" :
                            ad.status === "active" ? "success" :
                              ad.status === "pending" ? "warning" :
                                ad.status === "rejected" ? "danger" :
                                  "dark"
                        }>
                          {ad.status}
                        </Badge>
                      </small>
                    </Col>
                  </Row>

                  <Button
                    variant={visibleAdId === ad._id ? "outline-danger" : "outline-primary"}
                    size="sm"
                    onClick={() => handGetByIDBayment(ad._id)}
                    className="mt-2"
                  >
                    {visibleAdId === ad._id ? "Ẩn lịch sử" : "📜 Lịch sử thanh toán"}
                  </Button>
                </Col>


                <Col md={3} className="d-flex align-items-center justify-content-end">
                  {(() => {
                    switch (ad.status) {
                      case "completed":
                        return (
                          <Button variant="outline-primary" size="sm" onClick={() => handleExtendClick(ad)}>
                            Gia hạn
                          </Button>
                        );

                      case "active":
                        return (
                          <Button variant="success" size="sm" disabled>
                            Đang hiển thị
                          </Button>
                        );

                      case "pending":
                        return (
                          <Button variant="warning" size="sm" disabled>
                            Chờ duyệt
                          </Button>
                        );

                      case "rejected":
                        return (
                          <Button variant="danger" size="sm" disabled>
                            Đã từ chối
                          </Button>
                        );

                      default:
                        return (
                          <Button variant="secondary" size="sm" disabled>
                            Không rõ trạng thái
                          </Button>
                        );
                    }
                  })()}

                </Col>
              </Row>
              {/* Lịch sử thanh toán hiển thị nếu ad đang được chọn */}
              {visibleAdId === ad._id && (
                <Card className="mt-3">
                  <Card.Body>
                    <h6 className="fw-bold text-primary mb-2">Lịch sử thanh toán:</h6>
                    {payments.length === 0 ? (
                      <p className="text-muted">Không có lịch sử thanh toán.</p>
                    ) : (
                      <ListGroup>
                        {payments.map((payment, idx) => (
                          <ListGroup.Item key={idx} className="border-0 border-bottom">
                            <Row className="align-items-center">
                              <Col md={3}><strong>Số tiền:</strong> <span className="text-success">{payment.amount.toLocaleString()}đ</span></Col>
                              <Col md={3}><strong>Giá/ngày:</strong> <span>{payment.price_per_day.toLocaleString()}đ</span></Col>
                              <Col md={3}>
                                <strong>Trạng thái:</strong>{" "}
                                <Badge bg={
                                  payment.status === 'success' ? 'success' :
                                    payment.status === 'failed' ? 'danger' : 'warning'
                                }>
                                  {payment.status}
                                </Badge>
                              </Col>
                              <Col md={3}><strong>Ngày thanh toán:</strong> {formatDate(payment.paid_at)}</Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Card.Body>
                </Card>
              )}


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
