
import React, { useState } from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <BackgroundVideo />
      {isLogin ? (
        <LoginPage onSwitchToSignup={handleSwitch} />
      ) : (
        <SignupPage onSwitchToLogin={handleSwitch} />
      )}
    </div>
  );
}

export default App;
