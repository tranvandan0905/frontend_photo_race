import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import TopRankingList from "../components/TopRankingList";

function Topranking_Sub()
{
    return(<>
     <AppNavbar />
     <Container   className="mt-5">
        <TopRankingList/>
     </Container>
   </> );
}
export default Topranking_Sub;