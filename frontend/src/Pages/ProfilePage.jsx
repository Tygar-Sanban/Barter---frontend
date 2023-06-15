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
  const [className, setClassName] = useState("");

  async function fetchWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data);
      // console.log("this is the wallet response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllServices() {
    try {
      const response = await service.get("/service");
      // console.log(response.data);
      setUserServiceProvided(response.data.provided);
      setUserServiceRequested(response.data.requested);
      // console.log(userServiceProvided);
      // console.log(userServiceRequested);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserMission() {
    try {
      const response = await service.get("/current-mission");
      // console.log("response user mission", response);
      if (response && user) {
        setUserFinishedMission(
          response.data.filter((elem) => {
            console.log(
              "this is THE ELEM",
              elem.request.category.serviceCategory
            );
            return (
              elem.validation === true && elem.request.provider._id === user._id
            );
          })
        );

        // console.log("user finished mission", userFinishedMission);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserServicesAsked() {
    try {
      const response = await service.get("/current-mission");
      // console.log("response user mission", response);
      if (response && user) {
        setUserServicesAsked(
          response.data.filter((elem) => {
            // console.log("this is THE ELEM", elem);
            return (
              elem.validation === true &&
              elem.request.requester._id === user._id
            );
          })
        );
        // console.log("user services asked", userServicesAsked);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllServices();
  }, [user]);

  useEffect(() => {
    fetchWallet();
    getUserMission();
  }, [user]);

  useEffect(() => {
    getUserServicesAsked();
  }, [user]);

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
        <div className="all-profile">
          <div className="div-profile-pic">
            <img
              src={user.picture}
              alt="profile picture"
              className="profile-pic"
            />
          </div>
          <div className="name-thunasse">
            <div>
              <h2>{user.name}</h2>
            </div>
            <div className="wallet-image">
              <div className="thunasse">
                {wallet.barterBucks === 0 ? "You poor :(" : wallet.barterBucks}
              </div>
              <div>
                <img
                  className="barter-bucks-profile"
                  src="/Pictures/tunasseV1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="switch">
          <SwitchComponent />
        </div>

        {/* CARDS FOR CATEGORIES */}
        <div className="categories">
          <h2>Browse categories and check the skills you have</h2>
          <div className="scrollable-container">
            <div className="scrollable-content">
              <div
                className={`scrollable-item ${
                  selectedCategory === "Personal" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Personal")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/user.png"
                    alt="image category"
                    className="image"
                    style={{ transform: "scale(0.8)" }}
                  />
                </div>
                <div className="PersonalBG title">Personal</div>
              </div>
              <div
                className={`scrollable-item ${
                  selectedCategory === "Professional" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Professional")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/professional.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="ProfessionalBG title">Professional</div>
              </div>
              <div
                className={`scrollable-item   ${
                  selectedCategory === "Health and Wellness" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Health and Wellness")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/health.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="healthBG title">Health</div>
              </div>
              <div
                className={`scrollable-item ${
                  selectedCategory === "Educational" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Educational")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/education.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="EducationalBG title">Educational</div>
              </div>
              <div
                className={`scrollable-item ${
                  selectedCategory === "Creative" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Creative")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/creative.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="creativeBG title">Creative</div>
              </div>
              <div
                className={`scrollable-item ${
                  selectedCategory === "Home" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Home")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/home.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="homeBG title">Home</div>
              </div>
              <div
                className={`scrollable-item ${
                  selectedCategory === "Transportation" ? "active" : ""
                } `}
                onClick={() => handleCategoryClick("Transportation")}
              >
                <div className="image-wrapper">
                  <img
                    src="/Icons/transportation.png"
                    alt="image category"
                    className="image"
                  />
                </div>
                <div className="transportationBG title">Transports</div>
              </div>
            </div>
          </div>

          {selectedCategory && (
            <>
              <div className="skill-info">
                <h2>Skills details</h2>

                <img
                  onClick={() => setSelectedCategory(null)}
                  src={"/Icons/close.png"}
                  alt="Close"
                  className="close-icon"
                />
              </div>
              <div className="skill-info">
                {user.skills.length > 0 &&
                  filteredSkills.map((elem) => (
                    <div
                      className={`skill-container ${
                        elem.serviceCategory === "Personal"
                          ? "PersonalBorder"
                          : elem.serviceCategory === "Professional"
                          ? "ProfessionalBorder"
                          : elem.serviceCategory === "Health and Wellness"
                          ? "healthBorder"
                          : elem.serviceCategory === "Educational"
                          ? "EducationalBorder"
                          : elem.serviceCategory === "Creative"
                          ? "creativeBorder"
                          : elem.serviceCategory === "Home"
                          ? "homeBorder"
                          : elem.serviceCategory === "Transportation"
                          ? "transportationBorder"
                          : ""
                      }`}
                      key={elem._id}
                    >
                      {elem.name}
                    </div>
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
          <h2>Provided services</h2>
          {userFinishedMission.length !== 0 ? (
            userFinishedMission.map((elem) => {
              return (
                <>
                  <div className="skill-info">
                    <div
                      className={`skill-container ${
                        elem.request.category.serviceCategory === "Personal"
                          ? "PersonalBorder"
                          : elem.request.category.serviceCategory ===
                            "Professional"
                          ? "ProfessionalBorder"
                          : elem.request.category.serviceCategory ===
                            "Health and Wellness"
                          ? "healthBorder"
                          : elem.request.category.serviceCategory ===
                            "Educational"
                          ? "EducationalBorder"
                          : elem.request.category.serviceCategory === "Creative"
                          ? "creativeBorder"
                          : elem.request.category.serviceCategory === "Home"
                          ? "homeBorder"
                          : elem.request.category.serviceCategory ===
                            "Transportation"
                          ? "transportationBorder"
                          : ""
                      }`}
                      key={elem._id}
                    >
                      <div
                        className={`${
                          elem.request.category.serviceCategory === "Personal"
                            ? "PersonalText"
                            : elem.request.category.serviceCategory ===
                              "Professional"
                            ? "ProfessionalText"
                            : elem.request.category.serviceCategory ===
                              "Health and Wellness"
                            ? "healthText"
                            : elem.request.category.serviceCategory ===
                              "Educational"
                            ? "EducationalText"
                            : elem.request.category.serviceCategory ===
                              "Creative"
                            ? "creativeText"
                            : elem.request.category.serviceCategory === "Home"
                            ? "homeBorder"
                            : elem.request.category.serviceCategory ===
                              "Transportation"
                            ? "transportationText"
                            : ""
                        }`}
                      >
                        {elem.request.category.serviceCategory}
                      </div>
                      <br />
                      {elem.request.name}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>You didn't provide any service yet</div>
          )}
        </div>

        <div>
          <h2>Requested services</h2>
          {userServicesAsked.length !== 0 ? (
            userServicesAsked.map((elem) => {
              return (
                <>
                  <div className="skill-info">
                    <div
                      className={`skill-container ${
                        elem.request.category.serviceCategory === "Personal"
                          ? "PersonalBorder"
                          : elem.request.category.serviceCategory ===
                            "Professional"
                          ? "ProfessionalBorder"
                          : elem.request.category.serviceCategory ===
                            "Health and Wellness"
                          ? "healthBorder"
                          : elem.request.category.serviceCategory ===
                            "Educational"
                          ? "EducationalBorder"
                          : elem.request.category.serviceCategory === "Creative"
                          ? "creativeBorder"
                          : elem.request.category.serviceCategory === "Home"
                          ? "homeBorder"
                          : elem.request.category.serviceCategory ===
                            "Transportation"
                          ? "transportationBorder"
                          : ""
                      }`}
                      key={elem._id}
                    >
                      <div
                        className={`${
                          elem.request.category.serviceCategory === "Personal"
                            ? "PersonalText"
                            : elem.request.category.serviceCategory ===
                              "Professional"
                            ? "ProfessionalText"
                            : elem.request.category.serviceCategory ===
                              "Health and Wellness"
                            ? "healthText"
                            : elem.request.category.serviceCategory ===
                              "Educational"
                            ? "EducationalText"
                            : elem.request.category.serviceCategory ===
                              "Creative"
                            ? "creativeText"
                            : elem.request.category.serviceCategory === "Home"
                            ? "homeBorder"
                            : elem.request.category.serviceCategory ===
                              "Transportation"
                            ? "transportationText"
                            : ""
                        }`}
                      >
                        {elem.request.category.serviceCategory}
                      </div>

                      <br />
                      {elem.request.name}
                    </div>
                  </div>
                </>
              );
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
