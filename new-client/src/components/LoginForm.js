import React, { useState } from "react";
import { loginUser } from "../services/userService";
import "./AuthForms.css";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setSuccess("Login successful!");
      setError("");
      console.log("Login response:", response);
      // Handle login state here (update AuthContext or localStorage)
      onClose(); // Close the modal
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Login failed.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
    </div>
  );
};

export default LoginForm;
