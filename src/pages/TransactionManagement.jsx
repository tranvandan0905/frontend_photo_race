import React, { useEffect, useState } from 'react';
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
} from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
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

  const getDepositList = async () => {
    const res = await GetALLDepositRequest();
    setDepositList(res.data || []);
  };

  const getWithdrawList = async () => {
    const res = await GetALLWithdrawRequest();
    setWithdrawList(res.data || []);
  };

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

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container>
      <h3 className="text-center my-4"><FaCoins /> Quản lý giao dịch</h3>

      {/* Tabs nút chuyển */}
  <Row className="mb-3">
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
  </Row>

      {/* Danh sách đơn nạp */}
      {activeTab === 'deposit' && (
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày nạp</th>
                </tr>
              </thead>
              <tbody>
                {depositList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.user_id}</td>
                    <td>{item.amount.toLocaleString('vi-VN')} VNĐ</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.createdAt).toLocaleString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* Danh sách đơn rút */}
      {activeTab === 'withdraw' && (
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Số điểm rút</th>
                  <th>Trạng thái</th>
                  <th>Ngày rút</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {withdrawList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.user_id}</td>
                    <td>{item.totalScore}</td>
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
          </Col>
        </Row>
      )}

      {/* Modal cập nhật trạng thái */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán đơn rút</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bankInfo ? (
            <>
              <p><strong>Chủ tài khoản:</strong> {bankInfo.name}</p>
              <p><strong>Ngân hàng:</strong> {bankInfo.bank_name}</p>
              <p><strong>Số tài khoản:</strong> {bankInfo.account_number}</p>

              <Form.Group className="mt-3">
                <Form.Label>Chọn trạng thái</Form.Label>
                <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="success" onClick={handleUpdateStatus}>Cập nhật</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionManagement;
