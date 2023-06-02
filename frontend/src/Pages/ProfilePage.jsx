import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Switch from "../Components/Switch";
import service from "./../service/service.js";

function ProfilePage() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [userServiceRequested, setUserServiceRequested] = useState([]);
  const [wallet, setWallet] = useState({});

  async function fetchWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data);
      console.log("this is the wallet response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllServices();
    fetchWallet();
  }, []);

  async function getAllServices() {
    try {
      const response = await service.get("/service");
      console.log(response.data);
      setUserServiceProvided(response.data.provided);
      setUserServiceRequested(response.data.requested);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <Navbar />
        <h1 style={{ paddingTop: "8%" }}>Profile Page</h1>
        <div>{user.name}</div>
        {user.skills.map((elem) => {
          return <div key={elem._id}>{elem.name}</div>;
        })}
        <Link to={"/modifySkills"}>
          <button>Modify Skills</button>
        </Link>
      </div>
      <div>
        <Switch />
      </div>
      <div>
        <h2>Services rendus</h2>
        {userServiceProvided.length !== 0 ? (
          userServiceProvided.map((elem) => {
            return <div key={elem._id}>{elem.name}</div>;
          })
        ) : (
          <div>You didn't provide any service yet, bitch</div>
        )}
      </div>
      <div>
        <h2>Services demandés</h2>
        {userServiceRequested.length !== 0 ? (
          userServiceRequested.map((elem) => {
            return <div key={elem._id}>{elem.name}</div>;
          })
        ) : (
          <div>You didn't request any service yet, bitch</div>
        )}
      </div>
      <div>
        <h2>Your BarterBucks</h2>
        <div>
          {wallet.barterBucks === 0 ? "You poor :(" : wallet.barterBucks}
        </div>
      </div>
      <div>
        <button onClick={logOutUser}>Logout</button>
      </div>
    </>
  );
}

export default ProfilePage;
