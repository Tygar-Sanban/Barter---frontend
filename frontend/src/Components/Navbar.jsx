import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../service/service";
import { useState } from "react";
import { AuthContext } from "../Context/authContext";

function Navbar(props) {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wallet, setWallet] = useState(0);
  const navigate = useNavigate();

  async function getWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data.barterBucks);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClick() {
    props.setTwoButtons(true);
    props.setProviding(false);
    props.setRequesting(false);
  }

  function handleMenu() {
    navigate("/");
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
        <div className="underClass">
          <img
            src="/public/Icons/sidebar.png"
            className="sidebar-icon"
            onClick={toggleMenu}
          />
          <img
            className="logo"
            src="/public/Pictures/Barter.png"
            alt="logo"
            onClick={handleMenu}
          />
        </div>
        {user && (
          <div>
            <Link to="/search">
              <p>Search</p>
            </Link>
          </div>
        )}
        {user && (
          <div>
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </div>
        )}
      </div>
      {user && (
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
          <div onClick={toggleMenu} className="sidebar-header">
            Menu
          </div>
          <div className="sidebar-content">
            <Link to="/request-page" className="sidebar-link">
              Pending Requests
            </Link>
            <Link
              onClick={() => {
                toggleMenu();
                handleClick();
              }}
              to="/current-missions"
              className="sidebar-link"
            >
              Current Services
            </Link>
            <Link to="/search" className="sidebar-link">
              Search
            </Link>
            <Link to="/profile" className="sidebar-link">
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
