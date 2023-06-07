import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import service from "../service/service.js";
import Navbar from "./../Components/Navbar";

function Request() {
  const { user } = useContext(AuthContext);
  const params = useParams();

  console.log("this is the params", params.query);
  console.log("this is the skill param", params.skill);

  const [provider, setProvider] = useState(null);
  const [firstMessage, setFirstMessage] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDetail, setRequestDetail] = useState("");
  const [bbAmount, setBbAmount] = useState(0);
  const [providerSkill, setProviderSkill] = useState("");
  const navigate = useNavigate();

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
  }, []);

  async function handleSubmit(event) {
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
  }

  return (
    <>
      <Navbar />
      <div className="title" style={{ paddingTop: "8vh" }}>
        Request
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Request name">Title of your request</label>
          <input
            type="text"
            onChange={(event) => setRequestTitle(event.target.value)}
          />
          <label htmlFor="Request detail">Detail your request</label>
          <input
            type="textarea"
            onChange={(event) => setRequestDetail(event.target.value)}
          />
          <label htmlFor="BB Amount">Set a BB amount for this request</label>
          <input
            type="number"
            onChange={(event) => setBbAmount(event.target.value)}
          />
          <div>Request category : {providerSkill}</div>
          <button>Send your request</button>
        </form>
      </div>
    </>
  );
}

export default Request;
