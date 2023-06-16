import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Search() {
  return (
    <div>
      <Navbar />
      <div className="page-title" style={{ paddingTop: "15vh" }}>
        <h2 className="titles">Service</h2>
      </div>
      <div className="indications">
        <h3>What service are you looking for ?</h3>
      </div>

      <div className="scrollable-container">
        <div className="scrollable-content">
          <Link to={"/personal"}>
            <div className="scrollable-item">
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
          </Link>
          <Link to={"/professional"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/professional.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="ProfessionalBG title">Professional</div>
            </div>
          </Link>
          <Link to={"/health-and-wellness"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/health.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="healthBG title">Health</div>
            </div>
          </Link>
          <Link to={"/educational"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/education.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="EducationalBG title">Educational</div>
            </div>
          </Link>
          <Link to={"/creative"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/creative.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="creativeBG title">Creative</div>
            </div>
          </Link>
          <Link to={"/home"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/home.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="homeBG title">Home</div>
            </div>
          </Link>
          <Link to={"/transportation"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/transportation.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="transportationBG title">Transports</div>
            </div>
          </Link>
        </div>
      </div>
      {/* <div>
        <img
          src="https://img.freepik.com/premium-vector/magnifying-glass-discovery-research-search-analysis-concept-3d-vector-icon-cartoon-minimal-style_365941-728.jpg?w=826"
          alt="glass"
        />
      </div> */}
    </div>
  );
}

export default Search;
