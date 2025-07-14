import { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAd } from "../services/ad.services";

function CreateAdForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
    target_url: "",
    start_date: "",
    end_date: "",
  });

  const [alert, setAlert] = useState({ message: null, variant: "danger" });
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: value,
  });
};


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
           const result =  await createAd(form);
           if (result?.payUrl) {
             window.location.href = result.payUrl;
           } else {
     
            setAlert({ variant: 'danger', message: 'Không nhận được liên kết thanh toán!' });
           }
    } catch (error) {
  
     setAlert({ variant: 'danger', message:  error.response?.data?.message || "Xóa bài viết thất bại!", });

    }
  };
  return (
    <Card className="p-4 shadow" style={{ maxWidth: "600px", margin: "auto" }}>
      <h4 className="mb-3">Tạo Quảng Cáo Mới</h4>
      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL ảnh</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Link điều hướng</Form.Label>
          <Form.Control
            type="text"
            name="target_url"
            value={form.target_url}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

     
        <Button type="submit" variant="primary" className="w-100">
          Đăng Quảng Cáo
        </Button>
      </Form>
    </Card>
  );
};
export default CreateAdForm;
