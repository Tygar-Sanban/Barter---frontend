import React from "react";
import { useState, useEffect } from "react";
import service from "../service/service";
import { Link } from "react-router-dom";

function SkillsFactor(props) {
  const [allSkills, setAllSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);

  async function getSkills() {
    try {
      const skills = await service.get("/skills");
      console.log("those are the skills", skills);
      setAllSkills(skills.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSkills();
  }, []);

  useEffect(() => {
    allSkills.length > 0 &&
      setFilteredSkills(
        allSkills.filter((elem) => elem.serviceCategory === selectedCategory)
      );
  }, [selectedCategory]);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
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
        <li onClick={() => handleCategoryClick("Educational")}>Educational</li>
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
            {allSkills.length > 0 &&
              filteredSkills.map((elem) => (
                <Link key={elem._id} to={props.link}>
                  <li>{elem.name}</li>
                </Link>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SkillsFactor;
