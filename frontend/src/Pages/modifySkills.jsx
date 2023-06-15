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
      <div style={{ paddingTop: "5vh" }}>
        {isLoading ? (
          <p>Loading user skills...</p>
        ) : (
          <>
            <div className="modifyProfile">
              <div className="form-container">
                <form onSubmit={handlePictureSubmit}>
                  <label htmlFor="picture">
                    Post the link of your new picture
                  </label>
                  <input
                    type="text"
                    value={picture}
                    onChange={(event) => setPicture(event.target.value)}
                  />
                  <button>Change your profile picture</button>
                </form>
              </div>
              <div className="form-container">
                <form onSubmit={handleNameSubmit}>
                  <label htmlFor="name">Type your new name.</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <button>Change your name</button>
                </form>
              </div>
            </div>

            <h2 style={{ textDecoration: "underline" }} className="center">
              Click to remove a skill
            </h2>

            <div>
              <h3 className="center">Categories :</h3>

              <div className="scrollable-container">
                <div className="scrollable-content">
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Personal" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Personal")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/user.png"
                        alt="image category"
                        className="image"
                        style={{ transform: "scale(0.8)" }}
                      />
                    </div>
                    <div className="PersonalBG title">Personal</div>
                  </div>
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Professional" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Professional")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/professional.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="ProfessionalBG title">Professional</div>
                  </div>
                  <div
                    className={`scrollable-item   ${
                      selectedCategory === "Health and Wellness" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Health and Wellness")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/health.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="healthBG title">Health</div>
                  </div>
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Educational" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Educational")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/education.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="EducationalBG title">Educational</div>
                  </div>
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Creative" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Creative")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/creative.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="creativeBG title">Creative</div>
                  </div>
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Home" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Home")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/home.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="homeBG title">Home</div>
                  </div>
                  <div
                    className={`scrollable-item ${
                      selectedCategory === "Transportation" ? "active" : ""
                    } `}
                    onClick={() => handleCategoryClick("Transportation")}
                  >
                    <div className="image-wrapper">
                      <img
                        src="/Icons/transportation.png"
                        alt="image category"
                        className="image"
                      />
                    </div>
                    <div className="transportationBG title">Transports</div>
                  </div>
                </div>
              </div>

              {selectedCategory && (
                <>
                  <div className="category-buttons">
                    <h3 className="center">Skills</h3>
                    <img
                      onClick={() => setSelectedCategory(null)}
                      src={"/Icons/close.png"}
                      alt="Close"
                      className="close-icon"
                    />
                  </div>
                  <div className="skill-info">
                    {selectedSkills.length > 0 &&
                      skills.map((elem) => (
                        <div
                          className={`skill-container ${
                            elem.serviceCategory === "Personal"
                              ? "PersonalBorder"
                              : elem.serviceCategory === "Professional"
                              ? "ProfessionalBorder"
                              : elem.serviceCategory === "Health and Wellness"
                              ? "healthBorder"
                              : elem.serviceCategory === "Educational"
                              ? "EducationalBorder"
                              : elem.serviceCategory === "Creative"
                              ? "creativeBorder"
                              : elem.serviceCategory === "Home"
                              ? "homeBorder"
                              : elem.serviceCategory === "Transportation"
                              ? "transportationBorder"
                              : ""
                          }`}
                          key={elem._id}
                          onClick={() => handleDeleteSkill(elem._id)}
                        >
                          {elem.name}
                        </div>
                      ))}
                  </div>
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
            <h2 style={{ textDecoration: "underline" }} className="center">
              Click to add another skill
            </h2>
            <div className="scrollable-container">
              <h3 style={{ padding: "1.5rem" }} className="center">
                Categories :
              </h3>
              <div className="scrollable-content">
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Personal" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Personal")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/user.png"
                      alt="image category"
                      className="image"
                      style={{ transform: "scale(0.8)" }}
                    />
                  </div>
                  <div className="PersonalBG title">Personal</div>
                </div>
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Professional" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Professional")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/professional.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="ProfessionalBG title">Professional</div>
                </div>
                <div
                  className={`scrollable-item   ${
                    otherSelectedCategory === "Health and Wellness"
                      ? "active"
                      : ""
                  } `}
                  onClick={() =>
                    handleOtherCategoryClick("Health and Wellness")
                  }
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/health.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="healthBG title">Health</div>
                </div>
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Educational" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Educational")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/education.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="EducationalBG title">Educational</div>
                </div>
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Creative" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Creative")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/creative.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="creativeBG title">Creative</div>
                </div>
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Home" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Home")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/home.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="homeBG title">Home</div>
                </div>
                <div
                  className={`scrollable-item ${
                    otherSelectedCategory === "Transportation" ? "active" : ""
                  } `}
                  onClick={() => handleOtherCategoryClick("Transportation")}
                >
                  <div className="image-wrapper">
                    <img
                      src="/Icons/transportation.png"
                      alt="image category"
                      className="image"
                    />
                  </div>
                  <div className="transportationBG title">Transports</div>
                </div>
              </div>
            </div>
            <div>
              {otherSelectedCategory && (
                <>
                  <div className="category-buttons">
                    <h3 className="center">Skills</h3>
                    <img
                      onClick={() => setOtherSelectedCategory(null)}
                      src={"/Icons/close.png"}
                      alt="Close"
                      className="close-icon"
                    />
                  </div>
                  <div className="skill-info">
                    {filteredSkills.length > 0 &&
                      otherSkills.map((elem) => (
                        <div
                          className={`skill-container ${
                            elem.serviceCategory === "Personal"
                              ? "PersonalBorder"
                              : elem.serviceCategory === "Professional"
                              ? "ProfessionalBorder"
                              : elem.serviceCategory === "Health and Wellness"
                              ? "healthBorder"
                              : elem.serviceCategory === "Educational"
                              ? "EducationalBorder"
                              : elem.serviceCategory === "Creative"
                              ? "creativeBorder"
                              : elem.serviceCategory === "Home"
                              ? "homeBorder"
                              : elem.serviceCategory === "Transportation"
                              ? "transportationBorder"
                              : ""
                          }`}
                          key={elem._id}
                          onClick={() => handleAddSkill(elem._id)}
                        >
                          {elem.name}
                        </div>
                      ))}
                  </div>
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
