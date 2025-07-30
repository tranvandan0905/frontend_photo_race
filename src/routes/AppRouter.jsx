// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainLayoutAds from "../layouts/MainLayoutAds";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../components/CreatePost";
import SearchUser from "../components/UserList";
import ProfileHeader from "../pages/ProfileHeader";
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
import BankingPage from "../pages/BankingPage";
import MomoSuccessPage from "../pages/MomoSuccessPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import PaswordPage from "../pages/PaswordPage";
import AddBankAccount from "../components/AddBankAccount";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import AdminStatistic from "../pages/AdminStatistic";
import UserManagement from "../pages/UserManagement";
import TopicManagement from "../pages/TopicManagement";
import TransactionManagement from "../pages/TransactionManagement";
import AdvertiserList from "../pages/AdvertiserManagement";
import RankingManager from "../pages/RankingManagement";
import ChatPage from "../pages/ChatPage";
import MainLayoutUser from "../layouts/MainLayoutUser";
import SearchUserPage from "../pages/SearchUserPage";
import PostProfile from "../pages/PostProfile";
import FriendList from "../components/FriendList";


function AppRoutes() {
  return (
    <Routes>
      {/* Các route dùng layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Post />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/SearchUser" element={<SearchUser />} />
        <Route path="/SearchUserPage" element={<SearchUserPage />} />
        <Route path="/chat" element={<ChatPage />} />


      </Route>
      <Route element={<MainLayoutAds />}>
        <Route path="/ads" element={<CreateAdForm />} />
        <Route path="/statistical" element={<AdsList />} />
        <Route path="/ProfileAds" element={<ProfileAds />} />
        <Route path="/EditAdsFrom" element={<EditAdsForm />} />
      </Route>
      <Route element={<MainLayoutAdmin />}>
        <Route path="/AdminStatistic" element={<AdminStatistic />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/topicadmin" element={<TopicManagement />} />
        <Route path="/dep-wit" element={<TransactionManagement />} />
        <Route path="AdvertiserList" element={<AdvertiserList />} />
        <Route path="ranking" element={<RankingManager />} />
      </Route>
      <Route element={<MainLayoutUser />}>
        <Route path="/profile" element={<PostProfile />} />
        <Route path="/EditUserForm" element={<UserSettings />} />
        <Route path="/STK" element={<AddBankAccount />} />
         <Route path="/FriendList" element={<FriendList />}/>
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
      <Route path="/banking" element={<BankingPage />} />
      <Route path="/banking/momo-success" element={<MomoSuccessPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/password" element={<PaswordPage />} />
    </Routes>
  );
}

export default AppRoutes;
