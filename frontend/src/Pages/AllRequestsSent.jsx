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
      setSentRequests(
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

  async function handleDelete(id) {
    try {
      const deletedRequest = await service.delete(`/request/${id}`);
      fetchUserRequests();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="title" style={{ paddingTop: "5vh" }}>
        {" "}
        <h2 className="title">Sent requests</h2>{" "}
      </div>
      {sentRequests &&
        sentRequests.map((elem) => {
          console.log("this is the elem", elem);
          return (
            <div className="request-received" key={elem._id}>
              <h3>
                {elem.name} for {elem.provider.name}{" "}
              </h3>
              <div>Barter Bucks offered: {elem.bbAmount}</div>
              <div className="request-buttons">
                <Link to={`/sent-requests/${elem._id}`}>
                  <button>Set a new price</button>
                </Link>
                <Link to={`/messages/${elem._id}`}>
                  <button>Go to discussion</button>
                </Link>
                <button onClick={() => handleDelete(elem._id)}>
                  Delete this request
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default AllRequestsSent;
