import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Search() {
  return (
    <div>
      <Navbar />
      <div className="page-title" style={{ paddingTop: "5vh" }}>
        <h2 className="title">Search</h2>
      </div>
      <div className="indications">
        <h3>What service are you looking for ?</h3>
      </div>
      <div className="category-buttons">
        <Link to={"/personal"}>
          <button>Personal</button>
        </Link>
        <Link to={"/professional"}>
          <button>Professional</button>
        </Link>
        <Link to={"/health-and-wellness"}>
          <button>Health and Wellness</button>
        </Link>
        <Link to={"/educational"}>
          <button>Educational</button>
        </Link>
        <Link to={"/creative"}>
          <button>Creative</button>
        </Link>
        <Link to={"/home"}>
          <button>Home</button>
        </Link>
        <Link to={"/transportation"}>
          <button>Transportation</button>
        </Link>
      </div>
    </div>
  );
}

export default Search;
