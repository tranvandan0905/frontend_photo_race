import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Badge, Button, ButtonGroup, Form, Row, Col, Image, Card } from 'react-bootstrap';
import { FaUserShield, FaCoins, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { getFindNameUser, getUser } from '../services/user.services';
import avatar from "../assets/avata.jpg";
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(null); 
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        if (searchName.trim()) {
            handleSearch();
        } else {
            fetchUsers(filter);
        }
    }, [filter]);

    const fetchUsers = async (check = null) => {
        setLoading(true);
        try {
            const res = await getUser(check); 
            setUsers(res.data || []);
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await getFindNameUser(searchName.trim());
            setUsers(res.data || []);
        } catch (error) {
            console.error("Lỗi khi tìm người dùng:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="align-items-center mb-3">
                <Col md={8}>
                    <ButtonGroup>
                        <Button variant={filter === null ? "primary" : "outline-primary"} onClick={() => setFilter(null)}>
                            Tất cả
                        </Button>
                        <Button variant={filter === "delete" ? "primary" : "outline-primary"} onClick={() => setFilter("delete")}>
                            Tài khoản VHH
                        </Button>
                        <Button variant={filter === "role" ? "primary" : "outline-primary"} onClick={() => setFilter("role")}>
                            Admin
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col md={4}>
                    <Form className="d-flex" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
                        <Form.Control
                            type="text"
                            placeholder="Tìm theo tên..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Button variant="success" type="submit" className="ms-2">
                            <FaSearch />
                        </Button>
                    </Form>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Card className="shadow-sm">
                    <Card.Body>
                        <h4>Danh sách người dùng</h4>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {/* Header cố định */}
                            <Table striped bordered hover responsive className="mb-0">
                                <thead className="table-header">
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Email</th>
                                        <th>Họ tên</th>
                                        <th><FaCoins /> Xu</th>
                                        <th><FaUserShield /> Vai trò</th>
                                        <th><FaCalendarAlt /> Ngày tạo</th>
                                    </tr>
                                </thead>


                                {/* Phần tbody cuộn riêng */}


                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center">Không có người dùng nào.</td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>
                                                    <Col xs="auto">
                                                        <Image
                                                            src={user.image || avatar}
                                                            roundedCircle
                                                            width={54}
                                                            height={54}
                                                            className="me-3 border"
                                                        />
                                                    </Col>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td>{user.xu?.toLocaleString('vi-VN') || 0} xu</td>
                                                <td>
                                                    <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td>{new Date(user.created_at).toLocaleString('vi-VN')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>


                            </Table>
                        </div>
                    </Card.Body>
                </Card>

            )}
        </Container>
    );
};

export default UserManagement;
