import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";

function ModifySkills() {
  const { user, isLoading, authenticateUser } = useContext(AuthContext);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [otherSelectedCategory, setOtherSelectedCategory] = useState(null);
  const [skills, setSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);

  async function fetchAllSkills() {
    if (user?.skills) {
      try {
        const response = await service.get("/skills");
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

    fetchAllSkills();
    if (user) {
      setSelectedSkills(user.skills);
    }
  }, [selectedCategory, otherSelectedCategory, user]);

  useEffect(() => {
    setSkills(
      selectedSkills.filter((elem) => elem.serviceCategory === selectedCategory)
    );
    setOtherSkills(
      filteredSkills.filter(
        (elem) => elem.serviceCategory === otherSelectedCategory
      )
    );
  }, [selectedSkills, filteredSkills]);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }
  function handleOtherCategoryClick(category) {
    setOtherSelectedCategory(category);
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {isLoading ? (
          <p>Loading user skills...</p>
        ) : (
          <>
            <h2>User skills:</h2>

            <div>
              <h3>Categories</h3>
              <ul>
                <li onClick={() => handleCategoryClick("Personal")}>
                  Personal
                </li>
                <li onClick={() => handleCategoryClick("Professional")}>
                  Professional
                </li>
                <li onClick={() => handleCategoryClick("Health and Wellness")}>
                  Health and Wellness
                </li>
                <li onClick={() => handleCategoryClick("Educational")}>
                  Educational
                </li>
                <li onClick={() => handleCategoryClick("Creative")}>
                  Creative
                </li>
                <li onClick={() => handleCategoryClick("Home")}>Home</li>
                <li onClick={() => handleCategoryClick("Transportation")}>
                  Transportation
                </li>
              </ul>

              {selectedCategory && (
                <>
                  <h3>Skills</h3>
                  <ul>
                    {selectedSkills.length > 0 &&
                      skills.map((elem) => (
                        <li
                          key={elem._id}
                          onClick={() => handleDeleteSkill(elem._id)}
                        >
                          {elem.name}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        {isLoading ? (
          <p>Loading all skills...</p>
        ) : (
          <>
            <h2>All Skills excluding user skills:</h2>

            <div>
              <h3>Categories</h3>
              <ul>
                <li onClick={() => handleOtherCategoryClick("Personal")}>
                  Personal
                </li>
                <li onClick={() => handleOtherCategoryClick("Professional")}>
                  Professional
                </li>
                <li
                  onClick={() =>
                    handleOtherCategoryClick("Health and Wellness")
                  }
                >
                  Health and Wellness
                </li>
                <li onClick={() => handleOtherCategoryClick("Educational")}>
                  Educational
                </li>
                <li onClick={() => handleOtherCategoryClick("Creative")}>
                  Creative
                </li>
                <li onClick={() => handleOtherCategoryClick("Home")}>Home</li>
                <li onClick={() => handleOtherCategoryClick("Transportation")}>
                  Transportation
                </li>
              </ul>

              {otherSelectedCategory && (
                <>
                  <h3>Skills</h3>
                  <ul>
                    {filteredSkills.length > 0 &&
                      otherSkills.map((elem) => (
                        <li
                          key={elem._id}
                          onClick={() => handleAddSkill(elem._id)}
                        >
                          {elem.name}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>

          </>
        )}
      </div>
    </>
  );
}

export default ModifySkills;
