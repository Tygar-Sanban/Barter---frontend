import React, { useEffect, useState } from "react";
import service from "../service/service.js";
import { useNavigate } from "react-router-dom";
import SelectSkills from "../Components/SelectSkills";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [location, setlocation] = useState("");
  const [picture, setPicture] = useState("");
  const [skill, setSkill] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const objectToPost = {
      email,
      name,
      password,
      phone,
      location,
      picture,
      skills: selectedSkill,
    };
    try {
      await service.post("/auth/signup", objectToPost);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3 style={{ paddingTop: "5vh" }} className="title">
        Enter your informations
      </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-element">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="phone">Phone number *</label>
          <input
            type="tel"
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="name">User Name *</label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            onChange={(event) => setlocation(event.target.value)}
          />
        </div>
        <div className="login-form-element">
          <label htmlFor="picture">Picture</label>
          <input
            type="text"
            onChange={(event) => setPicture(event.target.value)}
          />
        </div>
        <SelectSkills
          skill={skill}
          setSkill={setSkill}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />

        <div style={{ marginTop: "1.5rem" }} className="login-button">
          <button>Sign up !</button>
        </div>
      </form>
      <div className="link-to-signup">
        <p>Already have an account ?</p>
        <Link to={"/login"}> Log in !</Link>
      </div>
    </div>
  );
}

export default SignUp;
