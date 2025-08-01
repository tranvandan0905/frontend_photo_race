import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import {
  FaSearch, FaHome, FaTrophy, FaFire, FaCoins, FaUser, FaUserCog, FaBell, FaFacebookMessenger
} from 'react-icons/fa';
import { FcSoundRecordingCopyright } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AlertToast from './AlertToast';

function AppNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token || location.state?.loggedIn);
  }, [location.state]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) {
      setAlert({ show: true, message: "Bạn hãy nhập từ cần tìm kiếm!" });
      return;
    }
    navigate(`/SearchUser?name=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Navbar bg="light" className="fixed-top shadow-sm bg-white">
      <Container fluid className="px-5">
        <div className="row w-100 align-items-center">

          {/* Trái: Logo + Search */}
          <div className="col-3 d-flex align-items-center">
            <Link to="/" className="me-3 text-dark">
              <FcSoundRecordingCopyright size={25} />
            </Link>
            <Form className="d-flex w-90" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Tìm kiếm"
                className="me-2"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                <FaSearch />
              </Button>
            </Form>
          </div>

          {/* Giữa: Menu chính */}
          <div className="col-6 d-flex justify-content-center">
            <Nav className="d-flex flex-row justify-content-center align-items-center gap-4">
              <Link to="/" className="text-dark mx-3">
                <FaHome size={25} className="text-primary" />
              </Link>
              <Link to="/Topranking" className="text-dark mx-3">
                <FaTrophy size={25} className="text-warning" />
              </Link>
              <Link to="/Topic" className="text-dark mx-3">
                <FaFire size={25} className="text-danger" />
              </Link>
              <Link to="/banking" className="text-dark mx-3">
                <FaCoins size={25} className="text-warning" />
              </Link>
              <Link to="/chat" className="text-dark mx-3">
                <FaBell size={25} className="text-primary" />
              </Link>
            </Nav>
          </div>

          {/* Phải: User & Chat */}
          <div className="col-3 d-flex justify-content-end align-items-center position-relative">
            <Link to="/chat" className="text-dark mx-3">
              <FaFacebookMessenger size={25} className="text-primary" />
            </Link>
            <Link to="/profile" className="text-dark me-4">
              <FaUser size={25} className="text-primary" />
            </Link>

            <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
              <FaUserCog size={25} className="text-primary" />
            </div>

            {showMenu && (
              <div>
                {isLoggedIn ? (
                  <div className="position-absolute top-100 end-0 mt-2 p-2 z-3">
                    <Link to="/logout" className="text-dark me-4">
                      <Button variant="secondary" className="w-100" onClick={handleLogout}>Logout</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="position-absolute top-100 end-0 mt-2 bg-white shadow rounded p-2 z-3">
                    <Link to="/login" className="text-dark me-4">
                      <Button variant="primary" className="w-100 mb-2">Login</Button>
                    </Link>
                    <Link to="/register" className="text-dark me-4">
                      <Button variant="primary" className="w-100 mb-2">SignUp</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>

      <AlertToast alert={alert} setAlert={setAlert} />
    </Navbar>
  );
}

export default AppNavbar;
