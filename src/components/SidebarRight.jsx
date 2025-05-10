
import { Card } from "react-bootstrap";

function SidebarRight() {
  return (
    <div>
      <Card className="mb-3">
        <Card.Header>📢 Quảng cáo</Card.Header>
        <Card.Body>
          <img src="/ads/banner1.jpg" alt="Ad" className="img-fluid rounded mb-2" />
          <p>Khuyến mãi hot hôm nay! Mua 1 tặng 1 💥</p>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Header>📅 Sự kiện</Card.Header>
        <Card.Body>
          <p>🔥 Cuộc thi đua top tuần: 01/05 - 07/05</p>
          <small className="text-muted">Tham gia ngay để nhận phần thưởng!</small>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>👥 Gợi ý kết bạn</Card.Header>
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <div>
              <strong>Trang Nhỏ</strong><br />
              <small>Kết nối chung: 3</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SidebarRight;
