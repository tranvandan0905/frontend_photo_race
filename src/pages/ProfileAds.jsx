import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FindverID } from "../services/ad.services";
import { Link } from "react-router-dom";

const ProfileAds = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
   

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await FindverID(); 
                setProfile(res.data);
            } catch (err) {
                setError("Không thể lấy thông tin người dùng.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!profile) return null;

    return (
        <Card className="container mt-5 p-4 shadow">
            <h3 className="text-primary mb-4">Thông tin cá nhân</h3>
            <Row className="mb-2">
                <Col md={4}><strong>Họ tên:</strong></Col>
                <Col md={8}>{profile.name}</Col>
            </Row>
            <Row className="mb-2">
                <Col md={4}><strong>Email:</strong></Col>
                <Col md={8}>{profile.email}</Col>
            </Row>
            <Row className="mb-2">
                <Col md={4}><strong>Số điện thoại:</strong></Col>
                <Col md={8}>{profile.phone}</Col>
            </Row>
            <Row className="mb-2">
                <Col md={4}><strong>Tên công ty:</strong></Col>
                <Col md={8}>{profile.company_name || "Chưa cập nhật"}</Col>
            </Row>
            <Row className="mb-4">
                <Col md={4}><strong>Website:</strong></Col>
                <Col md={8}>{profile.website || "Chưa cập nhật"}</Col>
            </Row>

            <div className="text-end">
                <Link to="/EditAdsFrom" className="btn btn-primary">
                    Chỉnh sửa thông tin
                </Link>

            </div>
        </Card>
    );
};

export default ProfileAds;
