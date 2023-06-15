import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Product() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        <Link to="/electronics">
          <div>Electronics</div>
        </Link>
        <Link to="/fashion">
          <div>Fashion and Accessories</div>
        </Link>
        <Link to="/home-and-furniture">
          <div>Home and Furniture</div>
        </Link>
        <Link to="/books">
          <div>Books, Movies and Music</div>
        </Link>
        <Link to="/sport">
          <div>Sport and Fitness</div>
        </Link>
        <Link to="/health">
          <div>Health and Beauty</div>
        </Link>
        <Link to="/toys">
          <div>Toys and Games</div>
        </Link>
        <Link to="/automotive">
          <div>Automotive</div>
        </Link>
      </div>
    </div>
  );
}

export default Product;
