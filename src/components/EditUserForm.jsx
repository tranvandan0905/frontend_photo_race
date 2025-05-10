
import { Form, Button, Card, Container,Image } from 'react-bootstrap';

const EditUserForm = () => {
  

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h4 className="mb-4 text-center">Chỉnh sửa thông tin người dùng</h4>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên"
              required
            />
          </Form.Group>

          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.Control type="file" accept="image/*" />
         
              <div className="mt-3">
                <Image  alt="Avatar Preview" thumbnail width={120} />
              </div>
            
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Để trống nếu không đổi"
            
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">Cập nhật</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditUserForm;
