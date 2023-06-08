import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import Switch from "@mui/material/Switch";

function CurrentMission() {
  const params = useParams();
  const [currentMission, setCurrentMission] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getSingleCurrentMission() {
    try {
      const response = await service.get(`/current-mission/${params.id}`);
      setCurrentMission(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMission() {
    try {
      navigate("/current-missions");
      const response = await service.delete(`/current-mission/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSwitch() {
    try {
      const response = await service.patch(`/current-mission/${params.id}`, {
        validation: true,
      });
      getSingleCurrentMission();
      const bbProvider = await service.patch(
        `/wallet/${currentMission.request.provider._id}`,
        { barterBucks: currentMission.request.bbAmount }
      );
      const bbRequester = await service.patch(
        `/wallet/${currentMission.request.requester._id}`,
        { barterBucks: currentMission.request.bbAmount * -1 }
      );
      setTimeout(() => {
        navigate("/current-missions");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleCurrentMission();
    console.log("this is the current mission", currentMission);
  }, []);

  return (
    <div>
      <Navbar />
      {currentMission && (
        <div style={{ paddingTop: "5vh" }}>
          <h2 className="title">{currentMission.request.name}</h2>
          <div className="current-mission-content">
            {user?._id === currentMission.request.provider._id ? (
              <div>
                You still need to accomplish this service for{" "}
                {currentMission.request.requester.name}.
              </div>
            ) : (
              <div>
                You requested {currentMission.request.name} to{" "}
                {currentMission.request.provider.name}{" "}
              </div>
            )}
            <div>
              This request is worth {currentMission.request.bbAmount}{" "}
              BarterBucks !
            </div>
          </div>
          <div>
            {user?._id === currentMission.request.provider._id ? (
              <div className="current-mission-buttons">
                <Link to={`/messages/${currentMission.request._id}`}>
                  <button>Go to discussion</button>
                </Link>
                <button onClick={deleteMission}>Delete this mission</button>
              </div>
            ) : (
              <>
                <div className="current-mission-content">
                  <label htmlFor="validation">
                    Validate the success of this mission ! (You won't be able to
                    cancel the validation)
                  </label>
                  <div>
                    <Switch
                      checked={currentMission.validation}
                      onChange={handleSwitch}
                      inputProps={{ "aria-label": "Switch demo" }}
                    />
                    Status: {currentMission.validation ? "Finished" : "Ongoing"}
                  </div>
                </div>
                <div className="current-mission-buttons">
                  <Link to={`/messages/${currentMission.request._id}`}>
                    <button>Go to discussion</button>
                  </Link>
                  <button onClick={deleteMission}>Delete this mission</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentMission;
