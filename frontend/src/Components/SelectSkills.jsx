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
            <ul>
              <li onClick={() => handleCategoryClick("Personal")}>Personal</li>
              <li onClick={() => handleCategoryClick("Professional")}>
                Professional
              </li>
              <li onClick={() => handleCategoryClick("Health and Wellness")}>
                Health and Wellness
              </li>
              <li onClick={() => handleCategoryClick("Educational")}>
                Educational
              </li>
              <li onClick={() => handleCategoryClick("Creative")}>Creative</li>
              <li onClick={() => handleCategoryClick("Home")}>Home</li>
              <li onClick={() => handleCategoryClick("Transportation")}>
                Transportation
              </li>
            </ul>

            {selectedCategory && (
              <>
                <h2>Skills</h2>
                <ul>
                  {filteredSkills &&
                    filteredSkills.length > 0 &&
                    filteredSkills.map((elem) => (
                      <li
                        key={elem._id}
                        data-value={elem._id}
                        onClick={handleSkillSelection}
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
  );
};

export default SelectSkills;
