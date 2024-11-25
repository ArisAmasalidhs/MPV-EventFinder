import React, { useState } from "react";
import { registerUser } from "../services/userService";
import "./AuthForms.css";

const RegisterForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ username, email, password });
      setSuccess("Registration successful!");
      setError("");
      console.log("Register response:", response);
      onClose(); // Close the modal
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Registration failed.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
    </div>
  );
};

export default RegisterForm;
