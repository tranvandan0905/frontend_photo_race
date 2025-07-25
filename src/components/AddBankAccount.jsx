import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import { bankAcc, findbankAcc } from "../services/banking.services";

const AddBankAccount = () => {
  const [listbankacc, setListbankacc] = useState(null); // ban đầu là null để phân biệt trạng thái chưa fetch
  const [formData, setFormData] = useState({
    bank_name: "",
    name: "",
    account_number: "",
    transactionPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelistbank = async () => {
    try {
      const data = await findbankAcc();
      if (data?.data) {
        setListbankacc(data.data);
      } else {
        setListbankacc(null); 
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản:", error);
      setListbankacc(null);
    }
  };

  useEffect(() => {
    handelistbank();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await bankAcc(formData);
      if (result.errorCode === 0) {
        alert("Thêm tài khoản thành công!");
        setFormData({
          bank_name: "",
          name: "",
          account_number: "",
          transactionPassword: "",
        });
        handelistbank(); 
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Card className="p-4 shadow" style={{ maxWidth: "500px" }}>
          {listbankacc ? (
            <>
              <div className="mt-5">
  <h5 className="mb-4 text-center fw-bold text-primary">

    Thông tin tài khoản ngân hàng
  </h5>

  <div className="bg-light rounded-4 shadow-sm p-4">
    <div className="mb-3 d-flex align-items-center">

      <strong className="text-muted">Ngân hàng:</strong>
      <span className="ms-2 text-dark">{listbankacc.bank_name}</span>
    </div>

    <div className="mb-3 d-flex align-items-center">

      <strong className="text-muted">Chủ tài khoản:</strong>
      <span className="ms-2 text-dark">{listbankacc.name}</span>
    </div>

    <div className="mb-2 d-flex align-items-center">     <strong className="text-muted">Số tài khoản:</strong>
      <span className="ms-2 text-dark">{listbankacc.account_number}</span>
    </div>
  </div>
</div>
            </>
          ) : (
            <>
              <h5 className="mb-3 text-center">Thêm tài khoản ngân hàng</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngân hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tên chủ tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu giao dịch</Form.Label>
                  <Form.Control
                    type="password"
                    name="transactionPassword"
                    value={formData.transactionPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Thêm tài khoản
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Card>
      </Row>
    </Container>
  );
};

export default AddBankAccount;
