import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaTrophy,
    FaFileAlt,
    FaCheckCircle,
    FaChartBar,
    FaSignOutAlt,
    FaUser
} from 'react-icons/fa';
import { FcSoundRecordingCopyright } from 'react-icons/fc';
import { Button } from 'react-bootstrap';

function NavbarAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token hoặc fetch thông tin nếu cần
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div
            className="d-flex flex-column bg-light shadow vh-100 position-fixed"
            style={{ width: '230px', top: 0, left: 0, zIndex: 1040 }}
        >
            {/* Logo */}
            <div className="p-4 d-flex align-items-center justify-content-center border-bottom">
                <FcSoundRecordingCopyright size={32} />
                <span className="ms-2 fw-bold text-dark">PhotoWar Admin</span>
            </div>

            {/* Menu */}
            <div className="flex-grow-1 p-3">
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <Link to="/topicadmin" className="nav-link text-dark d-flex align-items-center">
                            <FaTrophy className="me-2 text-warning" />
                            Quản lý chủ đề
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/users" className="nav-link text-dark d-flex align-items-center">
                            <FaUser className="me-2 text-primary" />
                            Quản lý người dùng
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link to="/dep-wit" className="nav-link d-flex align-items-center gap-2 text-dark">
                            <FaFileAlt className="text-primary" />
                            <span>Quản lý giao dịch</span>
                        </Link>
                    </li>


                    <li className="nav-item mb-3">
                        <Link to="/AdvertiserList" className="nav-link text-dark d-flex align-items-center">
                            <FaCheckCircle className="me-2 text-success" />
                            Quản lý Ads
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/ranking" className="nav-link text-dark d-flex align-items-center">
                            <FaChartBar className="me-2 text-info" />
                            Quản lý xếp hạng
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/AdminStatistic" className="nav-link text-dark d-flex align-items-center">
                            <FaChartBar className="me-2 text-info" />
                            Thống kê
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Tài khoản */}
            <div className="p-3 border-top">
                <Button
                    variant="outline-danger"
                    className="w-100 d-flex align-items-center justify-content-center"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="me-2" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}

export default NavbarAdmin;
