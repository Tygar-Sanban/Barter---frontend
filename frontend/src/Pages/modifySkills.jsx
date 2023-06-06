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
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");

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
    console.log("this is the picture", picture);
    console.log("this is the user.picture", user.picture);
  }, [picture, user.picture]);

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

  async function handlePictureSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.patch("/user", { picture: picture });
      await authenticateUser();
      setPicture("");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleNameSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.patch("/user", { name: name });
      await authenticateUser();
      setName("");
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
            <form onSubmit={handlePictureSubmit}>
              <label htmlFor="picture">Post the link of your new picture</label>
              <input
                type="text"
                value={picture}
                onChange={(event) => setPicture(event.target.value)}
              />
              <button>Change your profile picture</button>
            </form>
            <form onSubmit={handleNameSubmit}>
              <label htmlFor="name">Type your new name.</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <button>Change your name</button>
            </form>
            <h2>Click to remove a skill:</h2>

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
            <h2>Click to add another skill:</h2>

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
