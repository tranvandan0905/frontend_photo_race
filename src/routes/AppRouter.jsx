// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreatePost from "../components/CreatePost";
import SearchUser from "../components/UserList";
import ProfileHeader from "../components/ProfileHeader";
import EditUserForm from "../components/EditUserForm";

function AppRoutes() {
  return (
    <Routes>
      {/* Các route dùng layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileHeader />} />
        <Route path="/CreatePost" element={<CreatePost/>}/>
        <Route path="/SearchUser" element={<SearchUser/>}/>
        <Route path="/EditUserForm" element={<EditUserForm/>}/>
      </Route>

      {/* Route không dùng layout */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
