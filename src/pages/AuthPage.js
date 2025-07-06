import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import OtpVerificationForm from "../components/OtpVerificationForm";
import LoginForm from "../components/LoginForm";

export default function AuthPage() {
  const [view, setView] = useState("signup"); // Can be 'signup', 'otp', 'login'
  const [userData, setUserData] = useState(null); // Holds email, username, password for OTP

  // Called by SignupForm when OTP is sent
  const handleOtpSent = (data) => {
    if (data) {
      setUserData(data);
      setView("otp");
    } else {
      setView("login");
    }
  };

  // Called by OtpVerificationForm when OTP is verified successfully
  const handleOtpVerified = () => {
    setUserData(null);
    setView("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-4">
      {view === "signup" && (
        <SignupForm onOtpSent={handleOtpSent} />
      )}
      {view === "otp" && userData && (
        <OtpVerificationForm userData={userData} onVerified={handleOtpVerified} />
      )}
      {view === "login" && (
        <LoginForm />
      )}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm space-x-2">
        {view !== "signup" && (
          <button
            onClick={() => setView("signup")}
            className="underline hover:text-gray-200"
          >
            Sign up
          </button>
        )}
        {view !== "login" && (
          <button
            onClick={() => setView("login")}
            className="underline hover:text-gray-200"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}