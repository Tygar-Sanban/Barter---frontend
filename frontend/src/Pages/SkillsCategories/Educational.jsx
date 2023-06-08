import React, { useEffect, useState } from "react";
import service from "../../service/service.js";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function Educational() {
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
      <div className="title" style={{ paddingTop: "5vh" }}>
        <h2 className="title">Educational Services</h2>
      </div>
      <div className="indications">
        <h4>Which skill are you interrested in ?</h4>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Educational") {
            const url = `/search-result/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <button>{elem.name}</button>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Educational;
