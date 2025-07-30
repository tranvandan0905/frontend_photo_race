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
    if (ads) setListAds(ads.data);
    else setListAds([]);
  };

  return (
    <div>
      <Card className="mb-3 shadow-sm rounded-4">
        <Card.Header className=" text-center fs-5">
          📢 Quảng cáo
        </Card.Header>
        <Card.Body>
          {listAds.map((ad, index) => (
            <div
              key={index}
              className="mb-4 text-center"
              style={{
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "12px",
              }}
            >
              <a
                href={ad.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  style={{
                    width: "66%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "8px",
                  }}
                  className="shadow-sm"
                />
                <h6 className="text-primary fw-bold mt-2">{ad.title}</h6>
              </a>
              <p className="text-muted small">{ad.content}</p>
            </div>
          ))}

          <div className="d-grid mt-3">
            <Link to="/loginAds" className="text-white">
              <Button variant="success" className="w-100">
                Quảng cáo với PhotoWar
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SidebarRight;
