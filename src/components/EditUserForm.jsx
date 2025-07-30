import { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Updateuser } from '../services/user.services';

const EditUserForm = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
    passwordnew: '',
  });

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', form);

    try {
      const res = await Updateuser(form);
      setMessage(res.message || 'Cập nhật thành công!');
      setVariant('success');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Cập nhật thất bại!');
      setVariant('danger');
    }
  };

  return (
    <Container className="mt-5">
      <Card
        className="p-4 shadow-lg rounded-4 mx-auto"
        style={{ maxWidth: '500px' }}
      >
        <h4 className="mb-4 text-center text-primary fw-bold">
          Chỉnh sửa thông tin cá nhân
        </h4>

        {message && (
          <Alert variant={variant} className="text-center">
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCurrentPassword" className="mb-3">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu hiện tại để xác minh"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPasswordNew" className="mb-3">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Để trống nếu không đổi"
              name="passwordnew"
              value={form.passwordnew}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Cập nhật thông tin
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditUserForm;
