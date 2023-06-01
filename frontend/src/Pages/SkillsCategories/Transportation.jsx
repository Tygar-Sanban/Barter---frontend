import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";

function Transportation() {
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
        <h3>Transportation Services</h3>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Transportation") {
            return <div key={elem._id}>{elem.name}</div>;
          }
        })}
      </div>
    </div>
  );
}

export default Transportation;
