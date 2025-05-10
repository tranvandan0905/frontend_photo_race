import { Container, Row } from "react-bootstrap";
import ProfileHeader from "../components/ProfileHeader";
function Profile() {
  return (
    <Container fluid className="pt-3">
      <Row>
          <ProfileHeader />
      </Row>
    </Container>
  );
}

export default Profile;
