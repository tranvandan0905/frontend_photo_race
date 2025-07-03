import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerAds } from "../services/auth.services";

function RegisterAdsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company_name: "",
    website: "",
  });

  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setAlert({
        message: "Mật khẩu không khớp!",
        variant: "danger",
      });
    }

    try {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        company_name: form.company_name,
        website: form.website,
      };

      const res = await registerAds(data);
      if (res && res.message) {
        setAlert({ message: res.message, variant: "success" });
        setTimeout(() => {
          navigate("/loginAds");
        }, 3000);
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra!",
        variant: "danger",
      });
    }
  };

  return (
    <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
      <Form onSubmit={handleSubmit}>
        {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="company_name"
            placeholder="Tên công ty"
            value={form.company_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="url"
            name="website"
            placeholder="Website (nếu có)"
            value={form.website}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100 fw-bold">
          Đăng ký
        </Button>
      </Form>
    </Card>
  );
}

export default RegisterAdsForm;
