import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Badge, Button, ButtonGroup, Form, Row, Col } from 'react-bootstrap';
import { FaUserShield, FaCoins, FaUser, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { getFindNameUser, getUser } from '../services/user.services';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(null); // null | "delete" | "role"
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
            const res = await getUser(check); // truyền check lên API
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
            <div className="text-center mb-4">
                <h3><FaUser /> Danh sách người dùng</h3>
            </div>


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
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Họ tên</th>
                            <th><FaCoins /> Xu</th>
                            <th><FaUserShield /> Vai trò</th>
                            <th><FaCalendarAlt /> Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">Không có người dùng nào.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
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
            )}
        </Container>
    );
};

export default UserManagement;
