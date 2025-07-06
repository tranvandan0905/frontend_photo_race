import React, { useState } from "react";
import { Card, Button, Form, InputGroup, FormControl, Nav, Row, Col } from "react-bootstrap";
import { postDepositRequest } from "../services/banking.services";
const BankingPage = () => {
    const [active, setActive] = useState("deposit");
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const handleDeposit = async () => {
        try {
            if (!depositAmount || parseInt(depositAmount) <= 0) {
                alert("Vui lòng nhập số tiền hợp lệ.");
                return;
            }

            const result = await postDepositRequest(depositAmount);
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
                                    <div className="d-flex justify-content-between">
                                        <Button variant="success" onClick={handleDeposit}>
                                            Nạp Ngay
                                        </Button>

                                        <Button variant="outline-info">Xem lịch sử nạp</Button>
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
                                        <Form.Select value={bank} onChange={(e) => setBank(e.target.value)}>
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
                                        <Button variant="danger">Rút Tiền</Button>
                                    </div>
                                </Form>
                            </>
                        )}

                        {active === "history" && (
                            <>
                                <h4 className="text-info mb-3">📜 Lịch Sử Giao Dịch</h4>
                                <p>Chức năng này sẽ hiển thị danh sách các giao dịch đã thực hiện.</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BankingPage;
