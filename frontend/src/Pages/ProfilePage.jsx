import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  async function fetchAllSkills() {
    try {
      const response = await axios.get("http://localhost:5005/skills");
      setSkills(response.data);
      const skillBrowsing = skills.filter((elem) =>
        user.skills.includes(elem._id)
      );
      setUserSkills(skillBrowsing);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSkills();
    console.log("those are the skills", userSkills);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <div>{user.name}</div>
      {skills &&
        userSkills.map((elem) => {
          return <div key={elem._id}>{elem.name}</div>;
        })}
    </div>
  );
}

export default ProfilePage;
