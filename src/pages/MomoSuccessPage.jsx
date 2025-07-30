
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
const MomoSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-5 text-center" style={{ maxWidth: "500px" }}>
        <h2 className="text-success mb-4">🎉 Thanh Toán Thành Công!</h2>
        <p className="mb-3">Cảm ơn bạn đã thực hiện giao dịch qua MoMo.</p>
        <p className="text-muted">Thông tin sẽ được cập nhật vào tài khoản của bạn.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Quay về Trang chủ
        </Button>
      </Card>
    </div>
  );
};

export default MomoSuccessPage;
