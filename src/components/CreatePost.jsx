import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { FaImage, FaPen } from 'react-icons/fa';
import { PostSub } from '../services/submission.services';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) {
      setAlert({ type: 'danger', message: 'Vui lòng nhập tiêu đề và chọn ảnh!' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', image);

    try {
      await PostSub(formData);
      setAlert({ type: 'success', message: 'Đăng bài thành công!' });
      setTitle('');
      setImage(null);
      setPreview(null);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Đăng bài thất bại!' });
      console.error(err);
    }
  };

  return (
    <Card className="p-4 shadow-sm mt-5">
      <h4 className="mb-3 text-center">Đăng Bài Mới</h4>
      
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><FaPen className="me-2" />Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề bài đăng"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><FaImage className="me-2" />Ảnh</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <div className="mt-3">
              <Image src={preview} thumbnail width={200} />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">Đăng Bài</Button>
      </Form>
    </Card>
  );
}

export default CreatePost;
