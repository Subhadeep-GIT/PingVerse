import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for session cookies
        body: JSON.stringify(formData),
      });

      if (response.redirected) {
        // EJS server sends redirect to /dashboard on success
        setSuccess(true);
        window.location.href = response.url;
      } else {
        const text = await response.text();
        console.error("Login failed:", text);
        setError("Invalid credentials or user not found.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
          Login successful! Redirecting...
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}