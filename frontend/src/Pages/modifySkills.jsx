import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import service from "../service/service.js";

function ModifySkills() {
  const { user } = useContext(AuthContext);
  console.log("first user", user);
  console.log("first user skills", user.skills);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  async function fetchAllSkills() {
    try {
      const response = await service.get("/skills");
      console.log("This is fetchAllSkills response:", response);
      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addSkillToUser(event) {
    const skillName = event.target.value;
    console.log(skillName);
  }

  useEffect(() => {
    fetchAllSkills();
  }, []);

  useEffect(() => {
    setUserSkills(user.skills);
    console.log("this is the user skillzzz", userSkills);
  }, [user.skills]);

  const filteredSkills = skills.filter(
    (skill) => !userSkills.includes(skill._id)
  );

  const getUserSkillsNames = () => {
    return userSkills.map((elem) => {
      const userSkill = skills.find((skill) => skill._id === elem);
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
          <div onClick={addSkillToUser} key={elem._id}>
            {elem.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifySkills;
