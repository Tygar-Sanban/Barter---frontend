import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Product() {
  return (
    <div>
      <Navbar />
      <div className="page-title" style={{ paddingTop: "15vh" }}>
        <h2 className="titles">Product</h2>
      </div>
      <div className="indications">
        <h3>What item are you looking for ?</h3>
      </div>

      <div className="scrollable-container">
        <div className="scrollable-content">
          <Link to={"/electronics"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/user.png"
                  alt="image category"
                  className="image"
                  style={{ transform: "scale(0.8)" }}
                />
              </div>
              <div className="PersonalBG title">Electronics</div>
            </div>
          </Link>
          <Link to={"/fashion"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/professional.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="ProfessionalBG title">Fashion</div>
            </div>
          </Link>
          <Link to={"/home-and-furniture"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/health.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="healthBG title">Home</div>
            </div>
          </Link>
          <Link to={"/books"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/education.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="EducationalBG title">Multimedia</div>
            </div>
          </Link>
          <Link to={"/sport"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/creative.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="creativeBG title">Sport</div>
            </div>
          </Link>
          <Link to={"/health"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/home.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="homeBG title">Health</div>
            </div>
          </Link>
          <Link to={"/toys"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/transportation.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="transportationBG title">Toys Games</div>
            </div>
          </Link>
          <Link to={"/automotive"}>
            <div className="scrollable-item">
              <div className="image-wrapper">
                <img
                  src="/Icons/transportation.png"
                  alt="image category"
                  className="image"
                />
              </div>
              <div className="transportationBG title">Automotive</div>
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

export default Product;
