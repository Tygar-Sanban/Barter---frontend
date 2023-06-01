import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectSkills from "../Components/SelectSkills";
import Navbar from "../Components/Navbar";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
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
      await axios.post("http://localhost:5005/auth/signup", objectToPost);
      navigate("/");
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
        <label htmlFor="confirmed-password">Confirm Password</label>
        <input
          type="password"
          onChange={(event) => setConfirmedPassword(event.target.value)}
        />
        <label htmlFor="phone">Phone number</label>
        <input type="tel" onChange={(event) => setPhone(event.target.value)} />
        <label htmlFor="name">User Name</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          onChange={(event) => setlocation(event.target.value)}
        />
        <label htmlFor="picture">Picture</label>
        <input
          type="text"
          onChange={(event) => setPicture(event.target.value)}
        />
        <SelectSkills
          skill={skill}
          setSkill={setSkill}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />

        <button>Sign up, bitch !</button>
      </form>
    </div>
  );
}

export default SignUp;
