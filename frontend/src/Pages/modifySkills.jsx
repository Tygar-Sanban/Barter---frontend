import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";

function ModifySkills() {
  const { user, isLoading } = useContext(AuthContext);
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  async function fetchAllSkills() {
    try {
      const response = await service.get("/skills");
      setAllSkills(response.data);
      setFilteredSkills(
        response.data.filter((skill) => !userSkills.includes(skill))
      );
    } catch (error) {
      console.log(error);
    }
  }

  // const filteredSkills = allSkills.filter((elem) => !userSkills.includes(elem));

  async function handleDeleteSkill(skillId) {
    try {
      // Remove the skill from the userSkills state
      const updatedSkills = userSkills.filter((skill) => skill._id !== skillId);
      setUserSkills(updatedSkills);

      // Make the API request to remove the skill from the user's skills
      await service.patch("/user/removeSkills", { skillId });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSkills();
  }, []);

  useEffect(() => {
    if (user.skills) {
      setUserSkills(user.skills);
      console.log("User skills:", user.skills);
    }
  }, [user.skills]);

  async function handleAddSkill(skillId) {
    try {
      const updatedUserSkills = [...userSkills, skillId];
      setUserSkills(updatedUserSkills);
      await service.patch("/user", {
        skills: updatedUserSkills,
      });
      setFilteredSkills(
        filteredSkills.filter((skill) => skill._id !== skillId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {isLoading ? (
          <p>Loading user skills...</p>
        ) : (
          <>
            User skills:
            {userSkills &&
              userSkills.map((elem) => (
                <div key={elem._id} onClick={() => handleDeleteSkill(elem._id)}>
                  {elem.name}
                </div>
              ))}
          </>
        )}
      </div>
      <div>
        {isLoading ? (
          <p>Loading all skills...</p>
        ) : (
          <>
            All Skills excluding user skills:
            {filteredSkills.map((skill) => (
              <div
                key={`filtered_${skill._id}`}
                onClick={() => handleAddSkill(skill._id)}
              >
                {skill.name}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ModifySkills;
