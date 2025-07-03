import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetActiveAds } from "../services/ad.services";

function SidebarRight() {
  const [listAds, setListAds] = useState([]);
  useEffect(() => {
    getAds();
  }, []);

  const getAds = async () => {
    const ads = await GetActiveAds();
    if (ads)
      setListAds(ads.data);
    else
      setListAds([]);
  }
  return (
    <div>
      <Card className="mb-3">
        <Card.Header>📢 Quảng cáo</Card.Header>
        <Card.Body>
          {listAds.map((ad, index) => (
            <div key={index} className="mb-3">
              <a href={ad.target_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  style={{
                    height: "80px",
                    objectFit: "cover",
                    width: "70%",
                    display: "block",
                    margin: "0 auto"
                  }}
                  className="img-fluid rounded"
                />
              <h6 className="text-primary fw-bold text-center">{ad.title}</h6>
              </a>
              <p className="mb-1">{ad.content}</p>
              <hr />
            </div>
          ))}

          <div className="d-grid mt-4">

            <Link to="/loginAds" className="text-dark me-4">
              <Button variant="primary" className="w-100 mb-2">Quảng cáo với PhotoWar</Button></Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SidebarRight;
