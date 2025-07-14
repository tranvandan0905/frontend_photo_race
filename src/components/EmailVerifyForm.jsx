import { useState } from "react";
import { Alert, Button, Card, FormControl } from "react-bootstrap";
import { emailpassword } from "../services/user.services";

function EmailVerifyForm() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: null, variant: "danger" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await emailpassword(email);
      setAlert({ message: res.data.message, variant: "success" });
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra!",
        variant: "danger",
      });
    }
  };

  return (
    <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
      <form onSubmit={handleSubmit}>
        {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

        <FormControl
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
          required
        />

        <Button type="submit" className="w-100 fw-bold">
          Xác thực email
        </Button>
      </form>
    </Card>
  );
}

export default EmailVerifyForm;
