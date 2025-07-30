import React, { useEffect, useState } from 'react';
import avatar from "../assets/avata.jpg";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Form,
  ButtonGroup,
  Image
} from 'react-bootstrap';
import {
  GetALLDepositRequest,
  GetALLWithdrawRequest,
  updatewithdrawRequet,
  findbankAccadmin
} from '../services/banking.services';

const TransactionManagement = () => {
  const [depositList, setDepositList] = useState([]);
  const [withdrawList, setWithdrawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [newStatus, setNewStatus] = useState('success');

  const [activeTab, setActiveTab] = useState('deposit');

  // Lấy danh sách đơn nạp
  const getDepositList = async () => {
    try {
      const res = await GetALLDepositRequest();
      setDepositList(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy đơn nạp:", err);
      setDepositList([]);
    }
  };

  // Lấy danh sách đơn rút
  const getWithdrawList = async () => {
    try {
      const res = await GetALLWithdrawRequest();
      setWithdrawList(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy đơn rút:", err);
      setWithdrawList([]);
    }
  };

  // Xử lý thanh toán đơn rút
  const handlePayWithdraw = async (withdraw) => {
    try {
      setSelectedWithdraw(withdraw);
      const res = await findbankAccadmin(withdraw.user_id);
      setBankInfo(res.data);
      setShowModal(true);
    } catch (error) {
      alert("Không lấy được thông tin tài khoản ngân hàng!");
    }
  };

  // Cập nhật trạng thái đơn rút
  const handleUpdateStatus = async () => {
    try {
      await updatewithdrawRequet(selectedWithdraw._id, newStatus);
      alert("Cập nhật trạng thái thành công!");
      setShowModal(false);
      setSelectedWithdraw(null);
      await getWithdrawList();
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDepositList();
      await getWithdrawList();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  const totalAmount =
    activeTab === 'deposit'
      ? depositList
          .filter(item => item.status === 'success')
          .reduce((sum, item) => sum + (item.amount || 0), 0)
      : withdrawList
          .filter(item => item.status === 'success')
          .reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <Container  className="mt-5">
      <Row className="mb-3 align-items-center">
        <Col className="text-start">
          <ButtonGroup>
            <Button
              variant={activeTab === 'deposit' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('deposit')}
            >
              Đơn nạp
            </Button>
            <Button
              variant={activeTab === 'withdraw' ? 'success' : 'outline-success'}
              onClick={() => setActiveTab('withdraw')}
            >
              Đơn rút
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="text-end">
          <h5 className="mb-0">
            Tổng tiền:{' '}
            <span className="text-success fw-bold">
              {(totalAmount*1000).toLocaleString('vi-VN')} VNĐ
            </span>
          </h5>
        </Col>
      </Row>

      {/* Danh sách đơn nạp */}
      {activeTab === 'deposit' && (
        <Row>
          <Col>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table striped bordered hover responsive className="mb-0">
                <thead
                  className="table-light"
                  style={{ position: 'sticky', top: 0, zIndex: 1 }}
                >
                  <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>User</th>
              
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                    <th>Ngày nạp</th>
                  </tr>
                </thead>
                <tbody>
                  {depositList.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={item.user.image || avatar}
                          roundedCircle
                          width={54}
                          height={54}
                          className="me-2 border"
                        />
                      </td>
                      <td>{item.user.name}</td>
              
                      <td>{(item.amount*1000).toLocaleString('vi-VN')} VNĐ</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.createdAt).toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}

      {/* Danh sách đơn rút */}
      {activeTab === 'withdraw' && (
        <Row>
          <Col>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table striped bordered hover responsive className="mb-0">
                <thead
                  className="table-light"
                  style={{ position: 'sticky', top: 0, zIndex: 1 }}
                >
                  <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>User</th>
                    <th>Số tiền rút</th>
                    <th>Trạng thái</th>
                    <th>Ngày rút</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawList.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={item.user.image || avatar}
                          roundedCircle
                          width={54}
                          height={54}
                          className="me-2 border"
                        />
                      </td>
                      <td>{item.user.name}</td>
                      <td>{(item.amount*1000).toLocaleString('vi-VN')} VNĐ</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.createdAt).toLocaleString('vi-VN')}</td>
                      <td>
                        {item.status === 'pending' && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handlePayWithdraw(item)}
                          >
                            Thanh toán
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}

      {/* Modal cập nhật trạng thái đơn rút */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán đơn rút</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bankInfo ? (
            <>
              <p>
                <strong>Chủ tài khoản:</strong> {bankInfo.name}
              </p>
              <p>
                <strong>Ngân hàng:</strong> {bankInfo.bank_name}
              </p>
              <p>
                <strong>Số tài khoản:</strong> {bankInfo.account_number}
              </p>
              <Form.Group className="mt-3">
                <Form.Label>Chọn trạng thái</Form.Label>
                <Form.Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="success">success</option>
                  <option value="contact_support">contact_support</option>
                </Form.Select>
              </Form.Group>
            </>
          ) : (
            <p>Đang tải thông tin tài khoản...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleUpdateStatus}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionManagement;
