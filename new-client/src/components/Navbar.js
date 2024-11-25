import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Triggering search for:", searchQuery); // Debug the input
      onSearch(searchQuery.trim()); // Pass the sanitized input to the handler
    } else {
      console.error("Search query is empty or invalid.");
    }
  };

  return (
    <nav className="navbar">
      {/* Brand Section */}
      <div className="navbar-brand">
        <h1>EventFinder</h1>
      </div>

      {/* Links and Actions */}
      <div className="navbar-links">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="navbar-search-form">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="btn navbar-search-button">
            Search
          </button>
        </form>

        {/* Events Link */}
        <a href="/" className="btn">Events</a>

        {/* Auth Links */}
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.username || "User"}</span>
            <button onClick={logout} className="btn navbar-logout-button">
              Log Out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsLoginOpen(true)} className="btn">Log In</button>
            <button onClick={() => setIsRegisterOpen(true)} className="btn">Sign Up</button>
          </>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <RegisterForm onClose={() => setIsRegisterOpen(false)} />
      </Modal>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm onClose={() => setIsLoginOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
