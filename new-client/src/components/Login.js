import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      login(user, token);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
