import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../service/service";
import { useState } from "react";

function Navbar(props) {
  const [wallet, setWallet] = useState(0);

  async function handleClick() {
    props.setTwoButtons(true);
    props.setProviding(false);
    props.setRequesting(false);
  }

  async function getWallet() {
    try {
      const response = await service.get("/wallet");
      setWallet(response.data.barterBucks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div>
      <navbar className="top-navbar">
        <Link to="/">
          <img src="../../public/Pictures/Barter.png" alt="logo-img" />
        </Link>
        <Link to="/request-page" className="bottom-navbar-component">
          <div>Requests</div>
        </Link>
        <Link to="/current-missions" className="bottom-navbar-component">
          <div onClick={handleClick}>Current Services</div>
        </Link>
        <Link to="/search" className="bottom-navbar-component">
          <div>Search</div>
        </Link>
      </navbar>
    </div>
  );
}

export default Navbar;
