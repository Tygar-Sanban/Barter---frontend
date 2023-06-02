import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <navbar className="top-navbar">
        <Link to="/profile" className="top-navbar-component">
          <div>ProfilePic</div>
          <div>Wallet</div>
        </Link>
        <Link to="/search" className="bottom-navbar-component">
          <div>Search</div>
        </Link>
        <Link to="/discussion" className="bottom-navbar-component">
          <div>Discussion</div>
        </Link>
      </navbar>
    </div>
  );
}

export default Navbar;
