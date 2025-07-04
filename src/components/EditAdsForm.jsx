import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { FindverID, Updateadver } from "../services/ad.services";

const EditAdsForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    website: "",
    password: "",
    passwordnew: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await FindverID();
        setForm((prev) => ({
          ...prev,
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          company_name: res.data.company_name || "",
          website: res.data.website || "",
        }));
      } catch (err) {
        setAlert({ type: "danger", message: "Không thể tải dữ liệu." });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    if (!form.password) {
      return setAlert({ type: "danger", message: "Vui lòng nhập mật khẩu hiện tại để xác nhận." });
    }

    try {
      setLoading(true);
      await Updateadver(form);
      setAlert({ type: "success", message: "Cập nhật thông tin thành công!" });
    } catch (err) {
      const msg = err.response?.data?.message || "Cập nhật thất bại.";
      setAlert({ type: "danger", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow w-50">
        <h4 className="mb-4 text-primary text-center">Chỉnh sửa thông tin cá nhân</h4>

        {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control type="text" name="name" value={form.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tên công ty</Form.Label>
            <Form.Control type="text" name="company_name" value={form.company_name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" name="website" value={form.website} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Mật khẩu hiện tại <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu mới (nếu muốn đổi)</Form.Label>
            <Form.Control type="password" name="passwordnew" value={form.passwordnew} onChange={handleChange} />
          </Form.Group>

          <div className="text-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Lưu thay đổi"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditAdsForm;
