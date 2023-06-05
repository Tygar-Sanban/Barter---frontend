import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";

function ModifySkills() {
  const { user, isLoading, authenticateUser } = useContext(AuthContext);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  async function fetchAllSkills() {
    if (user.skills) {
      try {
        const response = await service.get("/skills");
        // setAllSkills(response.data);
        console.log("those are the user.skills", user.skills);
        console.log("this is the response.data", response.data);
        setFilteredSkills(
          response.data.filter((skill) =>
            user.skills.every((elem) => elem._id !== skill._id)
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDeleteSkill = async (skillId) => {
    try {
      const response = await service.patch("/user/removeSkills", {
        skillId,
      });
      console.log("skill deleted successfully");
      authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddSkill = async (skillId) => {
    try {
      const response = await service.patch("/user/addSkills", {
        skillId,
      });
      console.log("skill added successfully");
      authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("those are the filteredskills", filteredSkills);
  }, [filteredSkills]);

  useEffect(() => {
    fetchAllSkills();
    if (user) {
      setSelectedSkills(user.skills);
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("user skills of the useEffect", selectedSkills);
  // }, [selectedSkills]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {isLoading ? (
          <p>Loading user skills...</p>
        ) : (
          <>
            <h2>User skills:</h2>
            {selectedSkills.map((elem) => (
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
            <h2>All Skills excluding user skills:</h2>
            {filteredSkills.map((skill) => (
              <div onClick={() => handleAddSkill(skill._id)} key={skill._id}>
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
