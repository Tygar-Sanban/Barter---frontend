import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import { Link, useParams, useNavigate } from "react-router-dom";

function Negociate() {
  const { user } = useContext(AuthContext);
  const [bbAmount, setBbAmount] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [sentRequests, setSentRequests] = useState([]);

  async function handleNegociate() {
    console.log(params.query);

    try {
      await service.patch(`/request/${params.query}`, { bbAmount: bbAmount });
      navigate("/sent-requests");
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserRequests() {
    try {
      const response = await service.get(`/request/${params.query}`);
      console.log("response data from the fetch sent requests", response.data);
      setSentRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserRequests();
  }, [user]);

  return (
    <>
      <div>Title of your request : {sentRequests.name}</div>
      <div>Detail of your request : {sentRequests.firstMessage}</div>
      <div>Initial Bb offer you made: {sentRequests.bbAmount}</div>

      <form onSubmit={handleNegociate}>
        <label htmlFor="bbAmount">Modify the BB Amount of this request</label>
        <input
          type="number"
          placeholder="Your new price"
          onChange={(event) => setBbAmount(event.target.value)}
        />
        <button>Send the new BB amount</button>
      </form>
    </>
  );
}

export default Negociate;
