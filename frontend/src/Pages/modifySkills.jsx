import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import axios from "axios";

function ModifySkills() {
  const { user } = useContext(AuthContext);
  console.log("first user", user);
  console.log("first user skills", user.skills);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  async function fetchAllSkills() {
    try {
      const response = await axios.get("http://localhost:5005/skills");
      console.log("This is fetchAllSkills response:", response);
      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteOneSkill(event) {
    const skillName = event.target.value;
    console.log(skillName);
  }

  useEffect(() => {
    fetchAllSkills();
  }, []);

  useEffect(() => {
    setUserSkills(user.skills);
  }, [user.skills]);

  const filteredSkills = skills.filter(
    (skill) => !userSkills.includes(skill._id)
  );

  const getUserSkillsNames = () => {
    return userSkills.map((skillId) => {
      const userSkill = skills.find((skill) => skill._id === skillId);
      return userSkill ? userSkill.name : "";
    });
  };

  return (
    <>
      <div>modifySkills</div>
      <div>
        User skills:
        {getUserSkillsNames().map((skillName) => (
          <div key={skillName}>{skillName}</div>
        ))}
      </div>
      <div>
        All skills without user skills:
        {filteredSkills.map((elem) => (
          <div onClick={deleteOneSkill} key={elem._id}>
            {elem.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifySkills;
