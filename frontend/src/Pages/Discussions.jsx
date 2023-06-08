import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

function Discussions() {
  const { user } = useContext(AuthContext);
  const [allDiscussions, setAllDiscussions] = useState([]);

  async function getAllDiscussions() {
    const response = await service.get("/discussion");
    console.log("this is the response", response);
    setAllDiscussions(response.data);
  }

  useEffect(() => {
    getAllDiscussions();
  }, []);

  useEffect(() => {
    console.log("those are all the discussions", allDiscussions);
  }, [allDiscussions]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        {allDiscussions?.map((elem) => {
          return (
            <Link key={elem._id}>
              {elem.requester._id === user._id ? (
                <div>{elem.provider.name}</div>
              ) : (
                <div>{elem.requester.name}</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Discussions;
