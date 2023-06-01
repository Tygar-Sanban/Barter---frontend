import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Switch from "../Components/Switch";

function ProfilePage() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [service, setService] = useState([]);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [userServiceRequested, setUserServiceRequested] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [bbAmount, setBbAmount] = useState([]);

  async function fetchAllSkills() {
    try {
      const response = await axios.get("http://localhost:5005/skills");
      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWallet() {
    try {
      const response = await axios.get("http://localhost:5005/wallet");
      setWallet(response.data);
      console.log("this is the wallet response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSkills();
    getAllServices();
    fetchWallet();
  }, []);

  useEffect(() => {
    console.log(user);
    if (skills.length > 0 && !isLoading) {
      const skillBrowsing = skills.filter((elem) =>
        user.skills.includes(elem._id)
      );
      setUserSkills(skillBrowsing);
    }
    if (service.length > 0 && !isLoading) {
      const servicesProvided = service.filter(
        (elem) => elem.provider === user._id
      );
      setUserServiceProvided(servicesProvided);
    }
    if (service.length > 0 && !isLoading) {
      const servicesRequested = service.filter(
        (elem) => elem.requester === user._id
      );
      setUserServiceRequested(servicesRequested);
    }
    if (wallet.length > 0 && !isLoading) {
      const userWallet = wallet.filter((elem) => elem.user === user._id);
      setBbAmount(userWallet);
    }
  }, [skills]);

  async function getAllServices() {
    try {
      const response = await axios.get("http://localhost:5005/service");
      console.log(response.data);
      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <div>{user.name}</div>
        {skills.length !== 0 && userSkills.length !== 0 ? (
          userSkills.map((elem) => {
            return <div key={elem._id}>{elem.name}</div>;
          })
        ) : (
          <div>Loading...</div>
        )}
        <Link to={"/modifySkills"}>
          <button>Modify Skills</button>
        </Link>
      </div>
      <div>
        <Switch />
      </div>
      <div>
        <h2>Services rendus</h2>
        {service.length !== 0 && userServiceProvided.length !== 0 ? (
          userServiceProvided.map((elem) => {
            return <div key={elem._id}>{elem.name}</div>;
          })
        ) : (
          <div>You didn't provide any service yet, bitch</div>
        )}
      </div>
      <div>
        <h2>Services demandés</h2>
        {service.length !== 0 && userServiceRequested.length !== 0 ? (
          userServiceRequested.map((elem) => {
            return <div key={elem._id}>{elem.name}</div>;
          })
        ) : (
          <div>You didn't request any service yet, bitch</div>
        )}
      </div>
      <div>
        <h2>Your BarterBucks</h2>
        {wallet.length !== 0 && bbAmount.length !== 0 ? (
          bbAmount.map((elem) => {
            return <div key={elem._id}>{elem.barterBucks}</div>;
          })
        ) : (
          <div>Provide services to get more barterBucks !</div>
        )}
      </div>
      <div>
        <button onClick={logOutUser}>Logout</button>
      </div>
    </>
  );
}

export default ProfilePage;
