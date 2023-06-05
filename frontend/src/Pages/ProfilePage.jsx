import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Switch from "../Components/Switch";
import service from "./../service/service.js";
import SkillsFactor from "../Components/SkillsFactor";

function ProfilePage() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [userServiceRequested, setUserServiceRequested] = useState([]);
  const [wallet, setWallet] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);

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
      console.log(userServiceProvided);
      console.log(userServiceRequested);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    user &&
      user.skills.length > 0 &&
      setFilteredSkills(
        user.skills.filter((elem) => elem.serviceCategory === selectedCategory)
      );
  }, [selectedCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1 style={{ paddingTop: "8vh" }}>Profile Page</h1>
        <div>{user.name}</div>
        <div>
          <h2>Categories</h2>
          <ul>
            <li onClick={() => handleCategoryClick("Personal")}>Personal</li>
            <li onClick={() => handleCategoryClick("Professional")}>
              Professional
            </li>
            <li onClick={() => handleCategoryClick("Health and Wellness")}>
              Health and Wellness
            </li>
            <li onClick={() => handleCategoryClick("Educational")}>
              Educational
            </li>
            <li onClick={() => handleCategoryClick("Creative")}>Creative</li>
            <li onClick={() => handleCategoryClick("Home")}>Home</li>
            <li onClick={() => handleCategoryClick("Transportation")}>
              Transportation
            </li>
          </ul>

          {selectedCategory && (
            <>
              <h2>Skills</h2>
              <ul>
                {user.skills.length > 0 &&
                  filteredSkills.map((elem) => (

                    <li key={elem._id}>{elem.name}</li>

                  ))}
              </ul>
            </>
          )}
        </div>
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
