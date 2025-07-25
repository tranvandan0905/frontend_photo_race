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
                console.log(res);
               setListTopranking(res.slice(0, 3));
            } catch (err) {
                setListTopranking([]);
            }
        };

        if (topic_id) {
            fetchToprank();
        }
    }, [topic_id]);

    const getBadgeVariant = (index) => {
        const colors = ["warning", "secondary", "info"];
        return colors[index] || "dark";
    };

    return (
        <Container className="mt-5">
            <h2
                className="text-center mb-5"
                style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#e67e22",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    fontFamily: "'Segoe UI', sans-serif",
                    letterSpacing: "1px",
                    marginTop: "100px",
                }}
            >
                🏆 Top 3 Bài Dự Thi Đạt Giải 🏆
            </h2>

            <Row xs={1} md={3} className="g-4">
                {listtoprank
                    .map((item, index) => (
                        <Col key={index}>
                            <div
                                className="position-relative"
                                style={{
                                    transition: "transform 0.3s ease",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Badge góc trái */}
                                <Badge
                                    bg={getBadgeVariant(index)}
                                    className="position-absolute"
                                    style={{ top: "10px", left: "10px", fontSize: "0.9rem" }}
                                >
                                    TOP {index + 1}
                                </Badge>

                                <Card
                                    className="shadow"
                                    style={{
                                        borderRadius: "15px",
                                        overflow: "hidden",
                                        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={item.submission.image}
                                        alt={item.submission.title}
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title
                                            style={{
                                                fontSize: "24px",
                                                fontWeight: "600",
                                                color: "#2c3e50",
                                            }}
                                        >
                                            {item.submission.title}
                                        </Card.Title>
                                        <Card.Text style={{ fontSize: "18px" }}>
                                            <strong>Điểm:</strong> {item.topranking.total_score}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default TopRankingList;
