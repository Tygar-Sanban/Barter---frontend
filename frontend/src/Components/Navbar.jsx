import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <navbar className="top-navbar">
        <Link to="/discussions" className="bottom-navbar-component">
          <div>Discussions</div>
        </Link>
        <Link to="/search" className="bottom-navbar-component">
          <div>Search</div>
        </Link>
        <Link
          to="/profile"
          className="top-navbar-component profilepicAndwallet"
        >
          <div>ProfilePic</div>
          <div>Wallet</div>
        </Link>
      </navbar>
    </div>
  );
}

export default Navbar;
