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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSkills();
  }, []);

  useEffect(() => {
    if (skills.length > 0 && !isLoading) {
      const skillBrowsing = skills.filter((elem) =>
        user.skills.includes(elem._id)
      );
      setUserSkills(skillBrowsing);
    }
  }, [skills]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <div>{user.name}</div>
      {skills.length !== 0 && userSkills.length !== 0 ? (
        userSkills.map((elem) => {
          return <div key={elem._id}>{elem.name}</div>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProfilePage;
