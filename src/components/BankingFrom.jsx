import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import {
  postDepositRequest,
  postWithdrawRequest,
  getDepositRequest,
  getWithdrawrequest,
} from "../services/banking.services";

const BankingFrom = () => {
  const [active, setActive] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [listDeposit, setListDeposit] = useState([]);
  const [listWithdraw, setListWithdraw] = useState([]);
  useEffect(() => {
    if (active === "history") {
      fetchDepositHistory();
      fetchWithdrawHistory();
    }
  }, [active]);

const fetchDepositHistory = async () => {
  const res = await getDepositRequest();
  setListDeposit(res?.data?.data || []);
};

const fetchWithdrawHistory = async () => {
  const res = await getWithdrawrequest();
  setListWithdraw(res?.data?.data || []);
};


  const handleDeposit = async () => {
    try {
      const amount = parseInt(depositAmount);
      if (!amount || amount < 50000) {
        alert("Số tiền nạp tối thiểu là 50.000 VNĐ!");
        return;
      }

      const result = await postDepositRequest({ amount });
      if (result?.payUrl) {
        window.location.href = result.payUrl;
      } else {
        alert("Không nhận được liên kết thanh toán!");
      }
    } catch (error) {
      console.error("Lỗi nạp tiền:", error);
      alert(error.response?.data?.message || "Nạp tiền thất bại!");
    }
  };

  const handleWithdraw = async () => {
    try {
      const amount = parseInt(withdrawAmount);
      if (!amount || amount < 100000) {
        alert("Số tiền rút tối thiểu là 100.000 VNĐ!");
        return;
      }
      if (!bank || !accountNumber) {
        alert("Vui lòng nhập đầy đủ ngân hàng và số tài khoản!");
        return;
      }

      const result = await postWithdrawRequest({
        bank,
        accountNumber,
        amount,
      });

      alert(result?.message || "Yêu cầu rút tiền đã được gửi!");
    } catch (error) {
      console.error("Lỗi rút tiền:", error);
      alert(error.response?.data?.message || "Rút tiền thất bại!");
    }
  };

  const convertStatus = (status) => {
    if (status === "success") return "Thành công";
    if (status === "pending") return "Đang xử lý";
    if (status === "contact_support") return "Liên hệ hỗ trợ";
    return "Không xác định";
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">💰 Quản lý Giao Dịch</h2>
        <Row>
          <Col md={3} className="border-end">
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={active}
              onSelect={(selectedKey) => setActive(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="deposit">Nạp Tiền</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="withdraw">Rút Tiền</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">Lịch Sử</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            {active === "deposit" && (
              <>
                <h4 className="text-success mb-3">💸 Nạp Tiền</h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Số tiền cần nạp</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Nhập số tiền"
                      />
                      <InputGroup.Text>VNĐ</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <div className="text-end">
                    <Button variant="success" onClick={handleDeposit}>
                      Nạp Ngay
                    </Button>
                  </div>
                </Form>
              </>
            )}

            {active === "withdraw" && (
              <>
                <h4 className="text-danger mb-3">🏦 Rút Tiền</h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn Ngân Hàng</Form.Label>
                    <Form.Select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                    >
                      <option value="">-- Chọn ngân hàng --</option>
                      <option value="vcb">Vietcombank</option>
                      <option value="acb">ACB</option>
                      <option value="mb">MB Bank</option>
                      <option value="tpb">TPBank</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số tài khoản</Form.Label>
                    <FormControl
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Nhập số tài khoản"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số tiền cần rút</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Nhập số tiền"
                      />
                      <InputGroup.Text>VNĐ</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="text-end">
                    <Button variant="danger" onClick={handleWithdraw}>
                      Rút Tiền
                    </Button>
                  </div>
                </Form>
              </>
            )}

            {active === "history" && (
              <>
                <h4 className="text-info mb-4">📜 Lịch Sử Giao Dịch</h4>
                {(() => {
                  const history = [
                    ...listDeposit.map((item) => ({
                      type: "Nạp",
                      amount: item.amount,
                      target: "-",
                      status: "success",
                      createdAt: item.createdAt,
                    })),
                    ...listWithdraw.map((item) => ({
                      type: "Rút",
                      amount: item.amount,
                      target: item.targetAccountInfo,
                      status: item.status,
                      createdAt: item.createdAt,
                    })),
                  ].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  );

                  return history.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table table-bordered table-hover align-middle">
                        <thead className="table-primary text-center">
                          <tr>
                            <th>#</th>
                            <th>Loại</th>
                            <th>Số tiền</th>
                            <th>Thông tin nhận</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map((item, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center">
                                <span
                                  className={`badge bg-${
                                    item.type === "Nạp" ? "success" : "danger"
                                  }`}
                                >
                                  {item.type}
                                </span>
                              </td>
                              <td>{item.amount.toLocaleString()} VNĐ</td>
                              <td>{item.target}</td>
                              <td className="text-center">
                                <span
                                  className={`badge bg-${
                                    item.status === "success"
                                      ? "success"
                                      : item.status === "pending"
                                      ? "warning"
                                      : "danger"
                                  }`}
                                >
                                  {convertStatus(item.status)}
                                </span>
                              </td>
                              <td>
                                {new Date(item.createdAt).toLocaleString(
                                  "vi-VN"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">Không có lịch sử giao dịch nào.</p>
                  );
                })()}
              </>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BankingFrom;
