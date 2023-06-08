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
  };

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    props.skill?.length > 0 &&
      setFilteredSkills(
        props.skill.filter((elem) => elem.serviceCategory === selectedCategory)
      );
  }, [selectedCategory]);

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
          <div>
            <h2>Categories</h2>
            <div className="category-buttons">
              <button
                onClick={() => handleCategoryClick("Personal")}
                className={selectedCategory === "Personal" ? "active" : ""}
              >
                Personal
              </button>
              <button
                onClick={() => handleCategoryClick("Professional")}
                className={selectedCategory === "Professional" ? "active" : ""}
              >
                Professional
              </button>
              <button
                onClick={() => handleCategoryClick("Health and Wellness")}
                className={
                  selectedCategory === "Health and Wellness" ? "active" : ""
                }
              >
                Health and Wellness
              </button>
              <button
                onClick={() => handleCategoryClick("Educational")}
                className={selectedCategory === "Educational" ? "active" : ""}
              >
                Educational
              </button>
              <button
                onClick={() => handleCategoryClick("Creative")}
                className={selectedCategory === "Creative" ? "active" : ""}
              >
                Creative
              </button>
              <button
                onClick={() => handleCategoryClick("Home")}
                className={selectedCategory === "Home" ? "active" : ""}
              >
                Home
              </button>
              <button
                onClick={() => handleCategoryClick("Transportation")}
                className={
                  selectedCategory === "Transportation" ? "active" : ""
                }
              >
                Transportation
              </button>
            </div>

            {selectedCategory && (
              <>
                <div className="category-buttons">
                  <h2>Skills</h2>
                  <img
                    onClick={() => setSelectedCategory(null)}
                    src={"/public/Icons/close.png"}
                    alt="Close"
                    className="close-icon"
                  />
                </div>
                <div className="category-buttons">
                  {filteredSkills &&
                    filteredSkills.length > 0 &&
                    filteredSkills.map((elem) => (
                      <button
                        key={elem._id}
                        data-value={elem._id}
                        onClick={handleSkillSelection}
                      >
                        {elem.name}
                      </button>
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
