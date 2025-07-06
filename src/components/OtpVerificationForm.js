import React, { useState } from "react";

export default function OtpVerificationForm({ userData, onVerified }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, username, password } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          otpEntered: otp,
          email,
          username,
          password,
        }),
      });

      if (response.ok) {
        onVerified(); // Switch to login screen
      } else {
        const text = await response.text();
        console.error("OTP verification failed:", text);
        setError("Invalid OTP or session expired.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
      <p className="text-sm text-gray-700 mb-2 text-center">
        An OTP has been sent to <strong>{email}</strong>
      </p>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Enter OTP</label>
          <input
            type="text"
            name="otpEntered"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}