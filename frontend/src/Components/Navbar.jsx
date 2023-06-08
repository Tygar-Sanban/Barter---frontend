import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../service/service";
import { useState } from "react";

function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wallet, setWallet] = useState(0);

  async function handleClick() {
    props.setTwoButtons(true);
    props.setProviding(false);
    props.setRequesting(false);
  }

  async function getWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data.barterBucks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWallet();
  }, []);

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
