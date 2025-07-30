import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaFileAlt, FaUserPlus, FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import {
    getPostDepositRequestCountByDateRange,
    getPostWithdrawRequestCountByDateRange,
    getPostUserCountByDateRange,
    getPostCountByDateRange
} from "../services/admin";

const AdminStatistic = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [results, setResults] = useState(null);

    const handleStatistic = async () => {
        try {
            const depositRes = await getPostDepositRequestCountByDateRange({ startDate, endDate });
            const withdrawRes = await getPostWithdrawRequestCountByDateRange({ startDate, endDate });
            const userRes = await getPostUserCountByDateRange({ startDate, endDate });
            const subRes = await getPostCountByDateRange({ startDate, endDate });
            console.log(withdrawRes)
            setResults({
                deposit: depositRes.data,
                withdraw: withdrawRes.data,
                users: userRes.data,
                posts: subRes.data
            });
        } catch (error) {
            console.error("Lỗi thống kê:", error);
        }
    };

    return (
        <Container>
            <Container className="d-flex justify-content-center ">
                <Card className="p-4 shadow w-50 ">
                    <div className="text-center mb-4">
                        <h4 className="mb-3 text-primary fw-bold">📊 Thống kê dữ liệu hệ thống</h4>
                    </div>

                    <Row className="mb-3">
                        <Col md={12} className="mb-3">
                            <Form.Label>Ngày bắt đầu</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Col>
                        <Col md={12}>
                            <Form.Label>Ngày kết thúc</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Button onClick={handleStatistic} className="w-100 mt-2" variant="primary">
                        Thống kê
                    </Button>
                </Card>
            </Container>


            {results && (
                <>
                    <Row className="mt-4">
                        <Col md={3}>
                            <Card className="p-3 text-success shadow">
                                <FaArrowCircleUp size={28} />
                                <h6 className="mt-2">Tổng tiền nạp:</h6>
                                <strong>{(results.deposit?.totalAmount * 1000).toLocaleString('vi-VN')} VNĐ</strong>


                                <p className="mb-0">Lượt nạp: {results.deposit?.totalCount}</p>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="p-3 text-danger shadow">
                                <FaArrowCircleDown size={28} />
                                <h6 className="mt-2">Yêu cầu rút tiền:</h6>

                                <p className="mb-1">
                                    ⏳ Chờ xử lý: {results.withdraw?.pending.count} lượt (
                                    {(results.withdraw?.pending.totalAmount * 1000).toLocaleString('vi-VN')} VNĐ)
                                </p>

                                <p className="mb-1">
                                    ✅ Thành công: {results.withdraw?.success.count} lượt (
                                    {(results.withdraw?.success.totalAmount * 1000).toLocaleString('vi-VN')} VNĐ)
                                </p>

                                <p className="mb-0">
                                    ❌ Cần hỗ trợ: {results.withdraw?.contact_support.count} lượt (
                                    {(results.withdraw?.contact_support.totalAmount * 1000).toLocaleString('vi-VN')} VNĐ)
                                </p>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="p-3 text-info shadow">
                                <FaUserPlus size={28} />
                                <h6 className="mt-2">Người dùng đăng ký:</h6>
                                <strong>{results.users} người</strong>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="p-3 text-warning shadow">
                                <FaFileAlt size={28} />
                                <h6 className="mt-2">Tổng bài đăng:</h6>
                                <strong>{results.posts} bài</strong>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default AdminStatistic;
