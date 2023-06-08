import React, { useState } from "react";
import service from "../service/service.js";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";

function LogIn() {
  const { authenticateUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    event.preventDefault();
    try {
      const userToLogin = { email, password };
      const response = await service.post("/auth/login", userToLogin);
      localStorage.setItem("token", response.data.token);
      console.log("this is the response.data.token", response.data.token);
      await authenticateUser();
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <h3 style={{ paddingTop: "5vh" }} className="title">
        Enter your login information
      </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-element">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-button">
          <button>Log in</button>
        </div>
      </form>
      <div className="link-to-signup">
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LogIn;
