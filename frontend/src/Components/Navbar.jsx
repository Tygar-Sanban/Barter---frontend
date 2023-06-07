import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <navbar className="top-navbar">
        <Link to="/my-requests" className="bottom-navbar-component">
          <div>My requests</div>
        </Link>
        <Link to="/sent-requests" className="bottom-navbar-component">
          <div>My requests sent</div>
        </Link>
        <Link to="/search" className="bottom-navbar-component">
          <div>Search</div>
        </Link>
        <Link to="/current-missions" className="bottom-navbar-component">
          <div>Current missions</div>
        </Link>
        <Link
          to="/profile"
          className="top-navbar-component profilepicAndwallet"
        >
          <div>Profile</div>
          <div>Wallet</div>
        </Link>
      </navbar>
    </div>
  );
}

export default Navbar;
