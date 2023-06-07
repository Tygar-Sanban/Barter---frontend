import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

function CurrentMission() {
  const params = useParams();
  const [currentMission, setCurrentMission] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(params);

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
        `/wallet/${currentMission.request.provider}`,
        { barterBucks: currentMission.request.bbAmount }
      );
      const bbRequester = await service.patch(
        `/wallet/${currentMission.request.requester}`,
        { barterBucks: currentMission.request.bbAmount * -1 }
      );
      navigate("/current-missions");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleCurrentMission();
  }, []);

  return (
    <div>
      <Navbar />
      {currentMission && (
        <div style={{ paddingTop: "8vh" }}>
          <h2>Current Mission</h2>
          {user?._id === currentMission.request.provider ? (
            <div>
              You still need to accomplish {currentMission.request.name}
            </div>
          ) : (
            <div>You requested {currentMission.request.name}</div>
          )}
          <div>
            This request is worth {currentMission.request.bbAmount} BarterBucks
            !
          </div>
          <div>
            {user?._id === currentMission.request.provider ? (
              <div>
                <Link to={`/messages/${currentMission.request._id}`}>
                  <button>Go to discussion</button>
                </Link>
                <button onClick={deleteMission}>Delete this mission</button>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="validation">
                    Validate the success of this mission (you won't be able to
                    cancel the validation)
                  </label>
                  <input
                    type="checkbox"
                    checked={currentMission.validation}
                    onChange={handleSwitch}
                  />
                  Status: {currentMission.validation ? "Finished" : "Ongoing"}
                </div>
                <Link to={`/messages/${currentMission.request._id}`}>
                  <button>Go to discussion</button>
                </Link>
                <button onClick={deleteMission}>Delete this mission</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentMission;
