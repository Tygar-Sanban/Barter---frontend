// Switch.js
import React, { useState, useContext, useEffect } from "react";
import service from "../service/service.js";
import { AuthContext } from "../Context/authContext";

function Switch() {
  const { user, isLoading, authenticateUser } = useContext(AuthContext);

  async function handleSwitch(event) {
    try {
      await service.patch(`/user/${user._id}`, {
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
