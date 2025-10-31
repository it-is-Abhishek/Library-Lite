import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserProfile from "./components/UserProfile";


function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Routes>
        {/* Auth Routes with Background Video */}
        <Route path="/" element={
          <>
            <BackgroundVideo />
            {isLogin ? (
              <LoginPage onSwitchToSignup={handleSwitch} />
            ) : (
              <SignupPage onSwitchToLogin={handleSwitch} />
            )}
          </>
        } />

        {/* User Profile Route */}
        <Route path="/userprofile" element={<UserProfile />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
