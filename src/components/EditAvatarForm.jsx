import { useState } from 'react';
import { Form, Button, Card, Container, Image, Alert } from 'react-bootstrap';
import { Updateavatar } from '../services/user.services';

const EditAvatarForm = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [alert, setAlert] = useState({ message: null, variant: 'success' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) {
      setAlert({ message: 'Vui lòng chọn ảnh!', variant: 'danger' });
      return;
    }

    const formData = new FormData();
    formData.append('file', avatarFile);

    try {
      const res = await Updateavatar(formData);
      setAlert({ message: res.message || 'Cập nhật ảnh thành công!', variant: 'success' });
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || 'Cập nhật ảnh thất bại!',
        variant: 'danger',
      });
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h4 className="mb-4 text-center">Cập nhật ảnh đại diện</h4>

        {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />

            {previewUrl && (
              <div className="mt-3">
                <Image src={previewUrl} alt="Avatar Preview" thumbnail width={120} />
              </div>
            )}
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Cập nhật ảnh
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditAvatarForm;
