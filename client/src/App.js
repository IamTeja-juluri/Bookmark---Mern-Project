import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import HomePage from "./pages/HomePage";
import Bookmarks from "./pages/BookmarkContainer/Bookmarks";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/:collection/bookmarks" element={<Bookmarks />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/api/v1/user/resetPassword/:token" element={<ResetPasswordPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
