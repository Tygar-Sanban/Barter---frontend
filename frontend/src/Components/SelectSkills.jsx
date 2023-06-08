import React, { useState, useEffect } from "react";
import service from "../service/service.js";

const SelectSkills = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    service
      .get("/skills")
      .then((response) => {
        console.log("this si the response yo !", response);
        props.setSkill(response.data);
        console.log("and those are the skills", props.skill);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const handleSkillSelection = (event) => {
    if (props.selectedSkill.includes(event.target.dataset.value)) {
      const deleted = props.selectedSkill.filter((elem) => {
        return elem !== event.target.dataset.value;
      });
      props.setSelectedSkill(deleted);
      return;
    }
    props.setSelectedSkill((current) => [
      ...current,
      event.target.dataset.value,
    ]);
    props.setSkill((current) =>
      current.filter((skill) => skill._id !== event.target.dataset.value)
    );
    getFilteredSkills();
    console.log("those are the selected skills", props.selectedSkill);
  };

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  async function getFilteredSkills() {
    try {
      props.skill?.length > 0 &&
        setFilteredSkills(
          props.skill.filter(
            (elem) => elem.serviceCategory === selectedCategory
          )
        );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFilteredSkills();
  }, [selectedCategory, props.skill]);

  useEffect(() => {
    console.log("those are the filteredskills", filteredSkills);
    console.log("those are the props.skills", props.skill);
  }, [filteredSkills, props.skill]);

  return (
    <div>
      {!props.skill?.length > 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="select-skills-signup">
            <h2>Select what skills you can offer the community.</h2>
            <h3>Select a category.</h3>
            <div className="selectskills-category-buttons">
              <div
                onClick={() => handleCategoryClick("Personal")}
                id={selectedCategory === "Personal" ? "active" : ""}
              >
                Personal
              </div>
              <div
                onClick={() => handleCategoryClick("Professional")}
                id={selectedCategory === "Professional" ? "active" : ""}
              >
                Professional
              </div>
              <div
                onClick={() => handleCategoryClick("Health and Wellness")}
                id={selectedCategory === "Health and Wellness" ? "active" : ""}
              >
                Health and Wellness
              </div>
              <div
                onClick={() => handleCategoryClick("Educational")}
                id={selectedCategory === "Educational" ? "active" : ""}
              >
                Educational
              </div>
              <div
                onClick={() => handleCategoryClick("Creative")}
                id={selectedCategory === "Creative" ? "active" : ""}
              >
                Creative
              </div>
              <div
                onClick={() => handleCategoryClick("Home")}
                id={selectedCategory === "Home" ? "active" : ""}
              >
                Home
              </div>
              <div
                onClick={() => handleCategoryClick("Transportation")}
                id={selectedCategory === "Transportation" ? "active" : ""}
              >
                Transportation
              </div>
            </div>

            {selectedCategory && (
              <>
                <div
                  style={{ marginTop: "2rem" }}
                  className="visible-skill-selection"
                >
                  <h3>Select a skill.</h3>
                  <img
                    onClick={() => setSelectedCategory(null)}
                    src={"/Icons/close.png"}
                    alt="Close"
                    className="close-icon"
                    style={{ marginLeft: "0.5rem" }}
                  />
                </div>
                <div className="selectskills-category-buttons">
                  {filteredSkills &&
                    filteredSkills.length > 0 &&
                    filteredSkills.map((elem) => (
                      <div
                        key={elem._id}
                        data-value={elem._id}
                        onClick={handleSkillSelection}
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
  );
};

export default SelectSkills;
