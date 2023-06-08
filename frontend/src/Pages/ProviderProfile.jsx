import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SwitchComponent from "../Components/SwitchComponent";
import service from "../service/service.js";

function ProviderProfile() {
  const { user } = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [commentary, setCommentary] = useState("");
  const [displayedCommentaries, setDisplayedCommentaries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [userFinishedMission, setUserFinishedMission] = useState([]);

  const params = useParams();

  async function getUserMission() {
    try {
      const response = await service.get("/current-mission");
      console.log("response user mission", response);
      if (response && provider) {
        setUserFinishedMission(
          response.data.filter((elem) => {
            console.log("this is THE ELEM", elem);
            return (
              elem.validation === true &&
              elem.request.provider._id === params.provider
            );
          })
        );
        console.log("provider finished mission", userFinishedMission);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getProvider() {
    try {
      const response = await service.get(`/user/${params.provider}`);
      setProvider(response.data.oneUser);
      console.log("this is the provider", params.provider);
      setUserServiceProvided(response.data.userService);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommentaries() {
    try {
      if (provider) {
        const response = await service.get("/commentary");
        const filteredCommentaries = response.data.filter((elem) => {
          return elem.commented === provider._id;
        });
        setDisplayedCommentaries(filteredCommentaries);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/commentary", {
        commented: provider,
        commentary,
      });
      getCommentaries();
      setCommentary("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProvider();
  }, []);
  useEffect(() => {
    getUserMission();
  }, []);

  useEffect(() => {
    provider &&
      provider.skills.length > 0 &&
      setFilteredSkills(
        provider.skills.filter(
          (elem) => elem.serviceCategory === selectedCategory
        )
      );
  }, [selectedCategory]);

  useEffect(() => {
    getCommentaries();
  }, [provider]);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  async function handleCommentaryClick(id) {
    try {
      const deletedCommentary = await service.delete(`/commentary/${id}`);
      getCommentaries();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    provider && (
      <>
        <Navbar />
        <div style={{ paddingTop: "5vh" }}>
          <div className="profile-info">
            <img
              src={provider.picture}
              alt="profile-picture"
              className="profile-pic"
            />
            <h1>{provider.name}</h1>
          </div>

          <div className="categories">
            <h2>What do I need ?</h2>
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
                className={
                  selectedCategory === "Transportation" ? "active" : ""
                }
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
                  {provider.skills.length > 0 &&
                    filteredSkills.map((elem) => (
                      <Link
                        key={elem._id}
                        to={`/request/${provider._id}/${elem._id}`}
                      >
                        <button>{elem.name}</button>
                      </Link>
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="provider-services">
            <div style={{ textAlign: "center" }}>
              <h2>Services rendus</h2>
              {userFinishedMission.length !== 0 ? (
                userFinishedMission.map((elem) => {
                  return <div key={elem._id}>{elem.request.name}</div>;
                })
              ) : (
                <div>This user did not provide any service yet</div>
              )}
            </div>
          </div>
          <div className="provider-services">
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="commentaries">Leave a commentary</label>
              <textarea
                className="textarea"
                type="text"
                value={commentary}
                onChange={(event) => setCommentary(event.target.value)}
              />
              <div className="bodyFont">
                <button className="bodyFont">Post your commentary</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <h3>Commentaries about {provider.name}</h3>
          <div className="bodyFont">
            {displayedCommentaries.map((elem) => {
              return (
                <div className="margin" key={elem._id}>
                  <div className="chat-name">{elem.commentator.name} : </div>
                  <div className="chat-bubble">{elem.commentary}</div>
                  {elem.commentator.name === user.name ? (
                    <div onClick={() => handleCommentaryClick(elem._id)}>
                      Delete this commentary
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  );
}

export default ProviderProfile;
