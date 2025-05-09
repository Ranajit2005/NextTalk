import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import { useThemeStore } from "./store/useThemeStore.js";
import { useAuthStore } from "./store/useAuthStore.js";

import Navbar from "./components/Navbar.jsx";

import SettingPage from "./pages/SettingPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import LoginPage from "./pages/LogIn.jsx";
import HomePage from "./pages/HomePage.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

function App() {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser }); //for debug purposes
  if (isCheckingAuth && !authUser) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        data-theme={theme}
      >
        <Loader className="size-10 animate-spin bg-base-100" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="grid grid-rows-[4rem_1fr] h-dvh">
      <Navbar />
      <div className=" relative h-full w-full">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/profile"
            element={authUser ? <UpdateProfile /> : <Navigate to="/login" />}
          />

          <Route path="/settings" element={<SettingPage />} />
          {/* <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
