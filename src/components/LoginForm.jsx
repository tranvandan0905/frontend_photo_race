import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Login } from "../services/auth.services";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ message: null, variant: "danger" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Login(form.email, form.password);
      if (res.token) {
        setAlert({ message: "Đăng nhập thành công!", variant: "success" });
        if (res.role === "admin") {
          setTimeout(() => {
            navigate('/AdminStatistic');
          }, 3000);
        }
        else {
          setTimeout(() => {
            navigate('/', { state: { loggedIn: true } });
          }, 3000);
        }
      }
      else {
        setAlert({ message: res.message, variant: "success" });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
        variant: "danger",
      });
    }
  };

  return (
    <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit}>
        {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email hoặc số điện thoại"
            value={form.email}
            onChange={handleChange}
            required
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

        <Button variant="primary" type="submit" className="w-100 fw-bold">
          Đăng nhập
        </Button>

        <div className="text-center mt-3 mb-2">

          <Link to="/password" className="text-decoration-none">Quên mật khẩu</Link>
        </div>

        <hr />

        <div className="text-center">
          <Link to="/register" className="text-dark me-4"><Button variant="success" className="fw-bold px-4">Tạo tài khoản mới</Button></Link>
        </div>
      </Form>
    </Card>
  );
}

export default LoginForm;
