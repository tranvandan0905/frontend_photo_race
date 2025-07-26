import React, { useEffect, useState } from 'react';
import { Container, Table, Card, Spinner } from 'react-bootstrap';
import { GetTopranking,  } from '../services/topranking.services';
import avatar from "../assets/avata.jpg"
const RankingManager = () => {
    const [alltopranking, setAllTopranking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopranking();
    }, []);

    const getTopranking = async () => {
        const listtopic = await GetTopranking();
        const latest = listtopic.data;
        setAllTopranking(latest);
        setLoading(false);
    };



    if (loading)
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    return (
        <>

            <Container className="py-4">
             

                <Card className="shadow-sm " style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <Card.Body>
                        <h4>Bảng Xếp Hạng</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>avatar</th>
                                    <th>name</th>
                                    <th>Tổng điểm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alltopranking.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">
                                            Chưa có người chơi nào được xét xếp hạng.
                                        </td>
                                    </tr>
                                ) : (
                                    alltopranking.map((player, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td> <img src={player.avatar || avatar} alt="avatar" width="40" height="40" className="rounded-circle" /></td>
                                            <td> <strong>{player.user_name}</strong></td>
                                            <td> <small>Tổng điểm: {player.totalScore}</small></td>


                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>);
};

export default RankingManager;
