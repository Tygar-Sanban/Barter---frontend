import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SwitchComponent from "../Components/SwitchComponent";
import service from "./../service/service.js";

function ProfilePage() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [userServiceRequested, setUserServiceRequested] = useState([]);
  const [wallet, setWallet] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [userFinishedMission, setUserFinishedMission] = useState([]);
  const [userServicesAsked, setUserServicesAsked] = useState([]);

  async function fetchWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data);
      console.log("this is the wallet response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserMission() {
    try {
      const response = await service.get("/current-mission");
      console.log("response user mission", response);
      if (response) {
        setUserFinishedMission(
          response.data.filter((elem) => {
            console.log("this is THE ELEM", elem);
            return (
              elem.validation === true && elem.request.provider === user._id
            );
          })
        );
        console.log("user finished mission", userFinishedMission);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserServicesAsked() {
    try {
      const response = await service.get("/current-mission");
      console.log("response user mission", response);
      if (response) {
        setUserServicesAsked(
          response.data.filter((elem) => {
            console.log("this is THE ELEM", elem);
            return (
              elem.validation === true && elem.request.requester === user._id
            );
          })
        );
        console.log("user services asked", userServicesAsked);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllServices();
    fetchWallet();
    getUserMission();
    getUserServicesAsked();
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
      <div style={{ paddingTop: "5vh" }}>
        <div className="profile-info">
          <img
            src={user.picture}
            alt="profile picture"
            className="profile-pic"
          />
          <div>
            <h2>{user.name}</h2>
            <div className="divider"></div>
            <div>
              <h3>Your Wallet</h3>
              <div className="barterbucks">
                {wallet.barterBucks === 0 ? "You poor :(" : wallet.barterBucks}
              </div>
            </div>
          </div>
        </div>
        <div className="switch">
          <SwitchComponent />
        </div>
        <div className="categories">
          <h2>Browse categories and check the skills you have</h2>
          <div className="divider-container">
            <div className="divider"></div>
          </div>
          <div className="category-buttons">
            <button
              onClick={() => handleCategoryClick("Personal")}
              className={selectedCategory === "Personal" ? "active" : ""}
            >
              Personal
            </button>
            <button
              onClick={() => handleCategoryClick("Professional")}
              className={selectedCategory === "Professional" ? "active" : ""}
            >
              Professional
            </button>
            <button
              onClick={() => handleCategoryClick("Health and Wellness")}
              className={
                selectedCategory === "Health and Wellness" ? "active" : ""
              }
            >
              Health and Wellness
            </button>
            <button
              onClick={() => handleCategoryClick("Educational")}
              className={selectedCategory === "Educational" ? "active" : ""}
            >
              Educational
            </button>
            <button
              onClick={() => handleCategoryClick("Creative")}
              className={selectedCategory === "Creative" ? "active" : ""}
            >
              Creative
            </button>
            <button
              onClick={() => handleCategoryClick("Home")}
              className={selectedCategory === "Home" ? "active" : ""}
            >
              Home
            </button>
            <button
              onClick={() => handleCategoryClick("Transportation")}
              className={selectedCategory === "Transportation" ? "active" : ""}
            >
              Transportation
            </button>
          </div>

          {selectedCategory && (
            <>
              <div className="category-buttons">
                <h2>Skills details</h2>

                <img
                  onClick={() => setSelectedCategory(null)}
                  src={"/public/Icons/close.png"}
                  alt="Close"
                  className="close-icon"
                />
              </div>
              <div className="category-buttons">
                {user.skills.length > 0 &&
                  filteredSkills.map((elem) => (
                    <button key={elem._id}>{elem.name}</button>
                  ))}
              </div>
            </>
          )}
        </div>

        <div className="divider-container">
          <div className="divider"></div>
        </div>
      </div>

      <div className="services">
        <div>
          <h2>Services rendus</h2>
          {userFinishedMission.length !== 0 ? (
            userFinishedMission.map((elem) => {
              return <div key={elem._id}>{elem.request.name}</div>;
            })
          ) : (
            <div>You didn't provide any service yet, bitch</div>
          )}
        </div>
        <div>
          <h2>Services demandés</h2>
          {userServicesAsked.length !== 0 ? (
            userServicesAsked.map((elem) => {
              return <div key={elem._id}>{elem.request.name}</div>;
            })
          ) : (
            <div>No one answered your requests ...</div>
          )}
        </div>
      </div>
      <div className="modifyDiv">
        <Link to={"/modifySkills"}>
          <button className="modifyBtn">Modify your profile</button>
        </Link>
      </div>
      <div className="logout">
        <button onClick={logOutUser}>Logout</button>
      </div>
    </>
  );
}

export default ProfilePage;
