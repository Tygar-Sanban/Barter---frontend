import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Link to="/signup">
        <button>Sign up, bitch !</button>
      </Link>
      <Link to="/login">
        <button>Log in, bitch !</button>
      </Link>
      <Link to="/profile">
        <button>Profile, bitch !</button>
      </Link>
      <Link to="/search">
        <button>Search, bitch !</button>
      </Link>
    </div>
  );
}

export default Homepage;
