import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="menu-button">
        <img
          src="../../public/Icons/sidebar.png"
          className="sidebar-icon"
          onClick={toggleMenu}
        />
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div onClick={toggleMenu} className="sidebar-header">
          Menu
        </div>
        <div className="sidebar-content">
          <Link to="/request-page" className="sidebar-link">
            Requests
          </Link>
          <Link to="/current-missions" className="sidebar-link">
            Current Services
          </Link>
          <Link to="/search" className="sidebar-link">
            Search
          </Link>
          <Link to="/profile" className="sidebar-link">
            Profile
          </Link>
          <Link to="/wallet" className="sidebar-link">
            Wallet
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
