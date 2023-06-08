import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import axios from "axios";
import { Link } from "react-router-dom";

function AllRequests() {
  const { user } = useContext(AuthContext);
  const [ownRequests, setOwnRequests] = useState([]);
  const [acceptRequest, setAcceptRequest] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  // route créée dans le back pour gérer les requetes qui matchent mon id avec le payload.
  //
  async function fetchUserRequests() {
    try {
      const response = await service.get("/request/me");
      console.log("response data from the fetch own requests", response.data);
      setOwnRequests(
        response.data.filter((elem) => {
          return elem.acceptButton === false;
        })
      );
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
      await service.post(`/current-mission/`, { request: elem._id });
      fetchUserRequests();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDecline(elem) {
    try {
      console.log("this is the elem of the handle Decline", elem);
      await service.delete(`/request/${elem._id}`);
      fetchUserRequests();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleMessage(elem) {
    try {
      await service.patch(`/request/${elem._id}`, { messages: messageInput });

      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="title" style={{ paddingTop: "13vh" }}>
        <h2>They're waiting for you !</h2>{" "}
      </div>

      {ownRequests &&
        ownRequests.map((elem) => {
          return (
            <div className="request-received" key={elem._id}>
              <h3>
                {elem.name} by {elem.requester.name}{" "}
              </h3>
              <div>Barter Bucks offered : {elem.bbAmount}</div>
              <div>Message from the requester : {elem.messages}</div>
              <div className="request-buttons">
                <button onClick={() => handleAccept(elem)}>
                  Accept request
                </button>
                <button onClick={() => handleDecline(elem)}>
                  Decline request
                </button>
                <Link to={`/messages/${elem._id}`}>
                  <button>Send a message to the requester</button>
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default AllRequests;
