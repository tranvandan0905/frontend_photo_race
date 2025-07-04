import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTrophy, FaUser, FaSignOutAlt, FaChartPie } from 'react-icons/fa';
import { FcSoundRecordingCopyright } from 'react-icons/fc';
import { Button } from 'react-bootstrap';

function NavbarAds() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('advertiser_token');
        setIsLoggedIn(!!token || location.state?.loggedIn);
    }, [location.state]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("advertiser_token");
    };

    return (
        <div
            className="d-flex flex-column bg-light shadow vh-100 position-fixed"
            style={{ width: '230px', top: 0, left: 0, zIndex: 1040 }}
        >
            {/* Logo */}
            <div className="p-4 d-flex align-items-center justify-content-center border-bottom">
                <FcSoundRecordingCopyright size={32} />
                <span className="ms-2 fw-bold text-dark">PhotoWar Ads</span>
            </div>

            {/* Menu */}
            <div className="flex-grow-1 p-3">
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <Link to="/ads" className="nav-link text-dark d-flex align-items-center">
                            <FaTrophy className="me-2 text-warning" /> Chiến dịch
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/statistical" className="nav-link text-dark d-flex align-items-center">
                            <FaChartPie className="me-2 text-info" /> Thống kê
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/ProfileAds" className="nav-link text-dark d-flex align-items-center">
                            <FaUser className="me-2 text-primary" /> Hồ sơ
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Tài khoản */}
            <div className="p-3 border-top">
                {isLoggedIn ? (
                    <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center"
                        onClick={handleLogout}
                        as={Link}
                        to="/logoutAds"
                    >
                        <FaSignOutAlt className="me-2" />
                        Đăng xuất
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="primary"
                            className="w-100 mb-2"
                            as={Link}
                            to="/loginAds"
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="outline-primary"
                            className="w-100"
                            as={Link}
                            to="/registerAds"
                        >
                            Đăng ký
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavbarAds;
