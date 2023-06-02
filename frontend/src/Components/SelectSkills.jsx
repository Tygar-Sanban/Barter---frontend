import React, { useState, useEffect } from "react";
import service from "../service/service.js";

const SelectSkills = (props) => {
  useEffect(() => {
    // Fetch the skills from the server
    axios
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

  const personalSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Personal"
  );
  const professionalSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Professional"
  );
  const healthAndWellnessSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Health and Wellness"
  );
  const educationalSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Educational"
  );
  const creativeSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Creative"
  );
  const homeSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Home"
  );
  const transportationSkills = props.skill.filter(
    (elem) => elem.serviceCategory === "Transportation"
  );

  return (
    <div>
      {!props.skill.length ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Personal Services</h2>
          {personalSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Professional Services</h2>
          {professionalSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Health and Wellness Services</h2>
          {healthAndWellnessSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Educational Services</h2>
          {educationalSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Creative Services</h2>
          {creativeSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Home Services</h2>
          {homeSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
          <h2>Transportation Services</h2>
          {transportationSkills.map((elem) => (
            <div
              key={elem._id}
              data-value={elem._id}
              onClick={handleSkillSelection}
            >
              {elem.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SelectSkills;
