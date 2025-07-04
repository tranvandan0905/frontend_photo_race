// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainLayoutAds from "../layouts/MainLayoutAds";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../components/CreatePost";
import SearchUser from "../components/UserList";
import ProfileHeader from "../components/ProfileHeader";
import Logout from "../pages/Logout";
import Topic from "../pages/Topic";
import Post from "../pages/Post";
import Topranking from "../pages/Topranking";
import ToprankingSub from "../pages/TopRanking_Sub";
import LoginAds from "../pages/LoginAds";
import RegisterAds from "../pages/RegisterAds";
import CreateAdForm from "../pages/Ads";
import UserSettings from "../pages/UserSettings";
import AdsList from "../components/AdsList";
import ProfileAds from "../pages/ProfileAds";
import EditAdsForm from "../components/EditAdsForm";


function AppRoutes() {
  return (
    <Routes>
      {/* Các route dùng layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Post />} />
        <Route path="/profile" element={<ProfileHeader />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/SearchUser" element={<SearchUser />} />
        <Route path="/EditUserForm" element={<UserSettings />} />
      </Route>
      <Route element={<MainLayoutAds />}>
        <Route path="/ads" element={<CreateAdForm />} />
        <Route path="/statistical" element={<AdsList />} />
        <Route path="/ProfileAds" element={<ProfileAds />} />
        <Route path="/EditAdsFrom" element={<EditAdsForm />} />
      </Route>
      {/* Route không dùng layout */}
      <Route path="/Topranking" element={<Topranking />} />
      <Route path="/Topic" element={<Topic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginAds" element={<LoginAds />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerAds" element={<RegisterAds />} />
      <Route path="/ToprankingList" element={<ToprankingSub />} />
    </Routes>
  );
}

export default AppRoutes;
