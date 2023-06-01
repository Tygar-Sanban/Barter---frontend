import React, { useEffect, useState } from "react";
import axios from "axios";

function Personal() {
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
      <div className="title">
        <h3>Personal Services</h3>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Personal") {
            return <div key={elem._id}>{elem.name}</div>;
          }
        })}
      </div>
    </div>
  );
}

export default Personal;
