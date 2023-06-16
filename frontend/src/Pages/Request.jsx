import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import service from "../service/service.js";
import Navbar from "./../Components/Navbar";

import { io } from "socket.io-client";

function Request() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [wallet, setWallet] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [provider, setProvider] = useState(null);
  const [firstMessage, setFirstMessage] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDetail, setRequestDetail] = useState("");
  const [bbAmount, setBbAmount] = useState(0);
  const [providerSkill, setProviderSkill] = useState("");
  const navigate = useNavigate();

  // function notifRequest() {
  const socket = io("http://localhost:5005");

  socket.on("notification", (data) => {
    console.log("Received notification:", data);
    // Display a push notification
    if (Notification.permission === "granted") {
      new Notification("You've been requested", {
        body: data.message,
      });
    }
    // socket.emit("notifToServer", (data))
  });

  function storeUserSocket(userId) {
    socket.emit("storeUserSocket", userId);
  }

  useEffect(() => {
    // Call the storeUserSocket function after the socket connection is established and the user is authenticated
    if (provider && user) {
      storeUserSocket(provider._id);
    }
  }, [provider, user]);
  //   socket.emit("notifRequest");
  // }

  // notifRequest();
  useEffect(() => {
    console.log("this is the provider use effect", provider);
  }, [provider]);

  async function getProvider() {
    try {
      const response = await service.get(`/user/${params.query}`);
      await setProvider(response.data.oneUser);
      console.log("this is the response", response);
      console.log("this is the provider", provider);
      console.log("this is the user", user);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("this is the provider", provider.email);
  async function getSkillCategory() {
    try {
      const response = await service.get(`/skills/${params.skill}`);
      console.log("this is the skill response", response);
      await setProviderSkill(response.data.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProvider();
    getSkillCategory();
  }, [user]);

  useEffect(() => {
    getWalletBB();
  }, [user]);

  async function handleSubmit(event) {
    if (bbAmount <= wallet) {
      try {
        event.preventDefault();
        try {
          const response = await service.post("/request", {
            name: requestTitle,
            provider: params.query,
            requester: user._id,
            bbAmount: bbAmount,
            category: params.skill,
            firstMessage: requestDetail,
            acceptButton: false,
          });
          navigate("/sent-requests");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setCanUpdate(false);
    }
  }

  async function getWalletBB() {
    try {
      const walletBB = await service.get(`/wallet`);
      setWallet(walletBB.data.barterBucks);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReset() {
    setCanUpdate(true);
  }

  return (
    <>
      {canUpdate && (
        <>
          <Navbar />
          <div className="titles" style={{ paddingTop: "5vh" }}>
            <h3>Request</h3>
          </div>
          <div>
            <form className="request-content" onSubmit={handleSubmit}>
              <div className="form-request-context">
                Skill requested : <b>{providerSkill}</b>
              </div>
              <div className="form-request-context">
                <label htmlFor="Request name">Title of your request</label>
                <input
                  type="text"
                  onChange={(event) => setRequestTitle(event.target.value)}
                />
              </div>
              <div className="form-request-context">
                <label htmlFor="Request detail">Detail your request</label>
                <textarea
                  type="textarea"
                  onChange={(event) => setRequestDetail(event.target.value)}
                />
              </div>
              <div className="form-request-context">
                <label htmlFor="BB Amount">
                  Set a BB amount for this request
                </label>
                <input
                  type="number"
                  onChange={(event) => setBbAmount(event.target.value)}
                />
              </div>
              <button className="request-button">Send your request</button>
            </form>
          </div>
        </>
      )}

      {!canUpdate && (
        <div>
          <Navbar />
          <div className="not-enough-bb">
            <div style={{ paddingTop: "5vh" }}>
              You tried to offer more BarterBucks than you possess.
            </div>
            <button onClick={handleReset}>
              Click here to try reseting a BarterBucks amount.
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Request;
