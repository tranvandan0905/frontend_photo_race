import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import BankingFrom from "../components/BankingFrom";

function BangkingPage()
{
    return(<>
     <AppNavbar />
     <Container fluid  className="mt-5">
        <BankingFrom/>
     </Container>
   </> );
}
export default  BangkingPage;
;