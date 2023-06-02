// Switch.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

function Switch() {
  const { user, isLoading, authenticateUser } = useContext(AuthContext);

  async function handleSwitch(event) {
    try {
      await axios.patch(`http://localhost:5005/user/${user._id}`, {
        availability: event.target.checked,
      });
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={user.availability}
          onChange={handleSwitch}
        />
        Availability: {user.availability ? "Available" : "Not Available"}
      </label>
    </div>
  );
}

export default Switch;
