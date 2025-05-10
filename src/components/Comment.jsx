import React, { useState } from 'react';
import { Form, Button, ListGroup, Row, Col, Image } from 'react-bootstrap';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => setComment(e.target.value);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setComments([...comments, { user: 'User', text: comment }]);
      setComment('');
    }
  };

  return (
    <>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Control
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button variant="primary" type="submit" className="mt-2">Post</Button>
      </Form>
      <ListGroup className="mt-3">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col xs={2}><Image src="user_avatar_url" roundedCircle width={30} /></Col>
              <Col xs={10}>
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Comment;
