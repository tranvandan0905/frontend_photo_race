import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Spinner,
  Button,
  ButtonGroup,
  Row,
  Col,
  Badge,
  Image,
  ListGroup,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { GetActiveAdsall, GetAdsByAdvertiserAdmin, getallAd, adsadmin, getAdpayment } from '../services/ad.services';

const AdvertiserList = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [byIdAdvertisers, setByIdAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('advertiser');
  const [listallad, setlistallad] = useState([]);
  const [listallpayment, setlistallpayment] = useState([]);
  const statusOptions = ["pending", "active", "completed", "rejected"];
  const [editingAdId, setEditingAdId] = useState(null);
  const [status, setSelectedStatus] = useState('');
  const handleStartEditStatus = (adId, currentStatus) => {
    setEditingAdId(adId);
    setSelectedStatus(currentStatus);
  };
  const handleConfirmStatusUpdate = async (adId) => {
    try {
      await adsadmin(adId, status);
      const updatedList = await getallAd();
      setlistallad(updatedList.data);
    } catch (err) {
      alert('Không thể cập nhật trạng thái!');
    } finally {
      setEditingAdId(null);
      setSelectedStatus('');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetActiveAdsall();
        const data = await getallAd();
        const result = await getAdpayment();
        setAdvertisers(res);
        setlistallad(data.data);
        setlistallpayment(result)
      } catch (error) {
        console.error('Lỗi khi lấy advertiser:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatistics = async (id) => {
    try {
      const data = await GetAdsByAdvertiserAdmin(id);
      setByIdAdvertisers(data);
      setShowModal(true);
    } catch (error) {
      console.error('Lỗi khi lấy quảng cáo theo advertiser:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };


  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="mt-4">

      {/* Nút chọn chế độ xem */}
      <ToggleButtonGroup
        type="radio"
        name="viewMode"
        value={viewMode}
        onChange={setViewMode}
        className="mb-3"
      >
        <ToggleButton id="tbg-btn-1" value="advertiser" variant="outline-primary">
          Danh sách nhà quảng cáo
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value="ads" variant="outline-primary">
          Danh sách quảng cáo
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value="transactions" variant="outline-secondary">
          Thống kê giao dịch
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Nội dung hiển thị theo viewMode */}
      {viewMode === 'advertiser' && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Công ty</th>
              <th>Website</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {advertisers.map((adv, index) => (
              <tr key={adv._id} className={adv.deleted ? 'table-danger' : ''}>
                <td>{index + 1}</td>
                <td>{adv.name}</td>
                <td>{adv.email}</td>
                <td>{adv.phone}</td>
                <td>{adv.company_name}</td>
                <td>
                  <a href={adv.website} target="_blank" rel="noopener noreferrer">
                    {adv.website}
                  </a>
                </td>
                <td>{new Date(adv.created_at).toLocaleString('vi-VN')}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleStatistics(adv._id)}
                    >
                      Thống kê
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {viewMode === 'ads' && (
        <div className="mt-4">
          {listallad.length === 0 ? (
            <p className="text-muted">Không có quảng cáo nào.</p>
          ) : (
            <ListGroup>
              {listallad.map((ad) => (
                <ListGroup.Item key={ad._id} className="mb-3 border rounded shadow-sm">
                  <Row>
                    <Col md={3}>
                      <Image
                        src={ad.image_url}
                        alt={ad.title}
                        fluid
                        rounded
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col md={9}>
                      <h5 className="fw-bold text-primary">{ad.title}</h5>
                      <p className="mb-2">{ad.content}</p>
                      <Row className="mb-2">
                        <Col xs={12} sm={6}>
                          <small className="text-muted">
                            <strong>Thời gian:</strong><br />
                            {formatDate(ad.start_date)} - {formatDate(ad.end_date)}
                          </small>
                        </Col>
                        <Col xs={12} sm={6}>
                          <small className="text-muted">
                            <strong>Nhà quảng cáo:</strong><br />
                            {ad.advertiser_id?.name || 'Không xác định'}
                          </small>
                        </Col>
                      </Row>
                      <Row className="align-items-center">
                        <Col xs={12} sm={6}>
                          <small className="text-muted">
                            <strong>Trạng thái:</strong>{' '}
                            <Badge bg={
                              ad.status === 'completed' ? 'secondary' :
                                ad.status === 'active' ? 'success' :
                                  ad.status === 'pending' ? 'warning' :
                                    ad.status === 'rejected' ? 'danger' : 'dark'
                            }>
                              {ad.status}
                            </Badge>
                          </small>
                        </Col>
                        <Col xs={12} sm={6} className="text-end">
                          {editingAdId === ad._id ? (
                            <div className="d-flex align-items-center justify-content-end gap-2">
                              <select
                                className="form-select form-select-sm w-auto"
                                value={status}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                              >
                                {statusOptions.map((status) => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleConfirmStatusUpdate(ad._id)}
                              >
                                ✅
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setEditingAdId(null)}
                              >
                                ❌
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => {
                                setEditingAdId(ad._id);
                                setSelectedStatus(ad.status);
                              }}
                            >
                              Cập nhật trạng thái
                            </Button>
                          )}
                        </Col>

                      </Row>


                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      )}

      {viewMode === 'transactions' && (
        <div className="mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên nhà quảng cáo</th>
                <th>Email</th>
                <th>Công ty</th>
                <th>Giá/ngày</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {listallpayment.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Không có giao dịch nào.
                  </td>
                </tr>
              ) : (
                listallpayment.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.advertiser_id?.name}</td>
                    <td>{item.advertiser_id?.email}</td>
                    <td>{item.advertiser_id?.company_name}</td>
                    <td>{item.price_per_day?.toLocaleString('vi-VN')} đ</td>
                    <td>{item.amount?.toLocaleString('vi-VN')} đ</td>
                    <td className="text-center">
                      <Badge
                        bg={
                          item.status === 'completed'
                            ? 'success'
                            : item.status === 'pending'
                              ? 'warning'
                              : item.status === 'rejected'
                                ? 'danger'
                                : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      {item.paid_at
                        ? new Date(item.paid_at).toLocaleString('vi-VN')
                        : 'Chưa thanh toán'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </Table>
        </div>
      )}

      {/* MODAL DANH SÁCH QUẢNG CÁO */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {byIdAdvertisers.length === 0 ? (
            <p className="text-muted">Không có quảng cáo nào.</p>
          ) : (
            <ListGroup>
              {byIdAdvertisers.map((ad) => (
                <ListGroup.Item key={ad._id} className="mb-3 border rounded shadow-sm">
                  <Row>
                    <Col md={3}>
                      <Image
                        src={ad.image_url}
                        alt={ad.title}
                        fluid
                        rounded
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col md={9}>
                      <h5 className="fw-bold text-primary">{ad.title}</h5>
                      <p className="mb-2">{ad.content}</p>
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
                              ad.status === 'completed' ? 'secondary' :
                                ad.status === 'active' ? 'success' :
                                  ad.status === 'pending' ? 'warning' :
                                    ad.status === 'rejected' ? 'danger' : 'dark'
                            }>
                              {ad.status}
                            </Badge>
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdvertiserList;
