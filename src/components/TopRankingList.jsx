import { useState, useEffect } from "react";
import { Card, Row, Col, Container, Badge } from "react-bootstrap";
import { FindTopic_sub } from "../services/topranking.services";
import { useSearchParams } from "react-router-dom";

const TopRankingList = () => {
    const [listtoprank, setListTopranking] = useState([]);
    const [searchParams] = useSearchParams();
    const topic_id = searchParams.get("idtopic");

    useEffect(() => {
        const fetchToprank = async () => {
            try {
                const res = await FindTopic_sub(topic_id);
                setListTopranking(res);
            } catch (err) {
                setListTopranking([]);
            }
        };

        if (topic_id) fetchToprank();
    }, [topic_id]);

    const getBadgeVariant = (index) => {
        const colors = ["danger", "secondary", "info"];
        return colors[index] || "dark";
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-5 fw-bold text-warning" style={{ fontSize: "32px", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>
                🏆 Top 3 Bài Dự Thi Xuất Sắc 🏆
            </h2>

            <Row xs={1} md={3} className="g-4 justify-content-center">
                {listtoprank.map((item, index) => (
                    <Col key={index}>
                        <div className="position-relative hover-scale">
                            <Badge
                                bg={getBadgeVariant(index)}
                                className="position-absolute top-0 start-0 m-2 px-3 py-1 rounded-pill"
                                style={{ fontSize: "0.85rem" }}
                            >
                                TOP {index + 1}
                            </Badge>

                            <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
                                <Card.Img
                                    variant="top"
                                    src={item.submission.image}
                                    alt={item.submission.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title className="fw-semibold" style={{ fontSize: "20px", color: "#34495e" }}>
                                        {item.submission.title}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: "16px", color: "#555" }}>
                                        <strong>Điểm:</strong> {item.topranking.total_score}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Hover animation */}
            <style>{`
                .hover-scale {
                    transition: transform 0.3s ease-in-out;
                }
                .hover-scale:hover {
                    transform: scale(1.03);
                }
            `}</style>
        </Container>
    );
};

export default TopRankingList;
