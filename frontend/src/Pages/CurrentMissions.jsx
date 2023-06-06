import React, { useContext, useEffect, useState } from "react";
import service from "../service/service";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";

function CurrentMissions() {
  const { user } = useContext(AuthContext);
  const [userCurrentMissions, setUserCurrentMissions] = useState([]);
  const [userCurrentMissionsOngoing, setUserCurrentMissionsOngoing] = useState(
    []
  );
  const [userCurrentMissionsFinished, setUserCurrentMissionsFinished] =
    useState([]);

  async function getCurrentMissions() {
    try {
      const response = await service.get("/current-mission");
      console.log("this is the response", response);
      setUserCurrentMissions(
        response.data.filter((elem) => {
          return (
            elem.request.provider === user._id ||
            elem.request.requester === user._id
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getCurrentMissions();
    }
  }, [user]);

  useEffect(() => {
    const finishedMissions = userCurrentMissions.filter((elem) => {
      return elem.validation === true;
    });
    setUserCurrentMissionsFinished(finishedMissions);
    const ongoingMissions = userCurrentMissions.filter((elem) => {
      return elem.validation === false;
    });
    setUserCurrentMissionsOngoing(ongoingMissions);
  }, [userCurrentMissions]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {" "}
        <h2>Current Missions</h2>{" "}
      </div>
      <div>
        <h3>Ongoing missions</h3>
        {userCurrentMissionsOngoing.length > 0 &&
          userCurrentMissionsOngoing.map((elem) => {
            const url = `/current-mission/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div>{elem.request.name}</div>
              </Link>
            );
          })}
      </div>
      <div>
        <h3>Finished missions</h3>
        {userCurrentMissionsFinished.length > 0 &&
          userCurrentMissionsFinished.map((elem) => {
            const url = `/current-mission/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div>{elem.request.name}</div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default CurrentMissions;
