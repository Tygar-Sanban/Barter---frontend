import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Link to="/signup">
        <button>Sign up, bitch !</button>
      </Link>
    </div>
  );
}

export default Homepage;
