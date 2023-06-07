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
  const [
    userCurrentMissionsOngoingProvided,
    setUserCurrentMissionsOngoingProvided,
  ] = useState([]);
  const [
    userCurrentMissionsFinishedProvided,
    setUserCurrentMissionsFinishedProvided,
  ] = useState([]);
  const [
    userCurrentMissionsOngoingRequested,
    setUserCurrentMissionsOngoingRequested,
  ] = useState([]);
  const [
    userCurrentMissionsFinishedRequested,
    setUserCurrentMissionsFinishedRequested,
  ] = useState([]);
  const [twoButtons, setTwoButtons] = useState(true);
  const [providing, setProviding] = useState(false);
  const [requesting, setRequesting] = useState(false);

  async function getCurrentMissions() {
    try {
      const response = await service.get("/current-mission");
      console.log("this is the response", response);
      if (response) {
        setUserCurrentMissions(
          response.data.filter((elem) => {
            console.log("this is the elem", elem);
            return (
              elem.request.provider === user._id ||
              elem.request.requester === user._id
            );
          })
        );
      }
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

  useEffect(() => {
    const requesterFinished = userCurrentMissionsFinished.filter((elem) => {
      return elem.request.requester === user._id;
    });
    setUserCurrentMissionsFinishedRequested(requesterFinished);
    const providerFinished = userCurrentMissionsFinished.filter((elem) => {
      return elem.request.provider === user._id;
    });
    setUserCurrentMissionsFinishedProvided(providerFinished);
    const requesterOngoing = userCurrentMissionsOngoing.filter((elem) => {
      return elem.request.requester === user._id;
    });
    setUserCurrentMissionsOngoingRequested(requesterOngoing);
    const providerOngoing = userCurrentMissionsOngoing.filter((elem) => {
      return elem.request.provider === user._id;
    });
    setUserCurrentMissionsOngoingProvided(providerOngoing);
  }, [userCurrentMissionsFinished, userCurrentMissionsOngoing]);

  async function handleClickProvider() {
    setProviding(true);
    setRequesting(false);
    setTwoButtons(false);
  }
  async function handleClickRequester() {
    setRequesting(true);
    setProviding(false);
    setTwoButtons(false);
  }

  return (
    <>
      <Navbar />
      {twoButtons && (
        <div className="request-paths" style={{ paddingTop: "8vh" }}>
          <button onClick={handleClickProvider}>Services you provide</button>
          <button onClick={handleClickRequester}>Services you request</button>
        </div>
      )}
      {providing && (
        <>
          <div style={{ paddingTop: "8vh" }}>
            {" "}
            <h2>Current Missions</h2>{" "}
          </div>
          <div>
            {userCurrentMissionsOngoingProvided.length > 0 ? (
              <h3>Ongoing services</h3>
            ) : (
              <div>
                <h3>You have no ongoing services.</h3>
              </div>
            )}
            {userCurrentMissionsOngoingProvided.length > 0 &&
              userCurrentMissionsOngoingProvided.map((elem) => {
                const url = `/current-mission/${elem._id}`;
                return (
                  <Link key={elem._id} to={url}>
                    <div>{elem.request.name}</div>
                  </Link>
                );
              })}
          </div>
          <button onClick={handleClickRequester}>Services you request</button>
        </>
      )}
      {requesting && (
        <>
          <div style={{ paddingTop: "8vh" }}>
            {" "}
            <h2>Current Missions</h2>{" "}
          </div>
          <div>
            {userCurrentMissionsOngoingRequested.length > 0 ? (
              <h3>Ongoing requests</h3>
            ) : (
              <div>
                <h3>You have no ongoing request.</h3>
              </div>
            )}

            {userCurrentMissionsOngoingRequested.length > 0 &&
              userCurrentMissionsOngoingRequested.map((elem) => {
                const url = `/current-mission/${elem._id}`;
                return (
                  <Link key={elem._id} to={url}>
                    <div>{elem.request.name}</div>
                  </Link>
                );
              })}
          </div>
          <button onClick={handleClickProvider}>Services you provide</button>
        </>
      )}
    </>
  );
}

export default CurrentMissions;
