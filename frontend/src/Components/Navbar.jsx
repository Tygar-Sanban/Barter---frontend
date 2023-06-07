import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <navbar className="top-navbar">
        <Link to="/request-page" className="bottom-navbar-component">
          <div>Requests</div>
        </Link>
        <Link to="/current-missions" className="bottom-navbar-component">
          <div>Current Services</div>
        </Link>
        <Link to="/search" className="bottom-navbar-component">
          <div>Search</div>
        </Link>
        <Link
          to="/profile"
          className="bottom-navbar-component profilepicAndwallet"
        >
          <div>Profile</div>
          <div>Wallet</div>
        </Link>
      </navbar>
    </div>
  );
}

export default Navbar;
