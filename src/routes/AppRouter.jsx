// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreatePost from "../components/CreatePost";
import SearchUser from "../components/UserList";
import ProfileHeader from "../components/ProfileHeader";
import EditUserForm from "../components/EditUserForm";
import Logout from "../pages/Logout";
import Topic from "../pages/Topic";

function AppRoutes() {
  return (
    <Routes>
      {/* Các route dùng layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileHeader />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/SearchUser" element={<SearchUser />} />
        <Route path="/EditUserForm" element={<EditUserForm />} />
      </Route>

      {/* Route không dùng layout */}
      <Route path="/Topic" element={<Topic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default AppRoutes;
