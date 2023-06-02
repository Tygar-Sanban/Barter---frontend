import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function HealthAndWellness() {
  const [skills, setSkills] = useState([]);

  async function getAllSkills() {
    const response = await axios.get("http://localhost:5005/skills");
    setSkills(response.data);
  }

  useEffect(() => {
    getAllSkills();
  }, []);

  if (skills.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="title">
        <h3>Health and Wellness Services</h3>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Health and Wellness") {
            const url = `/search-result/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div>{elem.name}</div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default HealthAndWellness;
