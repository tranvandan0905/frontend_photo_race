import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import TopicSection from "../components/TopicSection";

function Topic()
{
    return(<>
     <AppNavbar />
     <Container fluid  className="mt-5">
        <TopicSection/>
     </Container>
   </> );
}
export default Topic;