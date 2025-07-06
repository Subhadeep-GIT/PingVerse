import React, { useState } from "react";

export default function SignupForm({ onOtpSent }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important to keep session cookies
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Server returns HTML (EJS), so we'll just assume OTP is sent if 200 OK
        onOtpSent({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
      } else {
        const text = await response.text();
        setError("Signup failed. Please check your input.");
        console.error("Signup error:", text);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            minLength={3}
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={() => onOtpSent(null)} // Tell parent to show login
          className="text-blue-500 hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}