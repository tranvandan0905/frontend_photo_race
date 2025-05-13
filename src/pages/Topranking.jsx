import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import TopPlayers from "../components/TopPlayers";
function Topranking()
{
    return(<>
     <AppNavbar />
     <Container   className="mt-5">
        <TopPlayers/>
     </Container>
   </> );
}
export default Topranking;