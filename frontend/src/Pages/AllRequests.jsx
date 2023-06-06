import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import axios from "axios";

function AllRequests() {
  const { user } = useContext(AuthContext);
  const [ownRequests, setOwnRequests] = useState([]);
  const [acceptRequest, setAcceptRequest] = useState(false);

  // route créée dans le back pour gérer les requetes qui matchent mon id avec le payload.
  //
  async function fetchUserRequests() {
    try {
      const response = await service.get("/request/me");
      console.log("response data from the fetch own requests", response.data);
      setOwnRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserRequests();
  }, [user]);

  async function handleAccept(elem) {
    try {
      console.log("this is the elem of the handle Accept", elem);
      await service.patch(`/request/${elem._id}`, { acceptButton: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {" "}
        <h2>AllRequests</h2>{" "}
      </div>
      {ownRequests &&
        ownRequests.map((elem) => {
          return (
            <div key={elem._id}>
              <div>Request title : {elem.name}</div>
              <div>Barter Bucks offered : {elem.bbAmount}</div>
              <div>Message from the requester : {elem.messages}</div>
              <button onClick={() => handleAccept(elem)}>Accept request</button>

              <button>Decline request</button>
            </div>
          );
        })}
    </>
  );
}

export default AllRequests;
