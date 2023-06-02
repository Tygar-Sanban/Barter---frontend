import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/authContext";

function Homepage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Link to="/signup" style={{ paddingTop: "8vh" }}>
        <button>Sign up, bitch !</button>
      </Link>
      <Link to="/login" style={{ paddingTop: "8vh" }}>
        <button>Log in, bitch !</button>
      </Link>
    </div>
  );
}

export default Homepage;
