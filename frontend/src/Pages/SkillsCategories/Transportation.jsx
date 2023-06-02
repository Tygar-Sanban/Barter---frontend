import React, { useEffect, useState } from "react";
import service from "../../service/service.js";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function Transportation() {
  const [skills, setSkills] = useState([]);

  async function getAllSkills() {
    const response = await service.get("/skills");
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
      <div className="title" style={{ paddingTop: "8vh" }}>
        <h3>Transportation Services</h3>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Transportation") {
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

export default Transportation;
