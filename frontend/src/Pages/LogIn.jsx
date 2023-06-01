import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

function LogIn() {
  const { authenticateUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    event.preventDefault();
    try {
      const userToLogin = { email, password };
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        userToLogin
      );
      localStorage.setItem("token", response.data.token);
      console.log("this is the response.data.token", response.data.token);
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Log in, bitch !</button>
      </form>
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LogIn;
