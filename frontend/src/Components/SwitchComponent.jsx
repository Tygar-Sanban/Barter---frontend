// Switch.js
import React, { useState, useContext, useEffect } from "react";
import service from "../service/service.js";
import { AuthContext } from "../Context/authContext";
import Switch from "@mui/material/Switch";

function SwitchComponent() {
  const { user, isLoading, authenticateUser } = useContext(AuthContext);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  async function handleSwitch(event) {
    try {
      await service.patch(`/user`, {
        availability: event.target.checked,
      });
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Switch
        checked={user.availability}
        onChange={handleSwitch}
        inputProps={{ "aria-label": "Switch demo" }}
      />
      <p style={{ fontFamily: "Body" }}>
        {" "}
        Availability: {user.availability ? "Available" : "Not Available"}
      </p>
    </div>
  );
}

export default SwitchComponent;
