import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import { Link, useParams, useNavigate } from "react-router-dom";

function Negociate() {
  const { user } = useContext(AuthContext);
  const [wallet, setWallet] = useState(0);
  const [bbAmount, setBbAmount] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [sentRequests, setSentRequests] = useState([]);
  const [canUpdate, setCanUpdate] = useState(true);

  async function handleNegociate() {
    if (bbAmount <= wallet) {
      try {
        navigate("/sent-requests");
        await service.patch(`/request/${params.query}`, { bbAmount: bbAmount });
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

  async function fetchUserRequests() {
    try {
      const response = await service.get(`/request/${params.query}`);
      setSentRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserRequests();
    getWalletBB();
  }, [user]);

  const url = `/sent-requests/${params.query}`;

  async function handleReset() {
    setCanUpdate(true);
  }

  return (
    <>
      {canUpdate && (
        <>
          <Navbar />
          <div style={{ paddingTop: "5vh" }}>
            <h3 className="title">{sentRequests.name}</h3>
          </div>
          <div className="negociate-content">
            <div>Detail of your request : {sentRequests.firstMessage}</div>
            <div>Current BB offer you made: {sentRequests.bbAmount}</div>

            <form className="negociate-content" onSubmit={handleNegociate}>
              <label htmlFor="bbAmount">
                Modify the BB Amount of this request
              </label>
              <input
                type="number"
                placeholder="Your new offer"
                onChange={(event) => setBbAmount(event.target.value)}
              />
              <button>Send the new BB amount</button>
            </form>
          </div>
        </>
      )}

      {!canUpdate && (
        <div>
          <Navbar />
          <div style={{ paddingTop: "8vh" }}>
            You tried to offer more BarterBucks than you possess.
          </div>
          <button onClick={handleReset}>
            Click here to try reseting a BarterBucks amount.
          </button>
        </div>
      )}
    </>
  );
}

export default Negociate;
