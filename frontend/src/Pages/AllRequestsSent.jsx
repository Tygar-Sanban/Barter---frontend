import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import { Link } from "react-router-dom";

function AllRequestsSent() {
  const { user } = useContext(AuthContext);
  const [sentRequests, setSentRequests] = useState([]);

  const [bbAmount, setBbAmount] = useState(0);

  async function fetchUserRequests() {
    try {
      const response = await service.get("/request/sentRequests");
      console.log("response data from the fetch sent requests", response.data);
      setSentRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserRequests();
  }, [user]);

  //   async function handleNegociate(elem) {
  //     try {
  //       console.log("this is the elem of the handle Accept", elem);
  //       await service.patch(`/request/${elem._id}`, { bbAmount: bbAmount });
  //       fetchUserRequests();
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     <form onSubmit={handleNegociate}>
  //     <label htmlFor="bbAmount">
  //       Change BB Amount of your request
  //     </label>
  //     <input
  //       type="number"
  //       placeholder="Your new price"
  //       onChange={(event) => setBbAmount(event.target.value)}
  //     />
  //     <button>Send the new BB amount</button>
  //   </form>
  //   }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {" "}
        <h2>Sent requests</h2>{" "}
      </div>
      {sentRequests &&
        sentRequests.map((elem) => {
          return (
            <div key={elem._id}>
              <div>Request title: {elem.name}</div>
              <div>Barter Bucks offered: {elem.bbAmount}</div>
              <Link to={`/sent-requests/${elem._id}`}>
                <button>Set a new price</button>
              </Link>
              <Link to={`/messages/${elem._id}`}>
                <button>Go to discussion</button>
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default AllRequestsSent;
