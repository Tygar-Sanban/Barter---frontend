import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Search() {
  return (
    <div>
      <Navbar />
      <div className="page-title" style={{ paddingTop: "8vh" }}>
        <h2>Search</h2>
      </div>
      <div className="indications">
        <h3>What service are you looking for ?</h3>
      </div>
      <div className="category-buttons">
        <Link to={"/personal"}>
          <button className="category-buttons">Personal</button>
        </Link>
        <Link to={"/professional"}>
          <button className="category-buttons">Professional</button>
        </Link>
        <Link to={"/health-and-wellness"}>
          <button className="category-buttons">Health and Wellness</button>
        </Link>
        <Link to={"/educational"}>
          <button className="category-buttons">Educational</button>
        </Link>
        <Link to={"/creative"}>
          <button className="category-buttons">Creative</button>
        </Link>
        <Link to={"/home"}>
          <button className="category-buttons">Home</button>
        </Link>
        <Link to={"/transportation"}>
          <button className="category-buttons">Transportation</button>
        </Link>
      </div>
    </div>
  );
}

export default Search;
